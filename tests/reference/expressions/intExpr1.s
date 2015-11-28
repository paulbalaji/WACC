.data

msg_0:
.word 7
.ascii "Correct"
msg_1:
.word 5
.ascii "Wrong"
msg_2:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_3:
.word 5
.ascii "%.*s\0"
msg_4:
.word 1
.ascii "\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =10
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, =2
PUSH {r0}
LDR r0, =15
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
LDR r0, =40
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L0
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
B L1
L0:
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
L1:
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_2
BL p_throw_runtime_error
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
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
