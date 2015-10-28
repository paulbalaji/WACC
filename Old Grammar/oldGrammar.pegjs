program
  = _ BEGIN func* stat_list END

func
  = type ident LEFT_PAREN param_list? RIGHT_PAREN IS stat_list END

param_list
  = param (COMMA param)*

param
  = type ident

stat_list = stat SEMI_COLON stat_list / stat

stat
  = _ SKIP
  / type ident EQUALS assign_rhs
  / assign_lhs EQUALS assign_rhs
  / READ assign_lhs
  / FREE expr
  / RETURN expr
  / EXIT expr
  / PRINT expr
  / PRINTLN expr
  / IF expr THEN stat_list ELSE stat_list FI
  / WHILE expr DO stat_list DONE
  / BEGIN stat_list END _

assign_lhs
  = ident
  / array_elem
  / pair_elem

assign_rhs
  = expr
  / array_liter
  / NEWPAIR LEFT_PAREN expr COMMA expr RIGHT_PAREN
  / pair_elem
  / CALL ident LEFT_PAREN arg_list? RIGHT_PAREN

arg_list
  = expr (COMMA expr)*

pair_elem
  = FST expr
  / SND expr

/*
type
  = base_type / array_type / pair_type
array_type
  = array_temp
array_temp
  = type_array / array_temp
type_array
  = base_type '[]' / pair_type '[]'
*/

type
  = base_type
  / array_type
  / pair_type

base_type
  = INT / BOOL / CHAR / STRING

array_type
  = (base_type / pair_type) ('[]')*

pair_type
  = PAIR LEFT_PAREN pair_elem_type COMMA pair_elem_type RIGHT_PAREN

pair_elem_type
  = base_type
  / array_type
  / PAIR

expr = expr_part / expr_part binary_oper expr

expr_part
  = int_liter
  / bool_liter
  / char_liter
  / str_liter
  / pair_liter
  / ident
  / array_elem
  / unary_oper expr
  / LEFT_PAREN expr RIGHT_PAREN

unary_oper
  = BANG
  / HYPHEN
  / LEN
  / ORD
  / CHR

binary_oper
  = MULTIPLY
  / DIVIDE
  / MODULO
  / PLUS
  / MINUS
  / GREATER_THAN
  / GREATER_OR_EQUAL
  / LESS_THAN
  / LESS_OR_EQUAL
  / DOUBLE_EQUALS
  / NOT_EQUALS
  / AND
  / OR

ident
  = ident_starter (ident_starter / digit)* _

ident_starter
  = UNDERSCORE / LOWERCASE_LETTER / UPPERCASE_LETTER

array_elem
  = ident (LEFT_SQUARE expr RIGHT_SQUARE)+

int_liter
  = int_sign? digit+ _
 
digit
  = [0-9]
 
int_sign
  = PLUS / MINUS
 
bool_liter
  = TRUE / FALSE
 
char_liter
  = "'" character "'"
str_liter
  = '"' character* '"'
character
  = [^\'"] _ / '\\' escaped_char
 
escaped_char
  = '0' / 'b' / 't' / 'n' / 'f' / 'r' / '"' / "'" / '\\' _
 
array_liter 
  = LEFT_SQUARE (expr (COMMA expr)*)? RIGHT_SQUARE
 
pair_liter
  = NULL
 
comment
  = HASH [^\n]* EOL

_ = ([ \t\r\n\f] / comment )*
__ =  ([ \t\r\n\f])+
EQUALS = _ '=' _
UNDERSCORE = '_' _
LOWERCASE_LETTER = [a-z] _
UPPERCASE_LETTER = [A-Z] _
MULTIPLY = '*' _
DIVIDE = '/' _
MODULO = '%' _
PLUS = _ '+' _
MINUS = '-' _
GREATER_THAN = '>' _
GREATER_OR_EQUAL = '>=' _
LESS_THAN = '<' _
LESS_OR_EQUAL = '<=' _
DOUBLE_EQUALS = '==' _
NOT_EQUALS = '!=' _
AND = '&&' _
OR = '||' _
BANG = '!' _
HYPHEN = '_' _
LEN = 'len' _
ORD = 'ord' _
CHR = 'chr' _
PAIR = 'pair' _
LEFT_SQUARE = '[' _
RIGHT_SQUARE = ']' _ 
INT = 'int' _
BOOL = 'bool' _
CHAR = 'char' _
STRING = 'string' _
FST = 'fst' _
SND = 'snd' _
CALL = 'call' _
NEWPAIR = 'newpair' _
SEMI_COLON = _ ';' _
WHILE = 'while' _
DO = 'do' _
DONE = 'done' _
IF = 'if' _
THEN = 'then' _
ELSE = 'else' _
FI = 'fi' _
EXIT = 'exit' _
PRINT = 'print' _
PRINTLN = 'println' _
RETURN = 'return' _
FREE = 'free' _
READ = 'read' _
SKIP = 'skip' _
BEGIN = 'begin' _
END = 'end' _
LEFT_PAREN = '(' _
RIGHT_PAREN = ')' _
IS = 'is' _
COMMA = ',' _
HASH  = '#'
EOL = '\n'
NULL = 'null' _
TRUE = 'true' _
FALSE = 'false' _