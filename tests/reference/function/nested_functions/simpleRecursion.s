.data

msg_0:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_1:
.word 5
.ascii "%.*s\0"

.text

.global main
f_rec:
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
SUB sp, sp, #4
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
BL f_rec
ADD sp, sp, #4
STR r0, [sp]
ADD sp, sp, #4
L1:
LDR r0, =42
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
LDR r0, =8
STR r0, [sp, #-4]!
BL f_rec
ADD sp, sp, #4
STR r0, [sp]
ADD sp, sp, #4
MOV r0, #0
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_0
BL p_throw_runtime_error
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
