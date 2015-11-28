.text

.global main
f_f:
PUSH {lr}
LDR r0, =0
POP {pc}
.ltorg
main:
PUSH {lr}
MOV r0, #0
POP {pc}
