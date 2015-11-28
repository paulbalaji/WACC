.data

msg_0:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_1:
.word 5
.ascii "%.*s\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =1
PUSH {r0}
LDR r0, =2
PUSH {r0}
LDR r0, =3
PUSH {r0}
LDR r0, =4
PUSH {r0}
LDR r0, =5
PUSH {r0}
LDR r0, =6
PUSH {r0}
LDR r0, =7
PUSH {r0}
LDR r0, =8
PUSH {r0}
LDR r0, =9
PUSH {r0}
LDR r0, =10
PUSH {r0}
LDR r0, =11
PUSH {r0}
LDR r0, =12
PUSH {r0}
LDR r0, =13
PUSH {r0}
LDR r0, =14
PUSH {r0}
LDR r0, =15
PUSH {r0}
LDR r0, =16
PUSH {r0}
LDR r0, =17
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp]
BL exit
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
