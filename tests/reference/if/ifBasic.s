.text

.global main
main:
PUSH {lr}
MOV r0, #1
CMP r0, #0
BEQ L0
B L1
L0:
L1:
MOV r0, #0
POP {pc}
