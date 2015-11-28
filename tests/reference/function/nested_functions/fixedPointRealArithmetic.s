.data

msg_0:
.word 24
.ascii "Using fixed-point real: "
msg_1:
.word 3
.ascii " / "
msg_2:
.word 3
.ascii " * "
msg_3:
.word 3
.ascii " = "
msg_4:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_5:
.word 45
.ascii "DivideByZeroError: divide or modulo by zero\n\0"
msg_6:
.word 5
.ascii "%.*s\0"
msg_7:
.word 3
.ascii "%d\0"
msg_8:
.word 1
.ascii "\0"

.text

.global main
f_q:
PUSH {lr}
LDR r0, =14
POP {pc}
.ltorg
f_power:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =1
STR r0, [sp]
B L1
L0:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #12]
L1:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #1
BEQ L0
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg
f_f:
PUSH {lr}
SUB sp, sp, #8
BL f_q
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, =2
STR r0, [sp, #-4]!
BL f_power
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg
f_intToFixedPoint:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
ADD sp, sp, #4
POP {pc}
.ltorg
f_fixedPointToIntRoundDown:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
ADD sp, sp, #4
POP {pc}
.ltorg
f_fixedPointToIntRoundNear:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGE r0, #1
MOVLT r0, #0
CMP r0, #0
BEQ L2
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
ADD sp, sp, #4
POP {pc}
B L3
L2:
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
ADD sp, sp, #4
POP {pc}
L3:
.ltorg
f_add:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
POP {pc}
.ltorg
f_subtract:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
POP {pc}
.ltorg
f_addByInt:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
ADD sp, sp, #4
POP {pc}
.ltorg
f_subtractByInt:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD sp, sp, #4
POP {pc}
.ltorg
f_multiply:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
ADD sp, sp, #4
POP {pc}
.ltorg
f_multiplyByInt:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
POP {pc}
.ltorg
f_divide:
PUSH {lr}
SUB sp, sp, #4
BL f_f
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
ADD sp, sp, #4
POP {pc}
.ltorg
f_divideByInt:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idiv
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #16
LDR r0, =10
STR r0, [sp, #12]
LDR r0, =3
STR r0, [sp, #8]
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp, #12]
BL p_print_int
LDR r0, =msg_1
BL p_print_string
LDR r0, [sp, #8]
BL p_print_int
LDR r0, =msg_2
BL p_print_string
LDR r0, [sp, #8]
BL p_print_int
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
BL f_intToFixedPoint
ADD sp, sp, #4
STR r0, [sp, #4]
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
BL f_divideByInt
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
BL f_multiplyByInt
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_fixedPointToIntRoundNear
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #16
MOV r0, #0
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_4
BL p_throw_runtime_error
p_check_divide_by_zero:
PUSH {lr}
CMP r1, #0
LDREQ r0, =msg_5
BLEQ p_throw_runtime_error
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_6
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
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
p_print_ln:
PUSH {lr}
LDR r0, =msg_8
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
