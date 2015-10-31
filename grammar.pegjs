{
///<reference path="node.d.ts"/>
var ProgramNode = (function () {
    function ProgramNode(functionList, statList) {
        this.functionList = functionList;
        this.statList = statList;
    }
    return ProgramNode;
})();
var FuncNode = (function () {
    function FuncNode(type, ident, paramList, statList) {
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }
    return FuncNode;
})();
var SkipNode = (function () {
    function SkipNode() {
    }
    return SkipNode;
})();
var ReadNode = (function () {
    function ReadNode(lhsNode) {
        this.readTarget = lhsNode;
    }
    return ReadNode;
})();
var PrintlnNode = (function () {
    function PrintlnNode(expr) {
        this.expr = expr;
    }
    return PrintlnNode;
})();
var PairElemTypePAIRNode = (function () {
    function PairElemTypePAIRNode() {
    }
    return PairElemTypePAIRNode;
})();
var BaseTypeNode = (function () {
    function BaseTypeNode(typeName) {
        this.typeName = typeName;
    }
    return BaseTypeNode;
})();
var PairElemTypeNode = (function () {
    function PairElemTypeNode(type) {
        this.type = type;
    }
    return PairElemTypeNode;
})();
var IdentNode = (function () {
    function IdentNode(identStr) {
        this.identStr = identStr;
    }
    return IdentNode;
})();
var BinOpExprNode = (function () {
    function BinOpExprNode(leftOperand, rightOperand, operator) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
    return BinOpExprNode;
})();
var StrLiterNode = (function () {
    function StrLiterNode(str) {
        this.str = str;
    }
    return StrLiterNode;
})();
var AssignNode = (function () {
    function AssignNode(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    return AssignNode;
})();
var BeginEndBlockNode = (function () {
    function BeginEndBlockNode(statList) {
        this.statList = statList;
    }
    return BeginEndBlockNode;
})();
var ReturnNode = (function () {
    function ReturnNode(returnExpr) {
        this.returnExpr = returnExpr;
    }
    return ReturnNode;
})();
var WhileNode = (function () {
    function WhileNode(predicateExpr, loopBody) {
        this.predicateExpr = predicateExpr;
        this.loopBody = loopBody;
    }
    return WhileNode;
})();
var PairTypeNode = (function () {
    function PairTypeNode(type1, type2) {
        this.type1 = type1;
        this.type2 = type2;
    }
    return PairTypeNode;
})();
var PairElemSndNode = (function () {
    function PairElemSndNode(expr) {
        this.expr = expr;
    }
    return PairElemSndNode;
})();
var ArrayLiterNode = (function () {
    function ArrayLiterNode(list) {
        this.list = list;
    }
    return ArrayLiterNode;
})();
var CharLiterNode = (function () {
    function CharLiterNode(ch) {
        this.ch = ch;
    }
    return CharLiterNode;
})();
var ExitNode = (function () {
    function ExitNode(expr) {
        this.expr = expr;
    }
    return ExitNode;
})();
var IfNode = (function () {
    function IfNode(predicateExp, trueStatList, falseStatList) {
        this.predicateExp = predicateExp;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
    return IfNode;
})();
var ArrayTypeNode = (function () {
    function ArrayTypeNode(type, depth) {
        this.type = depth === 1 ? type : new ArrayTypeNode(type, depth - 1);
    }
    return ArrayTypeNode;
})();
var PairElemFstNode = (function () {
    function PairElemFstNode(expr) {
        this.expr = expr;
    }
    return PairElemFstNode;
})();
var NewPairNode = (function () {
    function NewPairNode(fstExpr, sndExpr) {
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
    return NewPairNode;
})();
var BoolLiterNode = (function () {
    function BoolLiterNode(bool) {
        this.bool = bool;
    }
    return BoolLiterNode;
})();
var UnOpNode = (function () {
    function UnOpNode(unOp, expr) {
        this.unOp = unOp;
        this.expr = expr;
    }
    return UnOpNode;
})();
var ParamNode = (function () {
    function ParamNode(type, ident) {
        this.type = type;
        this.ident = ident;
    }
    return ParamNode;
})();
var FreeNode = (function () {
    function FreeNode(expr) {
        this.expr = expr;
    }
    return FreeNode;
})();
var PrintNode = (function () {
    function PrintNode(expr) {
        this.expr = expr;
    }
    return PrintNode;
})();
var DeclareNode = (function () {
    function DeclareNode(type, ident, rhs) {
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }
    return DeclareNode;
})();
var ArrayElemNode = (function () {
    function ArrayElemNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    return ArrayElemNode;
})();
var CallNode = (function () {
    function CallNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    return CallNode;
})();
var PairLiterNode = (function () {
    function PairLiterNode() {
    }
    return PairLiterNode;
})();
var IntLiterNode = (function () {
    function IntLiterNode(num) {
        this.num = num;
    }
    return IntLiterNode;
})();
///<reference path="node.d.ts"/>
function generateListFromRecursiveRule(head, tail) {
    if (head !== null) {
        tail.unshift(head);
    }
    return tail;
}
function generateSingletonListFromRule(elem) {
    if (!elem) {
        return [];
    }
    return [elem];
}
}
Program
  = __ BEGIN _ functionList:Func* statList:StatList _ END __ {return new ProgramNode(functionList, statList);}

Func
  = type:Type _ ident:Ident __ LEFT_PAREN __ params:ParamList? __ RIGHT_PAREN __ IS __ stats:StatList __ END _ {
    return new FuncNode(type, ident, params ? params : [], stats);
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
    return new ParamNode(type, ident);
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
    return new SkipNode();
  }
  / BEGIN _ statList:StatList _ END {
    return new BeginEndBlockNode(statList);
  }
  / READ _ dest:AssignLHS {
    return new ReadNode(dest);
  }
  / FREE _ expr:Expr {
    return new FreeNode(expr);
  }
  / EXIT _ expr:Expr {
    return new ExitNode(expr);
  }
  / RETURN _ returnExpr:Expr { return new ReturnNode(returnExpr); }
  / PRINTLN _ expr:Expr {
    return new PrintlnNode(expr); 
  }
  / PRINT _ expr:Expr {
    return new PrintNode(expr);
  }
  / IF predicate:Predicate THEN _ trueStats:StatList
                        __ ELSE _ falseStats:StatList __ FI {
                          return new IfNode(predicate, trueStats, falseStats)
  }
  / WHILE predicateExpr:Predicate DO _ loopBody:StatList __ DONE { return new WhileNode(predicateExpr, loopBody); }
  / lhs:AssignLHS __ EQUALS __ rhs:AssignRHS {
    return new AssignNode(lhs,rhs);

  }
  / type:Type _ ident:Ident __ EQUALS __ rhs:AssignRHS {
    return new DeclareNode(type, ident, rhs);
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
  = typeName:(INT
  / BOOL
  / CHAR
  / STRING) { return new BaseTypeNode(typeName);}

ArrayType
  = type:(BaseType / PairType) __ array:(LEFT_SQUARE RIGHT_SQUARE)+ {
    return new ArrayTypeNode(type, array.length);
  }
PairType
  = PAIR __ LEFT_PAREN __ type1:PairElemType __ COMMA __ type2:PairElemType __ RIGHT_PAREN { return new PairTypeNode(type1, type2); }

PairElemType
  = type:(ArrayType 
  / BaseType 
  / PAIR) {
    return new PairElemTypeNode(type);
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
    return new CallNode(ident, exprList);
  }
  / NEW_PAIR __ LEFT_PAREN __ fstExpr:Expr __
                     COMMA __ sndExpr:Expr __ RIGHT_PAREN {
                      return new NewPairNode(fstExpr, sndExpr);
  }
  / ArrayLiter
  / PairElem
  / Expr

/* ArgList */
ArgList
  = Expr __ (COMMA __ Expr)*

/* ArrayLiter */
ArrayLiter
  = LEFT_SQUARE __ exprList:ExprList? __ RIGHT_SQUARE { return new ArrayLiterNode(exprList);}

ExprList
  = expr:Expr __ COMMA __ exprs:ExprList {
      return generateListFromRecursiveRule(expr, exprs);
    }
  / expr:Expr {
      return generateSingletonListFromRule(expr);
    }


/* PairElem */
PairElem
  = FST __ expr:Expr {
    return new PairElemFstNode(expr);
  }
  / SND __ expr:Expr {return new PairElemSndNode(expr);}

/* Expr */
Expr
  = left:BaseExpr __ binOp:BinaryOp __ right:Expr { 
    return new BinOpExprNode(left,right, binOp);
  }
  / BaseExpr

BaseExpr
  = IntLiter
  / BoolLiter
  / CharLiter
  / StrLiter
  / PairLiter
  / ArrayElem
  / unOp:UnaryOp __ expr:Expr { return new UnOpNode(unOp, expr); }
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
    return new ArrayElemNode(ident, exprList);
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
    return new IdentNode(ident);
  }

IdentStart
  = '_' / [a-z] / [A-Z]

IdentNormal
  = IdentStart / [0-9]

/* PairLiter */
PairLiter
  = NULL {
    return new PairLiterNode();
  }

/* IntLiter */
IntLiter
  = sign:IntSign? __ digits:Digit+ { 
    var num = parseInt((sign ? sign : '') + digits.join(''), 10);
    return new IntLiterNode(num);
  }

Digit
  = [0-9]

IntSign
  = '+' / '-'

/* BoolLiter */
BoolLiter
  = TRUE { return new BoolLiterNode(true); }
  / FALSE { return new BoolLiterNode(false); }

/* CharLiter */
CharLiter
 = "'" ch:Character "'" { return new CharLiterNode(ch); }

/* StrLiter */
StrLiter
 = '"' str:Character* '"' {
  return new StrLiterNode(str)
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

NULL = 'NULL'

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
RETURN  = 'return'
EXIT    = 'exit'
PRINT   = 'print'
PRINTLN = 'println'

BEGIN = 'begin'
END   = 'end'

SEMICOLON = ';'