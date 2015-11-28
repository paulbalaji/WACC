.data

msg_0:
.word 38
.ascii "========= Tic Tac Toe ================"
msg_1:
.word 38
.ascii "= Because we know you want to win  ="
msg_2:
.word 38
.ascii "======================================"
msg_3:
.word 38
.ascii "=                  ="
msg_4:
.word 38
.ascii "= Who would you like to be?     ="
msg_5:
.word 38
.ascii "=  x (play first)         ="
msg_6:
.word 38
.ascii "=  o (play second)         ="
msg_7:
.word 38
.ascii "=  q (quit)            ="
msg_8:
.word 38
.ascii "=                  ="
msg_9:
.word 38
.ascii "======================================"
msg_10:
.word 39
.ascii "Which symbol you would like to choose: "
msg_11:
.word 15
.ascii "Goodbye safety."
msg_12:
.word 16
.ascii "Invalid symbol: "
msg_13:
.word 17
.ascii "Please try again."
msg_14:
.word 17
.ascii "You have chosen: "
msg_15:
.word 6
.ascii " 1 2 3"
msg_16:
.word 1
.ascii "1"
msg_17:
.word 6
.ascii " -+-+-"
msg_18:
.word 1
.ascii "2"
msg_19:
.word 6
.ascii " -+-+-"
msg_20:
.word 1
.ascii "3"
msg_21:
.word 0
.ascii ""
msg_22:
.word 0
.ascii ""
msg_23:
.word 23
.ascii "What is your next move?"
msg_24:
.word 12
.ascii " row (1-3): "
msg_25:
.word 15
.ascii " column (1-3): "
msg_26:
.word 0
.ascii ""
msg_27:
.word 39
.ascii "Your move is invalid. Please try again."
msg_28:
.word 21
.ascii "The AI played at row "
msg_29:
.word 8
.ascii " column "
msg_30:
.word 31
.ascii "AI is cleaning up its memory..."
msg_31:
.word 52
.ascii "Internal Error: cannot find the next move for the AI"
msg_32:
.word 31
.ascii "AI is cleaning up its memory..."
msg_33:
.word 50
.ascii "Internal Error: symbol given is neither \'x\' or \'o\'"
msg_34:
.word 58
.ascii "Initialising AI. Please wait, this may take a few minutes."
msg_35:
.word 9
.ascii " has won!"
msg_36:
.word 10
.ascii "Stalemate!"
msg_37:
.word 5
.ascii "%.*s\0"
msg_38:
.word 1
.ascii "\0"
msg_39:
.word 4
.ascii " %c\0"
msg_40:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_41:
.word 3
.ascii "%d\0"
msg_42:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_43:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"
msg_44:
.word 3
.ascii "%d\0"
msg_45:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_46:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"

.text

