.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =8
BL malloc
MOV r4, r0
LDR r5, =10
LDR r0, =4
BL malloc
STR r5, [r0]
STR r0, [r4]
LDR r5, =3
LDR r0, =4
BL malloc
STR r5, [r0]
STR r0, [r4, #4]
STR r4, [sp]
ADD sp, sp, #4
LDR r0, =0
POP {pc}
.ltorg
