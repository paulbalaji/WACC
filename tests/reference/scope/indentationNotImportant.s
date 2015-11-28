.text

.global main
main:
PUSH {lr}
B L1
L0:
L1:
MOV r0, #0
CMP r0, #1
BEQ L0
MOV r0, #0
POP {pc}