.global main
f_chooseSymbol:
PUSH {lr}
SUB sp, sp, #1
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
BL p_print_ln
LDR r0, =msg_4
BL p_print_string
BL p_print_ln
LDR r0, =msg_5
BL p_print_string
BL p_print_ln
LDR r0, =msg_6
BL p_print_string
BL p_print_ln
LDR r0, =msg_7
BL p_print_string
BL p_print_ln
LDR r0, =msg_8
BL p_print_string
BL p_print_ln
LDR r0, =msg_9
BL p_print_string
BL p_print_ln
MOV r0, #0
STRB r0, [sp]
B L1
L0:
SUB sp, sp, #1
LDR r0, =msg_10
BL p_print_string
MOV r0, #0
STRB r0, [sp]
ADD r0, sp, #0
BL p_read_char
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'x'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L4
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'X'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L4:
CMP r0, #0
BEQ L2
MOV r0, #'x'
STRB r0, [sp, #1]
B L3
L2:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'o'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L7
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'O'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L7:
CMP r0, #0
BEQ L5
MOV r0, #'o'
STRB r0, [sp, #1]
B L6
L5:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'q'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L10
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'Q'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L10:
CMP r0, #0
BEQ L8
LDR r0, =msg_11
BL p_print_string
BL p_print_ln
LDR r0, =0
BL exit
B L9
L8:
LDR r0, =msg_12
BL p_print_string
LDRSB r0, [sp]
BL putchar
BL p_print_ln
LDR r0, =msg_13
BL p_print_string
BL p_print_ln
L9:
L6:
L3:
ADD sp, sp, #1
L1:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L0
LDR r0, =msg_14
BL p_print_string
LDRSB r0, [sp]
BL putchar
BL p_print_ln
LDRSB r0, [sp]
ADD sp, sp, #1
POP {pc}
.ltorg
f_printBoard:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, =msg_15
BL p_print_string
BL p_print_ln
LDR r0, =msg_16
BL p_print_string
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_printRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, =msg_17
BL p_print_string
BL p_print_ln
LDR r0, =msg_18
BL p_print_string
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_printRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, =msg_19
BL p_print_string
BL p_print_ln
LDR r0, =msg_20
BL p_print_string
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_printRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, =msg_21
BL p_print_string
BL p_print_ln
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_printRow:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #3]
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #2]
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #1]
LDRSB r0, [sp, #3]
STRB r0, [sp, #-1]!
BL f_printCell
ADD sp, sp, #1
STRB r0, [sp]
MOV r0, #'|'
BL putchar
LDRSB r0, [sp, #2]
STRB r0, [sp, #-1]!
BL f_printCell
ADD sp, sp, #1
STRB r0, [sp]
MOV r0, #'|'
BL putchar
LDRSB r0, [sp, #1]
STRB r0, [sp, #-1]!
BL f_printCell
ADD sp, sp, #1
STRB r0, [sp]
LDR r0, =msg_22
BL p_print_string
BL p_print_ln
MOV r0, #1
ADD sp, sp, #8
POP {pc}
.ltorg
f_printCell:
PUSH {lr}
LDRSB r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L11
MOV r0, #' '
BL putchar
B L12
L11:
LDRSB r0, [sp, #4]
BL putchar
L12:
MOV r0, #1
POP {pc}
.ltorg
f_askForAMoveHuman:
PUSH {lr}
SUB sp, sp, #9
MOV r0, #0
STRB r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L14
L13:
LDR r0, =msg_23
BL p_print_string
BL p_print_ln
LDR r0, =msg_24
BL p_print_string
ADD r0, sp, #4
BL p_read_int
LDR r0, =msg_25
BL p_print_string
ADD r0, sp, #0
BL p_read_int
LDR r0, [sp]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_validateMove
ADD sp, sp, #12
STRB r0, [sp, #8]
LDRSB r0, [sp, #8]
CMP r0, #0
BEQ L15
LDR r0, =msg_26
BL p_print_string
BL p_print_ln
LDR r0, [sp, #4]
PUSH {r0, r4}
LDR r4, [sp, #25]
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp]
PUSH {r0, r4}
LDR r4, [sp, #25]
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #1
ADD sp, sp, #9
POP {pc}
B L16
L15:
LDR r0, =msg_27
BL p_print_string
BL p_print_ln
L16:
L14:
LDRSB r0, [sp, #8]
EOR r0, r0, #1
CMP r0, #1
BEQ L13
MOV r0, #1
ADD sp, sp, #9
POP {pc}
.ltorg
f_validateMove:
PUSH {lr}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L19
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =3
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L19
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L19
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =3
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
L19:
CMP r0, #0
BEQ L17
SUB sp, sp, #1
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
ADD sp, sp, #1
POP {pc}
ADD sp, sp, #1
B L18
L17:
MOV r0, #0
POP {pc}
L18:
.ltorg
f_notifyMoveHuman:
PUSH {lr}
LDR r0, =msg_28
BL p_print_string
LDR r0, [sp, #10]
BL p_print_int
LDR r0, =msg_29
BL p_print_string
LDR r0, [sp, #14]
BL p_print_int
BL p_print_ln
MOV r0, #1
POP {pc}
.ltorg
f_initAI:
PUSH {lr}
SUB sp, sp, #16
LDRSB r0, [sp, #20]
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #12]
LDRSB r0, [sp, #20]
STRB r0, [sp, #-1]!
BL f_generateAllPossibleStates
ADD sp, sp, #1
STR r0, [sp, #8]
MOV r0, #'x'
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #21]
STRB r0, [sp, #-1]!
LDR r0, [sp, #10]
STR r0, [sp, #-4]!
BL f_setValuesForAllStates
ADD sp, sp, #6
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #16
POP {pc}
.ltorg
f_generateAllPossibleStates:
PUSH {lr}
SUB sp, sp, #8
BL f_allocateNewBoard
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_convertFromBoardToState
ADD sp, sp, #4
STR r0, [sp]
MOV r0, #'x'
STRB r0, [sp, #-1]!
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_generateNextStates
ADD sp, sp, #5
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg
f_convertFromBoardToState:
PUSH {lr}
SUB sp, sp, #12
BL f_generateEmptyPointerBoard
STR r0, [sp, #8]
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, =0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #12
POP {pc}
.ltorg
f_generateEmptyPointerBoard:
PUSH {lr}
SUB sp, sp, #20
BL f_generateEmptyPointerRow
STR r0, [sp, #16]
BL f_generateEmptyPointerRow
STR r0, [sp, #12]
BL f_generateEmptyPointerRow
STR r0, [sp, #8]
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg
f_generateEmptyPointerRow:
PUSH {lr}
SUB sp, sp, #8
MOV r0, #0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg
f_generateNextStates:
PUSH {lr}
SUB sp, sp, #14
LDR r0, [sp, #18]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #10]
LDR r0, [sp, #10]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #6]
LDR r0, [sp, #10]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #2]
LDRSB r0, [sp, #22]
STRB r0, [sp, #-1]!
BL f_oppositeSymbol
ADD sp, sp, #1
STRB r0, [sp, #1]
LDRSB r0, [sp, #1]
STRB r0, [sp, #-1]!
LDR r0, [sp, #7]
STR r0, [sp, #-4]!
BL f_hasWon
ADD sp, sp, #5
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L20
LDR r0, [sp, #18]
ADD sp, sp, #14
POP {pc}
B L21
L20:
SUB sp, sp, #1
LDRSB r0, [sp, #23]
STRB r0, [sp, #-1]!
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
BL f_generateNextStatesBoard
ADD sp, sp, #9
STRB r0, [sp]
LDR r0, [sp, #19]
ADD sp, sp, #15
POP {pc}
ADD sp, sp, #1
L21:
.ltorg
f_generateNextStatesBoard:
PUSH {lr}
SUB sp, sp, #33
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #29]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #25]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #21]
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #17]
LDR r0, [sp, #41]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #41]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, =1
STR r0, [sp, #-4]!
LDRSB r0, [sp, #49]
STRB r0, [sp, #-1]!
LDR r0, [sp, #14]
STR r0, [sp, #-4]!
LDR r0, [sp, #34]
STR r0, [sp, #-4]!
LDR r0, [sp, #50]
STR r0, [sp, #-4]!
BL f_generateNextStatesRow
ADD sp, sp, #17
STRB r0, [sp]
LDR r0, =2
STR r0, [sp, #-4]!
LDRSB r0, [sp, #49]
STRB r0, [sp, #-1]!
LDR r0, [sp, #10]
STR r0, [sp, #-4]!
LDR r0, [sp, #30]
STR r0, [sp, #-4]!
LDR r0, [sp, #50]
STR r0, [sp, #-4]!
BL f_generateNextStatesRow
ADD sp, sp, #17
STRB r0, [sp]
LDR r0, =3
STR r0, [sp, #-4]!
LDRSB r0, [sp, #49]
STRB r0, [sp, #-1]!
LDR r0, [sp, #6]
STR r0, [sp, #-4]!
LDR r0, [sp, #26]
STR r0, [sp, #-4]!
LDR r0, [sp, #50]
STR r0, [sp, #-4]!
BL f_generateNextStatesRow
ADD sp, sp, #17
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #33
POP {pc}
.ltorg
f_generateNextStatesRow:
PUSH {lr}
SUB sp, sp, #11
LDR r0, [sp, #19]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #7]
LDR r0, [sp, #7]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #6]
LDR r0, [sp, #7]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #5]
LDR r0, [sp, #19]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #4]
LDR r0, [sp, #23]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #35]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #15]
STRB r0, [sp, #-1]!
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
BL f_generateNextStatesCell
ADD sp, sp, #14
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #0
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #35]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #14]
STRB r0, [sp, #-1]!
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
BL f_generateNextStatesCell
ADD sp, sp, #14
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #35]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #13]
STRB r0, [sp, #-1]!
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
BL f_generateNextStatesCell
ADD sp, sp, #14
PUSH {r0}
LDR r0, [sp, #27]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
MOV r0, #1
ADD sp, sp, #11
POP {pc}
.ltorg
f_generateNextStatesCell:
PUSH {lr}
LDRSB r0, [sp, #8]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L22
SUB sp, sp, #10
LDR r0, [sp, #14]
STR r0, [sp, #-4]!
BL f_cloneBoard
ADD sp, sp, #4
STR r0, [sp, #6]
LDR r0, [sp, #24]
STR r0, [sp, #-4]!
LDR r0, [sp, #24]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #27]
STRB r0, [sp, #-1]!
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
BL f_placeMove
ADD sp, sp, #13
STRB r0, [sp, #5]
LDR r0, [sp, #6]
STR r0, [sp, #-4]!
BL f_convertFromBoardToState
ADD sp, sp, #4
STR r0, [sp, #1]
LDRSB r0, [sp, #19]
STRB r0, [sp, #-1]!
BL f_oppositeSymbol
ADD sp, sp, #1
STRB r0, [sp]
LDRSB r0, [sp]
STRB r0, [sp, #-1]!
LDR r0, [sp, #2]
STR r0, [sp, #-4]!
BL f_generateNextStates
ADD sp, sp, #5
STR r0, [sp, #1]
LDR r0, [sp, #1]
ADD sp, sp, #10
POP {pc}
ADD sp, sp, #10
B L23
L22:
MOV r0, #0
POP {pc}
L23:
.ltorg
f_cloneBoard:
PUSH {lr}
SUB sp, sp, #5
BL f_allocateNewBoard
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_copyBoard
ADD sp, sp, #8
STRB r0, [sp]
LDR r0, [sp, #1]
ADD sp, sp, #5
POP {pc}
.ltorg
f_copyBoard:
PUSH {lr}
SUB sp, sp, #33
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #29]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #25]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #21]
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #17]
LDR r0, [sp, #41]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #41]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
BL f_copyRow
ADD sp, sp, #8
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
BL f_copyRow
ADD sp, sp, #8
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_copyRow
ADD sp, sp, #8
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #33
POP {pc}
.ltorg
f_copyRow:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #0
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
PUSH {r0}
LDR r0, [sp, #20]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
MOV r0, #1
ADD sp, sp, #8
POP {pc}
.ltorg
f_setValuesForAllStates:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L24
LDRSB r0, [sp, #13]
PUSH {r0}
LDRSB r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L26
LDR r0, =101
STR r0, [sp]
B L27
L26:
LDR r0, =-101
STR r0, [sp]
L27:
B L25
L24:
SUB sp, sp, #14
LDR r0, [sp, #22]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #10]
LDR r0, [sp, #10]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #6]
LDR r0, [sp, #10]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #2]
LDRSB r0, [sp, #27]
STRB r0, [sp, #-1]!
BL f_oppositeSymbol
ADD sp, sp, #1
STRB r0, [sp, #1]
LDRSB r0, [sp, #1]
STRB r0, [sp, #-1]!
LDR r0, [sp, #7]
STR r0, [sp, #-4]!
BL f_hasWon
ADD sp, sp, #5
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L28
LDRSB r0, [sp, #1]
PUSH {r0}
LDRSB r0, [sp, #30]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L30
LDR r0, =100
STR r0, [sp, #14]
B L31
L30:
LDR r0, =-100
STR r0, [sp, #14]
L31:
B L29
L28:
SUB sp, sp, #1
LDR r0, [sp, #7]
STR r0, [sp, #-4]!
BL f_containEmptyCell
ADD sp, sp, #4
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L32
LDRSB r0, [sp, #2]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #28]
STRB r0, [sp, #-1]!
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_calculateValuesFromNextStates
ADD sp, sp, #6
STR r0, [sp, #15]
LDR r0, [sp, #15]
PUSH {r0}
LDR r0, =100
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L34
LDR r0, =90
STR r0, [sp, #15]
B L35
L34:
L35:
B L33
L32:
LDR r0, =0
STR r0, [sp, #15]
L33:
ADD sp, sp, #1
L29:
LDR r0, [sp, #14]
PUSH {r0}
LDR r0, [sp, #26]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
ADD sp, sp, #14
L25:
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg
f_calculateValuesFromNextStates:
PUSH {lr}
SUB sp, sp, #32
LDR r0, [sp, #36]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #28]
LDR r0, [sp, #28]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #24]
LDR r0, [sp, #28]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #20]
LDR r0, [sp, #36]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #16]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #26]
STR r0, [sp, #-4]!
BL f_calculateValuesFromNextStatesRow
ADD sp, sp, #6
STR r0, [sp, #12]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #22]
STR r0, [sp, #-4]!
BL f_calculateValuesFromNextStatesRow
ADD sp, sp, #6
STR r0, [sp, #8]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
BL f_calculateValuesFromNextStatesRow
ADD sp, sp, #6
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #53]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #53]
STRB r0, [sp, #-1]!
BL f_combineValue
ADD sp, sp, #14
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #32
POP {pc}
.ltorg
f_calculateValuesFromNextStatesRow:
PUSH {lr}
SUB sp, sp, #32
LDR r0, [sp, #36]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #28]
LDR r0, [sp, #28]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #24]
LDR r0, [sp, #28]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #20]
LDR r0, [sp, #36]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #16]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #26]
STR r0, [sp, #-4]!
BL f_setValuesForAllStates
ADD sp, sp, #6
STR r0, [sp, #12]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #22]
STR r0, [sp, #-4]!
BL f_setValuesForAllStates
ADD sp, sp, #6
STR r0, [sp, #8]
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #41]
STRB r0, [sp, #-1]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
BL f_setValuesForAllStates
ADD sp, sp, #6
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #53]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #53]
STRB r0, [sp, #-1]!
BL f_combineValue
ADD sp, sp, #14
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #32
POP {pc}
.ltorg
f_combineValue:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #13]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L36
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
BL f_min3
ADD sp, sp, #12
STR r0, [sp]
B L37
L36:
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
LDR r0, [sp, #18]
STR r0, [sp, #-4]!
BL f_max3
ADD sp, sp, #12
STR r0, [sp]
L37:
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg
f_min3:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L38
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L40
LDR r0, [sp, #4]
POP {pc}
B L41
L40:
LDR r0, [sp, #12]
POP {pc}
L41:
B L39
L38:
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L42
LDR r0, [sp, #8]
POP {pc}
B L43
L42:
LDR r0, [sp, #12]
POP {pc}
L43:
L39:
.ltorg
f_max3:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L44
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L46
LDR r0, [sp, #4]
POP {pc}
B L47
L46:
LDR r0, [sp, #12]
POP {pc}
L47:
B L45
L44:
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L48
LDR r0, [sp, #8]
POP {pc}
B L49
L48:
LDR r0, [sp, #12]
POP {pc}
L49:
L45:
.ltorg
f_destroyAI:
PUSH {lr}
SUB sp, sp, #9
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
BL p_free_pair
LDR r0, [sp, #13]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #9
POP {pc}
.ltorg
f_askForAMoveAI:
PUSH {lr}
SUB sp, sp, #21
LDR r0, [sp, #31]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #17]
LDR r0, [sp, #31]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #35]
STR r0, [sp, #-4]!
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_findTheBestMove
ADD sp, sp, #12
STRB r0, [sp]
LDR r0, =msg_30
BL p_print_string
BL p_print_ln
LDR r0, [sp, #35]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #39]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_deleteAllOtherChildren
ADD sp, sp, #12
PUSH {r0}
LDR r0, [sp, #35]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_deleteThisStateOnly
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #21
POP {pc}
.ltorg
f_findTheBestMove:
PUSH {lr}
SUB sp, sp, #1
LDR r0, [sp, #9]
PUSH {r0}
LDR r0, =90
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L50
SUB sp, sp, #1
LDR r0, [sp, #14]
STR r0, [sp, #-4]!
LDR r0, =100
STR r0, [sp, #-4]!
LDR r0, [sp, #14]
STR r0, [sp, #-4]!
BL f_findMoveWithGivenValue
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L52
MOV r0, #1
ADD sp, sp, #2
POP {pc}
B L53
L52:
L53:
ADD sp, sp, #1
B L51
L50:
L51:
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_findMoveWithGivenValue
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L54
MOV r0, #1
ADD sp, sp, #1
POP {pc}
B L55
L54:
LDR r0, =msg_31
BL p_print_string
BL p_print_ln
LDR r0, =-1
BL exit
L55:
.ltorg
f_findMoveWithGivenValue:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #17]
STR r0, [sp, #-4]!
BL f_findMoveWithGivenValueRow
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L56
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L57
L56:
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_findMoveWithGivenValueRow
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L58
LDR r0, =2
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L59
L58:
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_findMoveWithGivenValueRow
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L60
LDR r0, =3
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L61
L60:
MOV r0, #0
ADD sp, sp, #17
POP {pc}
L61:
L59:
L57:
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_findMoveWithGivenValueRow:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_hasGivenStateValue
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L62
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L63
L62:
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_hasGivenStateValue
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L64
LDR r0, =2
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L65
L64:
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_hasGivenStateValue
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L66
LDR r0, =3
PUSH {r0, r4}
LDR r4, [sp, #37]
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L67
L66:
MOV r0, #0
ADD sp, sp, #17
POP {pc}
L67:
L65:
L63:
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_hasGivenStateValue:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L68
MOV r0, #0
POP {pc}
B L69
L68:
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
ADD sp, sp, #4
POP {pc}
ADD sp, sp, #4
L69:
.ltorg
f_notifyMoveAI:
PUSH {lr}
SUB sp, sp, #21
LDR r0, [sp, #31]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #17]
LDR r0, [sp, #31]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, =msg_32
BL p_print_string
BL p_print_ln
LDR r0, [sp, #39]
STR r0, [sp, #-4]!
LDR r0, [sp, #39]
STR r0, [sp, #-4]!
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_deleteAllOtherChildren
ADD sp, sp, #12
PUSH {r0}
LDR r0, [sp, #35]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_deleteThisStateOnly
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #21
POP {pc}
.ltorg
f_deleteAllOtherChildren:
PUSH {lr}
SUB sp, sp, #33
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #29]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #25]
LDR r0, [sp, #29]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #21]
LDR r0, [sp, #37]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #17]
MOV r0, #0
STR r0, [sp, #13]
MOV r0, #0
STR r0, [sp, #9]
MOV r0, #0
STR r0, [sp, #5]
LDR r0, [sp, #41]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L70
LDR r0, [sp, #25]
STR r0, [sp, #13]
LDR r0, [sp, #21]
STR r0, [sp, #9]
LDR r0, [sp, #17]
STR r0, [sp, #5]
B L71
L70:
LDR r0, [sp, #25]
STR r0, [sp, #9]
LDR r0, [sp, #41]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L72
LDR r0, [sp, #21]
STR r0, [sp, #13]
LDR r0, [sp, #17]
STR r0, [sp, #5]
B L73
L72:
LDR r0, [sp, #17]
STR r0, [sp, #13]
LDR r0, [sp, #21]
STR r0, [sp, #5]
L73:
L71:
LDR r0, [sp, #45]
STR r0, [sp, #-4]!
LDR r0, [sp, #17]
STR r0, [sp, #-4]!
BL f_deleteAllOtherChildrenRow
ADD sp, sp, #8
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursivelyRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursivelyRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
ADD sp, sp, #33
POP {pc}
.ltorg
f_deleteAllOtherChildrenRow:
PUSH {lr}
SUB sp, sp, #29
LDR r0, [sp, #33]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #25]
LDR r0, [sp, #25]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #21]
LDR r0, [sp, #25]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #17]
LDR r0, [sp, #33]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #13]
MOV r0, #0
STR r0, [sp, #9]
MOV r0, #0
STR r0, [sp, #5]
MOV r0, #0
STR r0, [sp, #1]
LDR r0, [sp, #37]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L74
LDR r0, [sp, #21]
STR r0, [sp, #9]
LDR r0, [sp, #17]
STR r0, [sp, #5]
LDR r0, [sp, #13]
STR r0, [sp, #1]
B L75
L74:
LDR r0, [sp, #21]
STR r0, [sp, #5]
LDR r0, [sp, #37]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L76
LDR r0, [sp, #17]
STR r0, [sp, #9]
LDR r0, [sp, #13]
STR r0, [sp, #1]
B L77
L76:
LDR r0, [sp, #13]
STR r0, [sp, #9]
LDR r0, [sp, #17]
STR r0, [sp, #1]
L77:
L75:
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #9]
ADD sp, sp, #29
POP {pc}
.ltorg
f_deleteStateTreeRecursively:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L78
MOV r0, #1
POP {pc}
B L79
L78:
SUB sp, sp, #13
LDR r0, [sp, #17]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #17]
STR r0, [sp, #-4]!
BL f_deleteThisStateOnly
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #13
POP {pc}
ADD sp, sp, #13
L79:
.ltorg
f_deleteThisStateOnly:
PUSH {lr}
SUB sp, sp, #13
LDR r0, [sp, #17]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_freeBoard
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_freePointers
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #9]
BL p_free_pair
LDR r0, [sp, #17]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #13
POP {pc}
.ltorg
f_freePointers:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_freePointersRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_freePointersRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_freePointersRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #13]
BL p_free_pair
LDR r0, [sp, #21]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_freePointersRow:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_free_pair
LDR r0, [sp, #8]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #4
POP {pc}
.ltorg
f_deleteChildrenStateRecursively:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursivelyRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursivelyRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_deleteChildrenStateRecursivelyRow
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_deleteChildrenStateRecursivelyRow:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_deleteStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_askForAMove:
PUSH {lr}
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #13]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L80
SUB sp, sp, #1
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_askForAMoveHuman
ADD sp, sp, #8
STRB r0, [sp]
ADD sp, sp, #1
B L81
L80:
SUB sp, sp, #1
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #18]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #18]
STRB r0, [sp, #-1]!
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
BL f_askForAMoveAI
ADD sp, sp, #14
STRB r0, [sp]
ADD sp, sp, #1
L81:
MOV r0, #1
POP {pc}
.ltorg
f_placeMove:
PUSH {lr}
SUB sp, sp, #4
MOV r0, #0
STR r0, [sp]
LDR r0, [sp, #13]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L82
SUB sp, sp, #4
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #17]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L84
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
B L85
L84:
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #4]
L85:
ADD sp, sp, #4
B L83
L82:
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
L83:
LDR r0, [sp, #17]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L86
SUB sp, sp, #4
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #21]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L88
LDRSB r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #0
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
B L89
L88:
LDRSB r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
L89:
ADD sp, sp, #4
B L87
L86:
LDRSB r0, [sp, #12]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
L87:
MOV r0, #1
ADD sp, sp, #4
POP {pc}
.ltorg
f_notifyMove:
PUSH {lr}
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #13]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L90
SUB sp, sp, #1
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #22]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #22]
STRB r0, [sp, #-1]!
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
BL f_notifyMoveAI
ADD sp, sp, #18
STRB r0, [sp]
ADD sp, sp, #1
B L91
L90:
SUB sp, sp, #1
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #18]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #18]
STRB r0, [sp, #-1]!
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
BL f_notifyMoveHuman
ADD sp, sp, #14
STRB r0, [sp]
ADD sp, sp, #1
L91:
MOV r0, #1
POP {pc}
.ltorg
f_oppositeSymbol:
PUSH {lr}
LDRSB r0, [sp, #4]
PUSH {r0}
MOV r0, #'x'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L92
MOV r0, #'o'
POP {pc}
B L93
L92:
LDRSB r0, [sp, #4]
PUSH {r0}
MOV r0, #'o'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L94
MOV r0, #'x'
POP {pc}
B L95
L94:
LDR r0, =msg_33
BL p_print_string
BL p_print_ln
LDR r0, =-1
BL exit
L95:
L93:
.ltorg
f_symbolAt:
PUSH {lr}
SUB sp, sp, #5
MOV r0, #0
STR r0, [sp, #1]
LDR r0, [sp, #13]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L96
SUB sp, sp, #4
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #17]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L98
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
B L99
L98:
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
L99:
ADD sp, sp, #4
B L97
L96:
LDR r0, [sp, #9]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
L97:
MOV r0, #0
STRB r0, [sp]
LDR r0, [sp, #17]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L100
SUB sp, sp, #4
LDR r0, [sp, #5]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #21]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L102
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #4]
B L103
L102:
LDR r0, [sp]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #4]
L103:
ADD sp, sp, #4
B L101
L100:
LDR r0, [sp, #1]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp]
L101:
LDRSB r0, [sp]
ADD sp, sp, #5
POP {pc}
.ltorg
f_containEmptyCell:
PUSH {lr}
SUB sp, sp, #19
LDR r0, [sp, #23]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #15]
LDR r0, [sp, #15]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #11]
LDR r0, [sp, #15]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #7]
LDR r0, [sp, #23]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #3]
LDR r0, [sp, #11]
STR r0, [sp, #-4]!
BL f_containEmptyCellRow
ADD sp, sp, #4
STRB r0, [sp, #2]
LDR r0, [sp, #7]
STR r0, [sp, #-4]!
BL f_containEmptyCellRow
ADD sp, sp, #4
STRB r0, [sp, #1]
LDR r0, [sp, #3]
STR r0, [sp, #-4]!
BL f_containEmptyCellRow
ADD sp, sp, #4
STRB r0, [sp]
LDRSB r0, [sp, #2]
CMP r0, #1
BEQ L104
LDRSB r0, [sp, #1]
CMP r0, #1
BEQ L104
LDRSB r0, [sp]
L104:
ADD sp, sp, #19
POP {pc}
.ltorg
f_containEmptyCellRow:
PUSH {lr}
SUB sp, sp, #7
LDR r0, [sp, #11]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #3]
LDR r0, [sp, #3]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #2]
LDR r0, [sp, #3]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #1]
LDR r0, [sp, #11]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp]
LDRSB r0, [sp, #2]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L105
LDRSB r0, [sp, #1]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L105
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L105:
ADD sp, sp, #7
POP {pc}
.ltorg
f_hasWon:
PUSH {lr}
SUB sp, sp, #9
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #8]
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #7]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #6]
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #5]
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #4]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #3]
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #2]
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp, #1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, [sp, #21]
STR r0, [sp, #-4]!
BL f_symbolAt
ADD sp, sp, #12
STRB r0, [sp]
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L106
LDRSB r0, [sp, #7]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L106
LDRSB r0, [sp, #6]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L106:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #5]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L108
LDRSB r0, [sp, #4]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L108
LDRSB r0, [sp, #3]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L108:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #2]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L109
LDRSB r0, [sp, #1]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L109
LDRSB r0, [sp]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L109:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L110
LDRSB r0, [sp, #5]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L110
LDRSB r0, [sp, #2]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L110:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #7]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L111
LDRSB r0, [sp, #4]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L111
LDRSB r0, [sp, #1]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L111:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #6]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L112
LDRSB r0, [sp, #3]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L112
LDRSB r0, [sp]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L112:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #8]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L113
LDRSB r0, [sp, #4]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L113
LDRSB r0, [sp]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L113:
CMP r0, #1
BEQ L107
LDRSB r0, [sp, #6]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L114
LDRSB r0, [sp, #4]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L114
LDRSB r0, [sp, #2]
PUSH {r0}
LDRSB r0, [sp, #21]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L114:
L107:
ADD sp, sp, #9
POP {pc}
.ltorg
f_allocateNewBoard:
PUSH {lr}
SUB sp, sp, #20
BL f_allocateNewRow
STR r0, [sp, #16]
BL f_allocateNewRow
STR r0, [sp, #12]
BL f_allocateNewRow
STR r0, [sp, #8]
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg
f_allocateNewRow:
PUSH {lr}
SUB sp, sp, #8
MOV r0, #0
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg
f_freeBoard:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_freeRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_freeRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_freeRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #13]
BL p_free_pair
LDR r0, [sp, #21]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_freeRow:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_free_pair
LDR r0, [sp, #8]
BL p_free_pair
MOV r0, #1
ADD sp, sp, #4
POP {pc}
.ltorg
f_printAiData:
PUSH {lr}
SUB sp, sp, #9
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_printStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, =0
BL exit
.ltorg
f_printStateTreeRecursively:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L115
MOV r0, #1
POP {pc}
B L116
L115:
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
MOV r0, #'v'
BL putchar
MOV r0, #'='
BL putchar
LDR r0, [sp, #1]
BL p_print_int
BL p_print_ln
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_printBoard
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_printChildrenStateTree
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #'p'
BL putchar
BL p_print_ln
MOV r0, #1
ADD sp, sp, #17
POP {pc}
ADD sp, sp, #17
L116:
.ltorg
f_printChildrenStateTree:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_printChildrenStateTreeRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_printChildrenStateTreeRow
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_printChildrenStateTreeRow
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
f_printChildrenStateTreeRow:
PUSH {lr}
SUB sp, sp, #17
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #13]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #9]
LDR r0, [sp, #13]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #5]
LDR r0, [sp, #21]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #1]
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
BL f_printStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_printStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
BL f_printStateTreeRecursively
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #17
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #17
BL f_chooseSymbol
STRB r0, [sp, #16]
LDRSB r0, [sp, #16]
STRB r0, [sp, #-1]!
BL f_oppositeSymbol
ADD sp, sp, #1
STRB r0, [sp, #15]
MOV r0, #'x'
STRB r0, [sp, #14]
BL f_allocateNewBoard
STR r0, [sp, #10]
LDR r0, =msg_34
BL p_print_string
BL p_print_ln
LDRSB r0, [sp, #15]
STRB r0, [sp, #-1]!
BL f_initAI
ADD sp, sp, #1
STR r0, [sp, #6]
LDR r0, =0
STR r0, [sp, #2]
MOV r0, #0
STRB r0, [sp, #1]
LDR r0, [sp, #10]
STR r0, [sp, #-4]!
BL f_printBoard
ADD sp, sp, #4
STRB r0, [sp]
B L118
L117:
SUB sp, sp, #5
MOV r0, #12
BL malloc
MOV r3, r0
LDR r0, =0
STR r0, [r3, #4]
LDR r0, =0
STR r0, [r3, #8]
MOV r0, #2
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #29]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #28]
STRB r0, [sp, #-1]!
LDR r0, [sp, #25]
STR r0, [sp, #-4]!
BL f_askForAMove
ADD sp, sp, #14
STRB r0, [sp, #5]
LDR r0, [sp, #1]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #5]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDRSB r0, [sp, #27]
STRB r0, [sp, #-1]!
LDR r0, [sp, #24]
STR r0, [sp, #-4]!
BL f_placeMove
ADD sp, sp, #13
STRB r0, [sp, #5]
LDR r0, [sp, #1]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #5]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #19]
STR r0, [sp, #-4]!
LDRSB r0, [sp, #33]
STRB r0, [sp, #-1]!
LDRSB r0, [sp, #32]
STRB r0, [sp, #-1]!
LDR r0, [sp, #29]
STR r0, [sp, #-4]!
BL f_notifyMove
ADD sp, sp, #18
STRB r0, [sp, #5]
LDR r0, [sp, #15]
STR r0, [sp, #-4]!
BL f_printBoard
ADD sp, sp, #4
STRB r0, [sp, #5]
LDRSB r0, [sp, #19]
STRB r0, [sp, #-1]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_hasWon
ADD sp, sp, #5
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L119
LDRSB r0, [sp, #19]
STRB r0, [sp, #6]
B L120
L119:
L120:
LDRSB r0, [sp, #19]
STRB r0, [sp, #-1]!
BL f_oppositeSymbol
ADD sp, sp, #1
STRB r0, [sp, #19]
LDR r0, [sp, #7]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #7]
ADD sp, sp, #5
L118:
LDRSB r0, [sp, #1]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L121
LDR r0, [sp, #2]
PUSH {r0}
LDR r0, =9
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
L121:
CMP r0, #1
BEQ L117
LDR r0, [sp, #10]
STR r0, [sp, #-4]!
BL f_freeBoard
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #6]
STR r0, [sp, #-4]!
BL f_destroyAI
ADD sp, sp, #4
STRB r0, [sp]
LDRSB r0, [sp, #1]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L122
LDRSB r0, [sp, #1]
BL putchar
LDR r0, =msg_35
BL p_print_string
BL p_print_ln
B L123
L122:
LDR r0, =msg_36
BL p_print_string
BL p_print_ln
L123:
ADD sp, sp, #17
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_37
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_38
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_read_char:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_39
ADD r0, r0, #4
BL scanf
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_40
BLEQ p_throw_runtime_error
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_41
ADD r0, r0, #4
BL scanf
POP {pc}
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_42
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_43
BLCS p_throw_runtime_error
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_44
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_free_pair:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_45
BEQ p_throw_runtime_error
PUSH {r0}
LDR r0, [r0]
BL free
LDR r0, [sp]
LDR r0, [r0, #4]
BL free
POP {r0}
BL free
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_46
BL p_throw_runtime_error
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
