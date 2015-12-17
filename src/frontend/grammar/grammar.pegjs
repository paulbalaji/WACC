{
  var _ = require('underscore');

  // Functions generating list from recursive rules. It is used for
  // param lists, expr list and statlist
  function generateListFromRecursiveRule(head, tail) {
    if (head !== null) {
      tail.unshift(head);
    }
    return tail;
  }

  function generateSingletonListFromRule(elem) {
    if (elem === null) {
      return [];
    }
    return [elem];
  }

  // Generates a binary Exp tree respecting the precendence of operators.
  function buildBinaryExpTree(head, tail) {
      // 
      if (tail.length == 0) {
        head.setErrorLocation(new WACCError.ErrorLocation(location()));
        return head
      }
       // Filter out all nulls corresponding to whitespace
      tail = _.map(tail, (row) => _.filter(row, (elem) => elem))

      // Set last element as a right most element
      var result = tail[tail.length - 1][1];
      // Iterate backwards through list (left associativity)
      for (var i = tail.length - 2; i >= 0; i--) {
        result = new NodeType.BinOpExprNode(tail[i][1], result, tail[i+1][0]);
      }
      // Stick the head and first operand as root
      var node = new NodeType.BinOpExprNode(head, result, tail[0][0]);
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
}

/* Program is either a normal program or a header description */
Program
  = __ BEGIN _ structList:Struct* functionList:Func* statList:StatList _ END __ {
    return new NodeType.ProgramNode(structList, functionList, statList);
  } / (__ HEADER _ structList:Struct* functionList:Func* END __) {
    return new NodeType.HeaderNode(structList, functionList);
  }

Struct
  = STRUCT _ ident:Ident __ LEFT_CURLY __ fields:FieldList __ RIGHT_CURLY __ {
    return new NodeType.StructNode(ident, fields);
  }


FieldList
  = field:Field __ COMMA __ fields:FieldList {
    return generateListFromRecursiveRule(field, fields);
  } / field:Field {
    return generateSingletonListFromRule(field);
  }

  Field
   = type:Type _ ident:Ident {
    return new NodeType.FieldNode(ident, type);
  };
  


Func
  = type:Type _ ident:Ident __ LEFT_PAREN __ params:ParamList? __ RIGHT_PAREN __ IS __ stats:StatList __ END _ {
    return new NodeType.FuncNode(type, ident, params ? params : [], stats);
  }

/* ParamList */
ParamList
  = param:Param __ COMMA __ params:ParamList {
    return generateListFromRecursiveRule(param, params);
  }
  / param:Param {
    return generateSingletonListFromRule(param);
  }

Param
  = type:Type _ ident:Ident {
    // TODO: check if it's necesarry to throw error here
    return new NodeType.ParamNode(type, ident);
  }

StatList
  = stat: Stat __ SEMICOLON __ stats: StatList {
      return generateListFromRecursiveRule(stat, stats);
  }  
  / stat:Stat {
      return generateSingletonListFromRule(stat);
  }

StructElem
  = structIdent:Ident fieldIdents:(StructElemAccess)+  {
    return new NodeType.StructElemNode(structIdent, fieldIdents);
  }

StructElemAccess
  = DOT ident:Ident {
    return ident;
  }

Stat
  = SKIP {
    var node = new NodeType.SkipNode();
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }
  / BEGIN _ statList:StatList __ END {
    return new NodeType.BeginEndBlockNode(statList);
  }
  / READ _ dest:AssignLHS {
    var node = new NodeType.ReadNode(dest);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }
  / FunctionCall
  / FREE _ expr:Expr {
    return new NodeType.FreeNode(expr);
  }
  / EXIT _ expr:Expr {
    return new NodeType.ExitNode(expr);
  }
  / RETURN _ returnExpr:Expr { 
      var node = new NodeType.ReturnNode(returnExpr);
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
  / PRINTLN _ expr:Expr {
    return new NodeType.PrintlnNode(expr); 
  }
  / PRINT _ expr:Expr {
    return new NodeType.PrintNode(expr);
  }
  / IF predicate:Predicate THEN _ trueStats:StatList
                        __ ELSE _ falseStats:StatList __ FI{
                          return new NodeType.IfNode(predicate, trueStats, falseStats);
  }
  / WHILE predicateExpr:Predicate DO _ loopBody:StatList __ DONE { 
    return new NodeType.WhileNode(predicateExpr, loopBody);
  }
  / lhs:AssignLHS __ op:ArithmeticOp EQUALS __ rhs:AssignRHS {
    var actualRhs = new NodeType.BinOpExprNode(lhs, rhs, op);
    return new NodeType.AssignNode(lhs, actualRhs);
  }
  / lhs:AssignLHS __ EQUALS __ rhs:AssignRHS {
    return new NodeType.AssignNode(lhs,rhs);
  }
  / type:Type _ ident:Ident __ EQUALS __ rhs:AssignRHS {
    return new NodeType.DeclareNode(type, ident, rhs);
  }


ArithmeticOp
  = SLASH / STAR / MODULO / PLUS / MINUS

/* Predicate */
Predicate
  = LEFT_PAREN __ expr:Expr __ RIGHT_PAREN  { return expr; }
  / _ expr:Expr __ { return expr; }

/* Type */
Type
  = ArrayType
  / PairType
  / BaseType
  / StructType

BaseType
  = PrimitiveType

  / STRING { 
      var node = new NodeType.ArrayTypeNode(NodeType.CHAR_TYPE, 1);
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }

PrimitiveType
  = INT { 
      var node = new NodeType.IntTypeNode();
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
  / BOOL { 
      var node = new NodeType.BoolTypeNode();
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
  / CHAR { 
      var node = new NodeType.CharTypeNode();
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }

ArrayType
  = type:(BaseType / PairType / StructType) __ array:(LEFT_SQUARE RIGHT_SQUARE)+ {
      var node;
      if (type instanceof NodeType.ArrayTypeNode) { // The case that base type of array is a string
          node = new NodeType.ArrayTypeNode(NodeType.CHAR_TYPE, array.length + 1);
      } else {
        node = new NodeType.ArrayTypeNode(type, array.length);
      }
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
PairType
  = PAIR __ LEFT_PAREN __ type1:PairElemType __ COMMA __ type2:PairElemType __ RIGHT_PAREN {
      return new NodeType.PairTypeNode(type1, type2);
  }


PairElemType
  = (ArrayType 
  / BaseType)
  / PAIR {
    return NodeType.NULL_TYPE;
  }

StructType
  = STRUCT _ ident:Ident {
    var node = new NodeType.StructTypeNode(ident);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }

/* AssignLHS */
AssignLHS
  = lhs:(ArrayElem
  / PairElem
  / StructElem
  / &BaseType /* This line is here so that an BaseTypes are NOT recognised as Idents */
  / Ident) {
    if (lhs) {
      lhs.setErrorLocation(new WACCError.ErrorLocation(location()));
    }
    return lhs;
  }

FunctionCall
  = CALL _ ident:Ident __ LEFT_PAREN exprList:ExprList? __ RIGHT_PAREN {
      var node = new NodeType.CallNode(ident, exprList ? exprList : []);
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  };

/* AssignRHS */
AssignRHS
  = FunctionCall
  / NEW _ type:Type __ LEFT_SQUARE lengthExpr:Expr __ RIGHT_SQUARE {
    var node = new NodeType.NewArrayNode(type, lengthExpr);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }
  / NEW _ structIdent:Ident {
    var node = new NodeType.NewStructNode(structIdent);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  } 
  / NEW_PAIR __ LEFT_PAREN __ fstExpr:Expr __
                     COMMA __ sndExpr:Expr __ RIGHT_PAREN {
      var node = new NodeType.NewPairNode(fstExpr, sndExpr);
      node.setErrorLocation(new WACCError.ErrorLocation(location()));
      return node;
  }
  /  GET_FRAME_BUFFER {
    var node = new NodeType.GetFrameBufferNode();
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }
  / ArrayLiter
  / PairElem
  / Expr

/* ArrayLiter */
ArrayLiter
  = LEFT_SQUARE __ exprList:ExprList? __ RIGHT_SQUARE { 
    var node = new NodeType.ArrayLiterNode(exprList);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }

ExprList
  = expr:Expr __ COMMA __ exprs:ExprList {
      return generateListFromRecursiveRule(expr, exprs);
  }
  / expr:Expr {
      return generateSingletonListFromRule(expr);
  }


/* PairElem */
PairElem
  = FST __ ident:Ident {
    return new NodeType.PairElemNode(ident, 0);
  }
  / SND __ ident:Ident {
    return new NodeType.PairElemNode(ident, 1);
  }

/* Expr */
Expr
  = head:AndExpr tail:(__ DOUBLE_PIPE __ AndExpr)* { 
    return buildBinaryExpTree(head, tail)
  }

AndExpr
  = head:EqualsExpr tail:(__ DOUBLE_AMP __ EqualsExpr)* { 
    return buildBinaryExpTree(head,tail);;
  }

EqualsExpr
  = head:CompareExpr tail:(__ EqualsOp __ CompareExpr)* { 
    return buildBinaryExpTree(head, tail)
  }

CompareExpr
  = head:PlusMinusExpr tail:(__ CompareOp __ PlusMinusExpr)* { 
    return buildBinaryExpTree(head, tail)
  }

PlusMinusExpr
  = head:DivideExpr tail:(__ PlusMinusOp __ DivideExpr)* { 
    return buildBinaryExpTree(head, tail)
  }
DivideExpr
  = head: FactorExpr tail:(__ SLASH __ FactorExpr)* {
    return buildBinaryExpTree(head, tail);
  }
FactorExpr
  = head:BaseExpr tail:(__ FactorOp __ BaseExpr)* { 
    return buildBinaryExpTree(head, tail)
  }

BaseExpr
  = IntLiter
  / StructElem
  / BoolLiter
  / CharLiter
  / StrLiter
  / PairLiter
  / ArrayElem
  / gpio:GPIO _ pinNum: IntLiter { return new NodeType.UnOpNode(gpio, pinNum); }
  / unOp:UnaryOp __ expr:Expr { return new NodeType.UnOpNode(unOp, expr); }
  / Ident
  / LEFT_PAREN __ expr:Expr __ RIGHT_PAREN { return expr; }

/* BinaryOp */
PlusMinusOp
  = PLUS
  / MINUS

CompareOp 
  = GREATER_OR_EQUAL
  / GREATER_THAN
  / LESS_OR_EQUAL
  / LESS_THAN

EqualsOp
  = DOUBLE_EQUALS
  / NOT_EQUALS

FactorOp
  = STAR
  / MODULO

/* UnaryOp */
UnaryOp
  = '!' / '-' / ((op:('len' / 'ord'/ 'chr') _) { return op; })

/* ArrayElem */
ArrayElem
  = ident:Ident __ exprList:ArrayElemIndexList {
    return new NodeType.ArrayElemNode(ident, exprList);
  }

ArrayElemIndexList
 = (LEFT_SQUARE __ expr:Expr __ RIGHT_SQUARE) exprs:ArrayElemIndexList {
  return generateListFromRecursiveRule(expr, exprs);
 }
  / (LEFT_SQUARE __ expr:Expr __ RIGHT_SQUARE) {
  return generateSingletonListFromRule(expr);
 }

/* Ident */
Ident
  = front:IdentStart rest:(IdentNormal*) {
    var ident = front + rest.join('');
    var node = new NodeType.IdentNode(ident);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }

IdentStart
  = '_' / [a-z] / [A-Z]

IdentNormal
  = IdentStart / [0-9]

/* PairLiter */
PairLiter
  = NULL {
    return new NodeType.PairLiterNode();
  }

/* IntLiter */
IntLiter
  = sign:IntSign? n:(BinLiter/HexLiter/DecLiter) { 
    var num = sign === '-' ? -n : n;
    var node = new NodeType.IntLiterNode(num);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }
 BinLiter
   = BINARY_PREFIX digits:([0-1])+ {
    return parseInt(digits.join(''), 2);
   }

 HexLiter
   = HEX_PREFIX digits:(Digit/[A-F]/[a-f])+ {
    return parseInt(digits.join(''), 16);
   }

 DecLiter
   = digits:Digit+ {
    return parseInt(digits.join(''), 10);
   }

   
Digit
  = [0-9]

IntSign
  = '+' / '-'

/* BoolLiter */
BoolLiter
  = TRUE { 
  var node = new NodeType.BoolLiterNode(true);
  node.setErrorLocation(new WACCError.ErrorLocation(location()));
  return node;
  }
  / FALSE { 
    var node = new NodeType.BoolLiterNode(false);
    node.setErrorLocation(new WACCError.ErrorLocation(location()));
    return node;
  }

/* CharLiter */
CharLiter
 = "'" ch:Character "'" {
  var node = new NodeType.CharLiterNode(ch);
  node.setErrorLocation(new WACCError.ErrorLocation(location()));
  return node;
 }

/* StrLiter */
StrLiter
 = '"' chars:Character* '"' {
  var node = new NodeType.StrLiterNode(chars.join(''));
  node.actualStrLength = chars.length;
  node.setErrorLocation(new WACCError.ErrorLocation(location()));
  return node;
 }

Character
  = '\\' escapedCh:EscapedChar { return escapedCh; }
  / [^\'"]

EscapedChar
  = '0' { return '\\0'; }
  / 'b' { return '\\b'; }
  / 't' { return '\\t'; }
  / 'n' { return '\\n'; }
  / 'f' { return '\\f'; }
  / 'r' { return '\\r'; }
  / '"' { return '\\"'; }
  / "'" { return "\\'"; }
  / '\\'{ return '\\'; }

/* Utils */
_
  = (WhiteSpace / LineTerminatorSequence / Comment)+ { return null; }

__
  = (WhiteSpace / LineTerminatorSequence / Comment)* { return null; }
WhiteSpace "whitespace"
  = "\t"
  / "\v"
  / "\f"
  / " "

LineTerminator
  = [\n\r\u2028\u2029]

LineTerminatorSequence "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"

Comment
  = "#" (!LineTerminator SourceCharacter)*

SourceCharacter
  = .

/* TOKENS */
GPIO   = 'gpio'


HEADER = 'header'

IS     = 'is'
RETURN = 'return'

INT    = 'int'
BOOL   = 'bool'
CHAR   = 'char'
STRING = 'string'

CALL = 'call'

PAIR     = 'pair'
NEW_PAIR = 'newpair'
GET_FRAME_BUFFER = 'get_frame_buffer'
FST      = 'fst'
SND      = 'snd'
COMMA    = ','
DOT      = '.'

STAR             = '*'
SLASH            = '/'
MODULO           = '%'
PLUS             = '+'
MINUS            = '-'
GREATER_THAN     = '>'
GREATER_OR_EQUAL = '>='
LESS_THAN        = '<'
LESS_OR_EQUAL    = '<='
DOUBLE_EQUALS    = '=='
NOT_EQUALS       = '!='
DOUBLE_AMP       = '&&'
DOUBLE_PIPE      = '||'

BINARY_PREFIX    = '0b'
HEX_PREFIX       = '0x'

LEFT_PAREN  = '('
RIGHT_PAREN = ')'

LEFT_SQUARE  = '['
RIGHT_SQUARE = ']'

LEFT_CURLY  = '{'
RIGHT_CURLY = '}'

NULL = 'null'

TRUE  = 'true'
FALSE = 'false'

EQUALS = '='

WHILE = 'while'
DO    = 'do'
DONE  = 'done'

IF   = 'if'
THEN = 'then'
ELSE = 'else'
FI   = 'fi'

SKIP    = 'skip'
READ    = 'read'
FREE    = 'free'
EXIT    = 'exit'
PRINT   = 'print'
PRINTLN = 'println'
STRUCT  = 'struct'
NEW     = 'new'

BEGIN = 'begin'
END   = 'end'

SEMICOLON = ';'