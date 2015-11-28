.data

msg_0:
.word 24
.ascii "enter an integer to echo"
msg_1:
.word 5
.ascii "%.*s\0"
msg_2:
.word 1
.ascii "\0"
msg_3:
.word 3
.ascii "%d\0"
msg_4:
.word 3
.ascii "%d\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =1
STR r0, [sp]
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
ADD r0, sp, #0
BL p_read_int
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_1
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
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_3
ADD r0, r0, #4
BL scanf
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_4
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
