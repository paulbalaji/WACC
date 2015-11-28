.data

msg_0:
.word 35
.ascii "The first 20 fibonacci numbers are:"
msg_1:
.word 2
.ascii ", "
msg_2:
.word 3
.ascii "..."
msg_3:
.word 5
.ascii "%.*s\0"
msg_4:
.word 1
.ascii "\0"
msg_5:
.word 3
.ascii "%d\0"
msg_6:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #16
LDR r0, =0
STR r0, [sp, #12]
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =1
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
B L1
L0:
LDR r0, [sp, #8]
BL p_print_int
LDR r0, =msg_1
BL p_print_string
LDR r0, [sp, #8]
STR r0, [sp]
LDR r0, [sp, #4]
STR r0, [sp, #8]
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #12]
L1:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =20
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
ADD sp, sp, #16
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
p_print_ln:
PUSH {lr}
LDR r0, =msg_4
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
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
p_throw_overflow_error:
LDR r0, =msg_6
BL p_throw_runtime_error
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
