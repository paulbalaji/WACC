.text

.global main
main:
PUSH {lr}
LDR r0, =256
BL exit
MOV r0, #0
POP {pc}
