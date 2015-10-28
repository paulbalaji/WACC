{
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="node.d.ts"/>
var TreeNode = (function () {
    function TreeNode() {
    }
    TreeNode.prototype.visit = function (visitor) {
        console.error('Node():visit not overridden');
        return -1;
    };
    return TreeNode;
})();
var BinNode = (function (_super) {
    __extends(BinNode, _super);
    function BinNode(op, left, right) {
        _super.call(this);
        this.op = op;
        this.left = left;
        this.right = right;
    }
    return BinNode;
})(TreeNode);
var PlusNode = (function (_super) {
    __extends(PlusNode, _super);
    function PlusNode(left, right) {
        _super.call(this, '+', left, right);
    }
    PlusNode.prototype.visit = function (visitor) {
        return visitor.visitPlusNode(this);
    };
    return PlusNode;
})(BinNode);
var MultNode = (function (_super) {
    __extends(MultNode, _super);
    function MultNode(left, right) {
        _super.call(this, '*', left, right);
    }
    MultNode.prototype.visit = function (visitor) {
        return visitor.visitMultNode(this);
    };
    return MultNode;
})(BinNode);
var NumNode = (function (_super) {
    __extends(NumNode, _super);
    function NumNode(n) {
        _super.call(this);
        this.num = n;
    }
    NumNode.prototype.visit = function (visitor) {
        return visitor.visitNumNode(this);
    };
    return NumNode;
})(TreeNode);
}
Program
  = __ BEGIN _ Func* StatList _ END __

Func
  = Type _ Ident __ LEFT_PAREN __ ParamList? __ RIGHT_PAREN __ IS __ stats:StatList __ END _

/* ParamList */
ParamList
  = Param __ (COMMA __ Param)*

Param
  = Type _ Ident

StatList
  = stat: Stat __ SEMICOLON __ stats: StatList {
      if (stat !== null) {
        stats.unshift(stat)
      }
      return stats;
    }  
  / stat:Stat {
    if (stat === null) {
      return [];
    }
    return [stat];
  }

Stat
  = SKIP {
    return null;
  }
  / BEGIN _ stats:StatList _ END {
    return {stats : stats};
  }
  / READ _ dest:AssignLHS {
    return null;
  }
  / FREE _ Expr
  / EXIT _ Expr
  / RETURN _ Expr
  / PRINTLN _ Expr
  / PRINT _ Expr
  / IF Predicate THEN _ StatList __ ELSE _ StatList __ FI
  /*/ IF _ Expr __ THEN __ StatList __ ELSE __ StatList __ FI*/
  / WHILE Predicate DO _ StatList __ DONE
  / AssignLHS __ EQUALS __ AssignRHS
  / Type _ Ident __ EQUALS __ AssignRHS

/* Predicate */
Predicate
  = LEFT_PAREN __ Expr __ RIGHT_PAREN
  / _ Expr __ /* Broken, ask Mark */

/* Type */
Type
  = ArrayType
  / PairType
  / BaseType

BaseType
  = INT
  / BOOL
  / CHAR
  / STRING

ArrayType
  = (BaseType / PairType) __ (LEFT_SQUARE RIGHT_SQUARE)+

PairType
  = PAIR __ LEFT_PAREN __ PairElemType __ COMMA __ PairElemType __ RIGHT_PAREN

PairElemType
  = ArrayType
  / BaseType
  / PAIR

/* AssignLHS */
AssignLHS
  = ArrayElem
  / PairElem
  / &BaseType /* This line is here so that an BaseTypes are NOT recognised as Idents */
  / Ident

/* AssignRHS */
AssignRHS
  = CALL _ Ident __ LEFT_PAREN ArgList? __ RIGHT_PAREN
  / NEW_PAIR __ LEFT_PAREN __ Expr __ COMMA __ Expr __ RIGHT_PAREN
  / ArrayLiter
  / PairElem
  / Expr

/* ArgList */
ArgList
  = Expr __ (COMMA __ Expr)*

/* ArrayLiter */
ArrayLiter
  = LEFT_SQUARE __ (Expr __ (COMMA __ Expr)*)? __ RIGHT_SQUARE

/* PairElem */
PairElem
  = FST __ Expr
  / SND __ Expr

/* Expr */
Expr
  = left:BaseExpr __ binOp:BinaryOp __ right:Expr { return {left: left, op: binOp, right: right}; }
  / BaseExpr

BaseExpr
  = IntLiter
  / BoolLiter
  / CharLiter
  / StrLiter
  / PairLiter
  / ArrayElem
  / unOp:UnaryOp __ expr:Expr { return {unOp: unOp, expr: expr}}
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
  = Ident __ (LEFT_SQUARE __ Expr __ RIGHT_SQUARE)+

/* Ident */
Ident
  = IdentStart IdentNormal*

IdentStart
  = '_' / [a-z] / [A-Z]

IdentNormal
  = IdentStart / [0-9]

/* PairLiter */
PairLiter
  = NULL

/* IntLiter */
IntLiter
  = sign:IntSign? __ digits:Digit+ { return parseInt((sign ? sign : '') + digits.join(''), 10); }

Digit
  = [0-9]

IntSign
  = '+' / '-'

/* BoolLiter */
BoolLiter
  = TRUE / FALSE

/* CharLiter */
CharLiter
 = "'" Character "'"

/* StrLiter */
StrLiter
 = '"' Character* '"'

Character
  = '\\' EscapedChar / [^\'"]

EscapedChar
  = '0' / 'b' / 't' / 'n' / 'f' / 'r' / '"' / "'" / '\\'

/* Utils */

_
  = (WhiteSpace / LineTerminatorSequence / Comment)+

__
  = (WhiteSpace / LineTerminatorSequence / Comment)*
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