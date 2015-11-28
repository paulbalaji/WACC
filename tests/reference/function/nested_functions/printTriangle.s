.data

msg_0:
.word 1
.ascii "-"
msg_1:
.word 0
.ascii ""
msg_2:
.word 5
.ascii "%.*s\0"
msg_3:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_4:
.word 1
.ascii "\0"

.text

.global main
f_f:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L0
B L1
L0:
SUB sp, sp, #8
LDR r0, [sp, #12]
STR r0, [sp, #4]
B L3
L2:
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L3:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #1
BEQ L2
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
BL f_f
ADD sp, sp, #4
STR r0, [sp]
ADD sp, sp, #8
L1:
LDR r0, =0
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =8
STR r0, [sp, #-4]!
BL f_f
ADD sp, sp, #4
STR r0, [sp]
ADD sp, sp, #4
MOV r0, #0
POP {pc}
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
p_throw_overflow_error:
LDR r0, =msg_3
BL p_throw_runtime_error
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
