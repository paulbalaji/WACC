Program
  = __ BEGIN _ functionList:Func* statList:StatList _ END __ {return new ProgramNode(functionList, statList);}

Func
  = type:Type _ ident:Ident __ LEFT_PAREN __ params:ParamList? __ RIGHT_PAREN __ IS __ stats:StatList __ END _ {
    return new FuncNode(type, ident, params, stats);
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
  = Type _ Ident

StatList
  = stat: Stat __ SEMICOLON __ stats: StatList {
      return generateListFromRecursiveRule(stat, stats);
    }  
  / stat:Stat {
      return generateSingletonListFromRule(stat);
  }

Stat
  = SKIP {
    return null;
  }
  / BEGIN _ statList:StatList _ END {
    return new BeginEndBlockNode(statList);
  }
  / READ _ dest:AssignLHS {
    return new ReadNode(dest);
  }
  / FREE _ Expr 
  / EXIT _ Expr
  / RETURN _ returnExpr:Expr { return new ReturnNode(returnExpr); }
  / PRINTLN _ expr:Expr {
    return new PrintlnNode(expr); 
  }
  / PRINT _ Expr
  / IF Predicate THEN _ StatList __ ELSE _ StatList __ FI
  /*/ IF _ Expr __ THEN __ StatList __ ELSE __ StatList __ FI*/
  / WHILE predicateExpr:Predicate DO _ loopBody:StatList __ DONE { return new WhileNode(predicateExpr, loopBody); }
  / lhs:AssignLHS __ EQUALS __ rhs:AssignRHS {
    return new AssignNode(lhs,rhs);

  }
  / Type _ Ident __ EQUALS __ AssignRHS

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
  = INT
  / BOOL
  / CHAR
  / STRING

ArrayType
  = (BaseType / PairType) __ (LEFT_SQUARE RIGHT_SQUARE)+

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
  = FST __ Expr
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