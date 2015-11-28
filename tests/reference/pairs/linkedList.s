.data

msg_0:
.word 8
.ascii "list = {"
msg_1:
.word 2
.ascii ", "
msg_2:
.word 1
.ascii "}"
msg_3:
.word 5
.ascii "%.*s\0"
msg_4:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_5:
.word 3
.ascii "%d\0"
msg_6:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #28
LDR r0, =11
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #24]
LDR r0, =4
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #28]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #20]
LDR r0, =2
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #24]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #16]
LDR r0, =1
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #20]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #12]
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp, #12]
STR r0, [sp, #8]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L1
L0:
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
LDR r0, =msg_1
BL p_print_string
LDR r0, [sp, #4]
STR r0, [sp, #8]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #4]
L1:
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L0
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
ADD sp, sp, #28
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_3
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_4
BLEQ p_throw_runtime_error
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_5
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_6
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
