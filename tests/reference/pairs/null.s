.data

msg_0:
.word 3
.ascii "%p\0"
msg_1:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
MOV r0, #0
STR r0, [sp]
LDR r0, [sp]
BL p_print_reference
BL p_print_ln
MOV r0, #0
STR r0, [sp]
LDR r0, [sp]
BL p_print_reference
BL p_print_ln
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_print_reference:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_0
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_1
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
