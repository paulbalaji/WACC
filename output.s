Compiling Front End...
Compiling Back End...
.data 
msg_0:
.word 3
.ascii "hi
"
msg_1:
.word 5
.ascii "%.*s "
.text 
.global main
main:
PUSH {lr}
LDR r0, =msg_0
BL p_print_string
LDR r0, =0
POP {pc}
.ltorg 
p_print_string:
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_1
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
