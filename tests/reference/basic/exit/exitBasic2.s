.text

.global main
main:
PUSH {lr}
LDR r0, =42
BL exit
MOV r0, #0
POP {pc}
