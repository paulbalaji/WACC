.data

msg_0:
.word 3
.ascii "foo"
msg_1:
.word 3
.ascii "bar"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =msg_0
STR r0, [sp]
LDR r0, =msg_1
STR r0, [sp]
ADD sp, sp, #4
MOV r0, #0
POP {pc}
