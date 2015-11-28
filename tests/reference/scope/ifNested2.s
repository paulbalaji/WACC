.data

msg_0:
.word 9
.ascii "incorrect"
msg_1:
.word 9
.ascii "incorrect"
msg_2:
.word 7
.ascii "correct"
msg_3:
.word 9
.ascii "incorrect"
msg_4:
.word 9
.ascii "incorrect"
msg_5:
.word 9
.ascii "incorrect"
msg_6:
.word 5
.ascii "%.*s\0"
msg_7:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =13
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
LDR r0, =13
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L0
LDR r0, [sp]
PUSH {r0}
LDR r0, =5
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L2
LDR r0, [sp]
PUSH {r0}
LDR r0, =10
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L4
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
B L5
L4:
LDR r0, [sp]
PUSH {r0}
LDR r0, =12
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L6
LDR r0, [sp]
PUSH {r0}
LDR r0, =13
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #0
BEQ L8
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
B L9
L8:
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
L9:
B L7
L6:
LDR r0, =msg_3
BL p_print_string
BL p_print_ln
L7:
L5:
B L3
L2:
LDR r0, =msg_4
BL p_print_string
BL p_print_ln
L3:
B L1
L0:
LDR r0, =msg_5
BL p_print_string
BL p_print_ln
L1:
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_6
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_7
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
