.data

msg_0:
.word 7
.ascii "Correct"
msg_1:
.word 5
.ascii "Wrong"
msg_2:
.word 5
.ascii "%.*s\0"
msg_3:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #1
MOV r0, #1
CMP r0, #0
BEQ L0
MOV r0, #0
L0:
CMP r0, #1
BEQ L1
MOV r0, #1
CMP r0, #0
BEQ L2
MOV r0, #0
L2:
L1:
EOR r0, r0, #1
STRB r0, [sp]
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L3
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
B L4
L3:
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
L4:
ADD sp, sp, #1
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_2
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_3
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
