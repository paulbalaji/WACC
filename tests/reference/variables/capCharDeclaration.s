.text

.global main
main:
PUSH {lr}
SUB sp, sp, #1
MOV r0, #'M'
STRB r0, [sp]
ADD sp, sp, #1
MOV r0, #0
POP {pc}
