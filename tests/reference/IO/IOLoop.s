.data

msg_0:
.word 25
.ascii "Please input an integer: "
msg_1:
.word 12
.ascii "echo input: "
msg_2:
.word 39
.ascii "Do you want to continue entering input?"
msg_3:
.word 34
.ascii "(enter Y for \'yes\' and N for \'no\')"
msg_4:
.word 5
.ascii "%.*s\0"
msg_5:
.word 3
.ascii "%d\0"
msg_6:
.word 3
.ascii "%d\0"
msg_7:
.word 1
.ascii "\0"
msg_8:
.word 4
.ascii " %c\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #5
MOV r0, #'Y'
STRB r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L1
L0:
LDR r0, =msg_0
BL p_print_string
ADD r0, sp, #0
BL p_read_int
LDR r0, =msg_1
BL p_print_string
LDR r0, [sp]
BL p_print_int
BL p_print_ln
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
BL p_print_ln
ADD r0, sp, #4
BL p_read_char
L1:
LDRSB r0, [sp, #4]
PUSH {r0}
MOV r0, #'N'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L0
ADD sp, sp, #5
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_4
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_5
ADD r0, r0, #4
BL scanf
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_6
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_7
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_read_char:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_8
ADD r0, r0, #4
BL scanf
POP {pc}
