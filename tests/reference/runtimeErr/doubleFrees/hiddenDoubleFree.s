.data

msg_0:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_1:
.word 5
.ascii "%.*s\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #8
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
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp]
LDR r0, [sp, #4]
BL p_free_pair
LDR r0, [sp]
BL p_free_pair
ADD sp, sp, #8
MOV r0, #0
POP {pc}
p_free_pair:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_0
BEQ p_throw_runtime_error
PUSH {r0}
LDR r0, [r0]
BL free
LDR r0, [sp]
LDR r0, [r0, #4]
BL free
POP {r0}
BL free
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_1
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}