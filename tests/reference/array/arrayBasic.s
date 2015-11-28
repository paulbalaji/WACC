.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
MOV r0, #8
BL malloc
MOV r3, r0
LDR r0, =0
STR r0, [r3, #4]
MOV r0, #1
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
ADD sp, sp, #4
MOV r0, #0
POP {pc}
