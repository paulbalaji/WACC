.data 
msg_0:
.word 5
.ascii "%.*s\0"
.text 
.global main
main:
PUSH {lr}
LDR r0, =5
BL p_print_string
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_0
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
