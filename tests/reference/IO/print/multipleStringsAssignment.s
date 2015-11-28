.data

msg_0:
.word 2
.ascii "Hi"
msg_1:
.word 2
.ascii "Hi"
msg_2:
.word 6
.ascii "s1 is "
msg_3:
.word 6
.ascii "s2 is "
msg_4:
.word 18
.ascii "They are the same."
msg_5:
.word 22
.ascii "They are not the same."
msg_6:
.word 22
.ascii "Now modify s1[0] = \'h\'"
msg_7:
.word 6
.ascii "s1 is "
msg_8:
.word 6
.ascii "s2 is "
msg_9:
.word 18
.ascii "They are the same."
msg_10:
.word 22
.ascii "They are not the same."
msg_11:
.word 5
.ascii "%.*s\0"
msg_12:
.word 1
.ascii "\0"
msg_13:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_14:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =msg_0
STR r0, [sp, #4]
LDR r0, =msg_1
STR r0, [sp]
LDR r0, =msg_2
BL p_print_string
LDR r0, [sp, #4]
BL p_print_string
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp]
BL p_print_string
BL p_print_ln
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L0
LDR r0, =msg_4
BL p_print_string
BL p_print_ln
B L1
L0:
LDR r0, =msg_5
BL p_print_string
BL p_print_ln
L1:
LDR r0, =msg_6
BL p_print_string
BL p_print_ln
MOV r0, #'h'
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, =msg_7
BL p_print_string
LDR r0, [sp, #4]
BL p_print_string
BL p_print_ln
LDR r0, =msg_8
BL p_print_string
LDR r0, [sp]
BL p_print_string
BL p_print_ln
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L2
LDR r0, =msg_9
BL p_print_string
BL p_print_ln
B L3
L2:
LDR r0, =msg_10
BL p_print_string
BL p_print_ln
L3:
ADD sp, sp, #8
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_11
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_12
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_13
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_14
BLCS p_throw_runtime_error
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
