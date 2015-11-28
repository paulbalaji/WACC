.data

msg_0:
.word 4
.ascii " = {"
msg_1:
.word 2
.ascii ", "
msg_2:
.word 1
.ascii "}"
msg_3:
.word 3
.ascii "%p\0"
msg_4:
.word 5
.ascii "%.*s\0"
msg_5:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_6:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"
msg_7:
.word 3
.ascii "%d\0"
msg_8:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_9:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #8
MOV r0, #44
BL malloc
MOV r3, r0
LDR r0, =0
STR r0, [r3, #4]
LDR r0, =1
STR r0, [r3, #8]
LDR r0, =2
STR r0, [r3, #12]
LDR r0, =3
STR r0, [r3, #16]
LDR r0, =4
STR r0, [r3, #20]
LDR r0, =5
STR r0, [r3, #24]
LDR r0, =6
STR r0, [r3, #28]
LDR r0, =7
STR r0, [r3, #32]
LDR r0, =8
STR r0, [r3, #36]
LDR r0, =9
STR r0, [r3, #40]
MOV r0, #10
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
LDR r0, [sp, #4]
BL p_print_reference
LDR r0, =msg_0
BL p_print_string
LDR r0, =0
STR r0, [sp]
B L1
L0:
LDR r0, [sp, #4]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, [sp]
PUSH {r0}
LDR r0, =9
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L2
LDR r0, =msg_1
BL p_print_string
B L3
L2:
L3:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L1:
LDR r0, [sp]
PUSH {r0}
LDR r0, =10
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L0
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
ADD sp, sp, #8
MOV r0, #0
POP {pc}
p_print_reference:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_3
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
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
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_5
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_6
BLCS p_throw_runtime_error
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_7
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_8
BL p_throw_runtime_error
p_print_ln:
PUSH {lr}
LDR r0, =msg_9
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
