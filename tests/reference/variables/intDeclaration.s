.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =42
STR r0, [sp]
ADD sp, sp, #4
MOV r0, #0
POP {pc}
