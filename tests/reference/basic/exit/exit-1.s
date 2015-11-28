.text

.global main
main:
PUSH {lr}
LDR r0, =-1
BL exit
MOV r0, #0
POP {pc}
