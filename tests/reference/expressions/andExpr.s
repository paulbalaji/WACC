.data

msg_0:
.word 5
.ascii "true\0"
msg_1:
.word 6
.ascii "false\0"
msg_2:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #2
MOV r0, #1
STRB r0, [sp, #1]
MOV r0, #0
STRB r0, [sp]
LDRSB r0, [sp, #1]
CMP r0, #0
BEQ L0
LDRSB r0, [sp]
L0:
BL p_print_bool
BL p_print_ln
LDRSB r0, [sp, #1]
CMP r0, #0
BEQ L1
MOV r0, #1
L1:
BL p_print_bool
BL p_print_ln
LDRSB r0, [sp]
CMP r0, #0
BEQ L2
MOV r0, #0
L2:
BL p_print_bool
BL p_print_ln
ADD sp, sp, #2
MOV r0, #0
POP {pc}
p_print_bool:
PUSH {lr}
CMP r0, #0
LDRNE r0, =msg_0
LDREQ r0, =msg_1
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_2
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
