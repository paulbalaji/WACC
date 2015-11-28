.data

msg_0:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_1:
.word 3
.ascii "%d\0"
msg_2:
.word 5
.ascii "%.*s\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
MOV r0, #0
STR r0, [sp]
PUSH {r0}
LDR r0, [sp, #4]
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
ADD r0, r1, #0
BL p_read_int
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_0
BLEQ p_throw_runtime_error
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_1
ADD r0, r0, #4
BL scanf
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
