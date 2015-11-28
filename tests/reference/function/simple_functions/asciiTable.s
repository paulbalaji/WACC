.data

msg_0:
.word 1
.ascii "-"
msg_1:
.word 0
.ascii ""
msg_2:
.word 3
.ascii "| "
msg_3:
.word 1
.ascii " "
msg_4:
.word 3
.ascii " = "
msg_5:
.word 3
.ascii " |"
msg_6:
.word 28
.ascii "Asci character lookup table:"
msg_7:
.word 5
.ascii "%.*s\0"
msg_8:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_9:
.word 1
.ascii "\0"
msg_10:
.word 3
.ascii "%d\0"

.text

.global main
f_printLine:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L1
L0:
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L1:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L0
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
MOV r0, #1
ADD sp, sp, #4
POP {pc}
.ltorg
f_printMap:
PUSH {lr}
LDR r0, =msg_2
BL p_print_string
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =100
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L2
LDR r0, =msg_3
BL p_print_string
B L3
L2:
L3:
LDR r0, [sp, #4]
BL p_print_int
LDR r0, =msg_4
BL p_print_string
LDR r0, [sp, #4]
BL putchar
LDR r0, =msg_5
BL p_print_string
BL p_print_ln
MOV r0, #1
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #5
LDR r0, =msg_6
BL p_print_string
BL p_print_ln
LDR r0, =13
STR r0, [sp, #-4]!
BL f_printLine
ADD sp, sp, #4
STRB r0, [sp, #4]
MOV r0, #' '
STR r0, [sp]
B L5
L4:
LDR r0, [sp]
STR r0, [sp, #-4]!
BL f_printMap
ADD sp, sp, #4
STRB r0, [sp, #4]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L5:
LDR r0, [sp]
PUSH {r0}
LDR r0, =127
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L4
LDR r0, =13
STR r0, [sp, #-4]!
BL f_printLine
ADD sp, sp, #4
STRB r0, [sp, #4]
ADD sp, sp, #5
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_7
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_8
BL p_throw_runtime_error
p_print_ln:
PUSH {lr}
LDR r0, =msg_9
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_10
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
