.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =10
STR r0, [sp]
LDR r0, =20
STR r0, [sp]
LDR r0, [sp]
BL exit
ADD sp, sp, #4
MOV r0, #0
POP {pc}
