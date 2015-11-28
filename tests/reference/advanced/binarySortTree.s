.data

msg_0:
.word 47
.ascii "Please enter the number of integers to insert: "
msg_1:
.word 10
.ascii "There are "
msg_2:
.word 10
.ascii " integers."
msg_3:
.word 36
.ascii "Please enter the number at position "
msg_4:
.word 3
.ascii " : "
msg_5:
.word 29
.ascii "Here are the numbers sorted: "
msg_6:
.word 0
.ascii ""
msg_7:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_8:
.word 3
.ascii "%d\0"
msg_9:
.word 5
.ascii "%.*s\0"
msg_10:
.word 3
.ascii "%d\0"
msg_11:
.word 1
.ascii "\0"
msg_12:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"

.text

.global main
f_createNewNode:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #24]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #8]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg
f_insert:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L0
MOV r0, #0
STR r0, [sp, #-4]!
MOV r0, #0
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_createNewNode
ADD sp, sp, #12
STR r0, [sp, #4]
B L1
L0:
SUB sp, sp, #12
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #8]
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
MOV r0, #0
STR r0, [sp]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L2
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_insert
ADD sp, sp, #8
PUSH {r0}
LDR r0, [sp, #12]
BL p_check_null_pointer
ADD r0, r0, #0
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
B L3
L2:
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_insert
ADD sp, sp, #8
PUSH {r0}
LDR r0, [sp, #12]
BL p_check_null_pointer
ADD r0, r0, #4
PUSH {r0}
LDR r0, [r0]
BL free
MOV r0, #4
BL malloc
POP {r1}
STR r0, [r1]
MOV r1, r0
POP {r0}
STR r0, [r1]
L3:
ADD sp, sp, #12
L1:
LDR r0, [sp, #4]
POP {pc}
.ltorg
f_printTree:
PUSH {lr}
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L4
LDR r0, =0
POP {pc}
B L5
L4:
SUB sp, sp, #12
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #8]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_printTree
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
BL p_print_int
MOV r0, #' '
BL putchar
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_printTree
ADD sp, sp, #4
STR r0, [sp]
LDR r0, =0
ADD sp, sp, #12
POP {pc}
ADD sp, sp, #12
L5:
.ltorg
main:
PUSH {lr}
SUB sp, sp, #12
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =msg_0
BL p_print_string
ADD r0, sp, #8
BL p_read_int
LDR r0, =msg_1
BL p_print_string
LDR r0, [sp, #8]
BL p_print_int
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
LDR r0, =0
STR r0, [sp, #4]
MOV r0, #0
STR r0, [sp]
B L7
L6:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
BL p_print_int
LDR r0, =msg_4
BL p_print_string
ADD r0, sp, #0
BL p_read_int
LDR r0, [sp]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
BL f_insert
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
ADD sp, sp, #4
L7:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L6
LDR r0, =msg_5
BL p_print_string
LDR r0, [sp]
STR r0, [sp, #-4]!
BL f_printTree
ADD sp, sp, #4
STR r0, [sp, #4]
LDR r0, =msg_6
BL p_print_string
BL p_print_ln
ADD sp, sp, #12
MOV r0, #0
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_7
BLEQ p_throw_runtime_error
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
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_9
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_10
ADD r0, r0, #4
BL scanf
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_11
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_12
BL p_throw_runtime_error
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
