.data

msg_0:
.word 5
.ascii "Hello"
msg_1:
.word 3
.ascii "foo"
msg_2:
.word 3
.ascii "foo"
msg_3:
.word 5
.ascii "true\0"
msg_4:
.word 6
.ascii "false\0"
msg_5:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #13
LDR r0, =msg_0
STR r0, [sp, #9]
LDR r0, =msg_1
STR r0, [sp, #5]
LDR r0, =msg_2
STR r0, [sp, #1]
LDR r0, [sp, #9]
PUSH {r0}
LDR r0, [sp, #13]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
STRB r0, [sp]
LDRSB r0, [sp]
BL p_print_bool
BL p_print_ln
LDR r0, [sp, #9]
PUSH {r0}
LDR r0, [sp, #9]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
BL p_print_bool
BL p_print_ln
LDR r0, [sp, #5]
PUSH {r0}
LDR r0, [sp, #5]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
BL p_print_bool
BL p_print_ln
ADD sp, sp, #13
MOV r0, #0
POP {pc}
p_print_bool:
PUSH {lr}
CMP r0, #0
LDRNE r0, =msg_3
LDREQ r0, =msg_4
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_5
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
