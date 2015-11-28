.data

msg_0:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_1:
.word 1
.ascii "\0"
msg_2:
.word 5
.ascii "%.*s\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #5
LDR r0, =10
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #'a'
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #1]
LDR r0, [sp, #1]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp]
LDRSB r0, [sp]
BL putchar
BL p_print_ln
MOV r0, #'Z'
PUSH {r0}
LDR r0, [sp, #5]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #1
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STRB r0, [r1]
LDR r0, [sp, #1]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp]
LDRSB r0, [sp]
BL putchar
BL p_print_ln
ADD sp, sp, #5
MOV r0, #0
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_0
BLEQ p_throw_runtime_error
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_1
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_2
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
