.data

msg_0:
.word 3
.ascii "%d\0"
msg_1:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, =43
STR r0, [r3, #4]
LDR r0, =2
STR r0, [r3, #8]
LDR r0, =18
STR r0, [r3, #12]
LDR r0, =1
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
LDR r0, [r0]
BL p_print_int
BL p_print_ln
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_print_int:
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
