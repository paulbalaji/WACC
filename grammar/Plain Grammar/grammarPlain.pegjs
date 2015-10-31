Program
  = __ BEGIN _ functionList:Func* statList:StatList __ END __

Func
  = Type _ Ident __ LEFT_PAREN __ ParamList? __ RIGHT_PAREN __ IS __ stats:StatList __ END _

/* ParamList */
ParamList
  = Param __ (COMMA __ Param)*

Param
  = Type _ Ident

StatList
  = stat: Stat __ SEMICOLON __ stats: StatList 
  / stat:Stat 

Stat
  = SKIP 
  / BEGIN _ statList:StatList __ END
  / READ _ dest:AssignLHS
  / FREE _ Expr
  / EXIT _ Expr
  / RETURN _ returnExpr:Expr
  / PRINTLN _ Expr
  / PRINT _ Expr
  / IF Predicate THEN _ StatList __ ELSE _ StatList __ FI
  /*/ IF _ Expr __ THEN __ StatList __ ELSE __ StatList __ FI*/
  / WHILE predicateExpr:Predicate DO _ loopBody:StatList __ DONE
  / AssignLHS __ EQUALS __ AssignRHS
  / Type _ Ident __ EQUALS __ AssignRHS

/* Predicate */
Predicate
  = LEFT_PAREN __ expr:Expr __ RIGHT_PAREN
  / _ expr:Expr __  /* Broken, ask Mark */

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
  = PAIR __ LEFT_PAREN __ type1:PairElemType __ COMMA __ type2:PairElemType __ RIGHT_PAREN

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
  = LEFT_SQUARE __ exprCommaList:(Expr __ (COMMA __ Expr)*)? __ RIGHT_SQUARE 

/* PairElem */
PairElem
  = FST __ Expr
  / SND __ expr:Expr

/* Expr */
Expr
  = left:BaseExpr __ binOp:BinaryOp __ right:Expr
  / BaseExpr

BaseExpr
  = IntLiter
  / BoolLiter
  / CharLiter
  / StrLiter
  / PairLiter
  / ArrayElem
  / unOp:UnaryOp __ expr:Expr
  / Ident
  / LEFT_PAREN __ expr:Expr __ RIGHT_PAREN

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
  = sign:IntSign? __ digits:Digit+

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