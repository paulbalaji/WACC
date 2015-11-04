{

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

}

Program
  = __ BEGIN _ functionList:Func* statList:StatList _ END __ {return new NodeType.ProgramNode(functionList, statList);}

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
    return new NodeType.ParamNode(type, ident);
  }

StatList
  = stat: Stat __ SEMICOLON __ stats: StatList {
      return generateListFromRecursiveRule(stat, stats);
    }  
  / stat:Stat {
      return generateSingletonListFromRule(stat);
  }

Stat
  = SKIP {
    return new NodeType.SkipNode();
  }
  / BEGIN _ statList:StatList _ END {
    return new NodeType.BeginEndBlockNode(statList);
  }
  / READ _ dest:AssignLHS {
    return new NodeType.ReadNode(dest);
  }
  / FREE _ expr:Expr {
    return new NodeType.FreeNode(expr);
  }
  / EXIT _ expr:Expr {
    return new NodeType.ExitNode(expr);
  }
  / RETURN _ returnExpr:Expr { return new NodeType.ReturnNode(returnExpr); }
  / PRINTLN _ expr:Expr {
    return new NodeType.PrintlnNode(expr); 
  }
  / PRINT _ expr:Expr {
    return new NodeType.PrintNode(expr);
  }
  / IF predicate:Predicate THEN _ trueStats:StatList
                        __ ELSE _ falseStats:StatList __ FI {
                          return new NodeType.IfNode(predicate, trueStats, falseStats)
  }
  / WHILE predicateExpr:Predicate DO _ loopBody:StatList __ DONE { return new NodeType.WhileNode(predicateExpr, loopBody); }
  / lhs:AssignLHS __ EQUALS __ rhs:AssignRHS {
    return new NodeType.AssignNode(lhs,rhs);

  }
  / type:Type _ ident:Ident __ EQUALS __ rhs:AssignRHS {
    return new NodeType.DeclareNode(type, ident, rhs);
  }

/* Predicate */
Predicate
  = LEFT_PAREN __ expr:Expr __ RIGHT_PAREN  { return expr; }
  / _ expr:Expr __ { return expr; } /* Broken, ask Mark */

/* Type */
Type
  = ArrayType
  / PairType
  / BaseType

BaseType
  = INT { return NodeType.INT_TYPE; }
  / BOOL { return NodeType.BOOL_TYPE; }
  / CHAR { return NodeType.CHAR_TYPE; }
  / STRING { return NodeType.STRING_TYPE }

ArrayType
  = type:(BaseType / PairType) __ array:(LEFT_SQUARE RIGHT_SQUARE)+ {
    return new NodeType.ArrayTypeNode(type, array.length);
  }
PairType
  = PAIR __ LEFT_PAREN __ type1:PairElemType __ COMMA __ type2:PairElemType __ RIGHT_PAREN { return new NodeType.PairTypeNode(type1, type2); }

PairElemType
  = (ArrayType 
  / BaseType)
  / PAIR {
    // return new NodeType.PairElemTypeNode(type); // THIS LINE COMMENTED OUT BECAUSE PairElemTypeNode is un-nescarry - a normal type can be used. ( see line below)
    //return new NodeType.PairElemTypePAIRNode();
    return NodeType.NULL_TYPE;
  }

/* AssignLHS */
AssignLHS
  = ArrayElem
  / PairElem
  / &BaseType /* This line is here so that an BaseTypes are NOT recognised as Idents */
  / Ident

/* AssignRHS */
AssignRHS
  = CALL _ ident:Ident __ LEFT_PAREN exprList:ExprList? __ RIGHT_PAREN {
    return new NodeType.CallNode(ident, exprList ? exprList : []);
  }
  / NEW_PAIR __ LEFT_PAREN __ fstExpr:Expr __
                     COMMA __ sndExpr:Expr __ RIGHT_PAREN {
        return new NodeType.NewPairNode(fstExpr, sndExpr);
  }
  / ArrayLiter
  / PairElem
  / Expr

/* ArrayLiter */
ArrayLiter
  = LEFT_SQUARE __ exprList:ExprList? __ RIGHT_SQUARE { return new NodeType.ArrayLiterNode(exprList);}

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
    return new NodeType.PairElemFstNode(ident);
  }
  / SND __ ident:Ident {return new NodeType.PairElemSndNode(ident);}

/* Expr */
Expr
  = left:BaseExpr __ binOp:BinaryOp __ right:Expr { 
    return new NodeType.BinOpExprNode(left,right, binOp);
  }
  / BaseExpr

BaseExpr
  = IntLiter
  / BoolLiter
  / CharLiter
  / StrLiter
  / PairLiter
  / ArrayElem
  / unOp:UnaryOp __ expr:Expr { return new NodeType.UnOpNode(unOp, expr); }
  / Ident
  / LEFT_PAREN __ expr:Expr __ RIGHT_PAREN { return expr; }

/* BinaryOp */
BinaryOp
  = STAR
  / SLASH
  / MODULO
  / PLUS
  / MINUS
  / GREATER_OR_EQUAL
  / GREATER_THAN
  / LESS_OR_EQUAL
  / LESS_THAN
  / DOUBLE_EQUALS
  / NOT_EQUALS
  / DOUBLE_AMP
  / DOUBLE_PIPE

/* UnaryOp */
UnaryOp
  = '!' / '-' / 'len' / 'ord' / 'chr'

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
    var ident = front + rest.join('')
    return new NodeType.IdentNode(ident);
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
  = sign:IntSign? __ digits:Digit+ { 
    var num = parseInt((sign ? sign : '') + digits.join(''), 10);
    return new NodeType.IntLiterNode(num);
  }

Digit
  = [0-9]

IntSign
  = '+' / '-'

/* BoolLiter */
BoolLiter
  = TRUE { return new NodeType.BoolLiterNode(true); }
  / FALSE { return new NodeType.BoolLiterNode(false); }

/* CharLiter */
CharLiter
 = "'" ch:Character "'" { return new NodeType.CharLiterNode(ch); }

/* StrLiter */
StrLiter
 = '"' str:Character* '"' {
  return new NodeType.StrLiterNode(str)
 }

Character
  = '\\' EscapedChar / [^\'"]

EscapedChar
  = '0' / 'b' / 't' / 'n' / 'f' / 'r' / '"' / "'" / '\\'

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

IS     = 'is'
RETURN = 'return'

INT    = 'int'
BOOL   = 'bool'
CHAR   = 'char'
STRING = 'string'

CALL = 'call'

PAIR     = 'pair'
NEW_PAIR = 'newpair'
FST      = 'fst'
SND      = 'snd'
COMMA    = ','

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

LEFT_PAREN  = '('
RIGHT_PAREN = ')'

LEFT_SQUARE  = '['
RIGHT_SQUARE = ']'

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

BEGIN = 'begin'
END   = 'end'

SEMICOLON = ';'