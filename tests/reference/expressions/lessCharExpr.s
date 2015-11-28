.data

msg_0:
.word 5
.ascii "true\0"
msg_1:
.word 6
.ascii "false\0"
msg_2:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #3
MOV r0, #'a'
STRB r0, [sp, #2]
MOV r0, #'e'
STRB r0, [sp, #1]
MOV r0, #'c'
STRB r0, [sp]
LDRSB r0, [sp, #2]
PUSH {r0}
LDRSB r0, [sp, #5]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
BL p_print_bool
BL p_print_ln
LDRSB r0, [sp, #1]
PUSH {r0}
LDRSB r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
BL p_print_bool
BL p_print_ln
ADD sp, sp, #3
MOV r0, #0
POP {pc}
p_print_bool:
PUSH {lr}
CMP r0, #0
LDRNE r0, =msg_0
LDREQ r0, =msg_1
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_2
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
