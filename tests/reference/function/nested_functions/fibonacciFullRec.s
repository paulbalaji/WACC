.data

msg_0:
.word 61
.ascii "This program calculates the nth fibonacci number recursively."
msg_1:
.word 42
.ascii "Please enter n (should not be too large): "
msg_2:
.word 15
.ascii "The input n is "
msg_3:
.word 28
.ascii "The nth fibonacci number is "
msg_4:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_5:
.word 5
.ascii "%.*s\0"
msg_6:
.word 1
.ascii "\0"
msg_7:
.word 3
.ascii "%d\0"
msg_8:
.word 3
.ascii "%d\0"

.text

.global main
f_fibonacci:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L0
LDR r0, [sp, #12]
ADD sp, sp, #8
POP {pc}
B L1
L0:
L1:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
BL f_fibonacci
ADD sp, sp, #4
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
BL f_fibonacci
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
ADD sp, sp, #8
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
LDR r0, =msg_1
BL p_print_string
LDR r0, =0
STR r0, [sp, #4]
ADD r0, sp, #4
BL p_read_int
LDR r0, =msg_2
BL p_print_string
LDR r0, [sp, #4]
BL p_print_int
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_fibonacci
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #8
MOV r0, #0
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_4
BL p_throw_runtime_error
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
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
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_7
ADD r0, r0, #4
BL scanf
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_8
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
