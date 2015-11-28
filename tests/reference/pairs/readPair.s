.data

msg_0:
.word 39
.ascii "Please enter the first element (char): "
msg_1:
.word 39
.ascii "Please enter the second element (int): "
msg_2:
.word 22
.ascii "The first element was "
msg_3:
.word 23
.ascii "The second element was "
msg_4:
.word 5
.ascii "%.*s\0"
msg_5:
.word 4
.ascii " %c\0"
msg_6:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_7:
.word 3
.ascii "%d\0"
msg_8:
.word 1
.ascii "\0"
msg_9:
.word 3
.ascii "%d\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #9
MOV r0, #0
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
LDR r0, =0
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
STR r0, [sp, #5]
LDR r0, =msg_0
BL p_print_string
MOV r0, #'0'
STRB r0, [sp, #4]
ADD r0, sp, #4
BL p_read_char
LDRSB r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #9]
BL p_check_null_pointer
ADD r0, r0, #0
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
LDR r0, =msg_1
BL p_print_string
LDR r0, =0
STR r0, [sp]
ADD r0, sp, #0
BL p_read_int
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #9]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
MOV r0, #0
STRB r0, [sp, #4]
LDR r0, =-1
STR r0, [sp]
LDR r0, =msg_2
BL p_print_string
LDR r0, [sp, #5]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #4]
LDRSB r0, [sp, #4]
BL putchar
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp, #5]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #9
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
p_read_char:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_5
ADD r0, r0, #4
BL scanf
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_6
BLEQ p_throw_runtime_error
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_7
ADD r0, r0, #4
BL scanf
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_8
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_9
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
