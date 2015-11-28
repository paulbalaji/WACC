.data

msg_0:
.word 0
.ascii ""
msg_1:
.word 43
.ascii "==========================================="
msg_2:
.word 43
.ascii "========== Hash Table Program ============="
msg_3:
.word 43
.ascii "==========================================="
msg_4:
.word 43
.ascii "=                     ="
msg_5:
.word 43
.ascii "= Please choose the following options:  ="
msg_6:
.word 43
.ascii "=                     ="
msg_7:
.word 43
.ascii "= a: insert an integer          ="
msg_8:
.word 43
.ascii "= b: find an integer           ="
msg_9:
.word 43
.ascii "= c: count the integers          ="
msg_10:
.word 43
.ascii "= d: print all integers          ="
msg_11:
.word 43
.ascii "= e: remove an integer          ="
msg_12:
.word 43
.ascii "= f: remove all integers         ="
msg_13:
.word 43
.ascii "= g: exit                 ="
msg_14:
.word 43
.ascii "=                     ="
msg_15:
.word 43
.ascii "==========================================="
msg_16:
.word 15
.ascii "Your decision: "
msg_17:
.word 18
.ascii "You have entered: "
msg_18:
.word 36
.ascii " which is invalid, please try again."
msg_19:
.word 18
.ascii "You have entered: "
msg_20:
.word 35
.ascii "Please enter an integer to insert: "
msg_21:
.word 43
.ascii "Successfully insert it. The integer is new."
msg_22:
.word 51
.ascii "The integer is already there. No insertion is made."
msg_23:
.word 33
.ascii "Please enter an integer to find: "
msg_24:
.word 17
.ascii "Find the integer."
msg_25:
.word 25
.ascii "The integer is not found."
msg_26:
.word 24
.ascii "There is only 1 integer."
msg_27:
.word 10
.ascii "There are "
msg_28:
.word 10
.ascii " integers."
msg_29:
.word 23
.ascii "Here are the integers: "
msg_30:
.word 35
.ascii "Please enter an integer to remove: "
msg_31:
.word 29
.ascii "The integer has been removed."
msg_32:
.word 25
.ascii "The integer is not found."
msg_33:
.word 31
.ascii "All integers have been removed."
msg_34:
.word 13
.ascii "Goodbye Human"
msg_35:
.word 23
.ascii "Error: unknown choice ("
msg_36:
.word 1
.ascii ")"
msg_37:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_38:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"
msg_39:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_40:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_41:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_42:
.word 5
.ascii "%.*s\0"
msg_43:
.word 1
.ascii "\0"
msg_44:
.word 45
.ascii "DivideByZeroError: divide or modulo by zero\n\0"
msg_45:
.word 3
.ascii "%d\0"
msg_46:
.word 4
.ascii " %c\0"
msg_47:
.word 3
.ascii "%d\0"

.text

.global main
f_init:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L1
L0:
MOV r0, #0
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
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
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L0
MOV r0, #1
ADD sp, sp, #8
POP {pc}
.ltorg
f_contain:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_calculateIndex
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_findNode
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
ADD sp, sp, #8
POP {pc}
.ltorg
f_insertIfNotContain:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_calculateIndex
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_findNode
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L2
MOV r0, #0
ADD sp, sp, #8
POP {pc}
B L3
L2:
SUB sp, sp, #4
LDR r0, [sp, #20]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
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
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #1
ADD sp, sp, #12
POP {pc}
ADD sp, sp, #4
L3:
.ltorg
f_remove:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_calculateIndex
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_findNode
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L4
MOV r0, #0
ADD sp, sp, #8
POP {pc}
B L5
L4:
LDR r0, [sp]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_removeNode
ADD sp, sp, #8
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #1
ADD sp, sp, #8
POP {pc}
L5:
.ltorg
f_removeAll:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L7
L6:
SUB sp, sp, #4
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
B L9
L8:
SUB sp, sp, #4
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #4]
BL p_free_pair
LDR r0, [sp]
STR r0, [sp, #4]
ADD sp, sp, #4
L9:
LDR r0, [sp]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L8
MOV r0, #0
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L7:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L6
MOV r0, #1
ADD sp, sp, #8
POP {pc}
.ltorg
f_count:
PUSH {lr}
SUB sp, sp, #12
LDR r0, [sp, #16]
LDR r0, [r0]
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L11
L10:
SUB sp, sp, #4
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_countNodes
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L11:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L10
LDR r0, [sp, #4]
ADD sp, sp, #12
POP {pc}
.ltorg
f_printAll:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L13
L12:
SUB sp, sp, #1
LDR r0, [sp, #13]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #5]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_printAllNodes
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, [sp, #1]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #1]
ADD sp, sp, #1
L13:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L12
LDR r0, =msg_0
BL p_print_string
BL p_print_ln
MOV r0, #1
ADD sp, sp, #8
POP {pc}
.ltorg
f_calculateIndex:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
BL p_check_divide_by_zero
BL __aeabi_idivmod
MOV r0, r1
ADD sp, sp, #4
POP {pc}
.ltorg
f_findNode:
PUSH {lr}
B L15
L14:
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L16
LDR r0, [sp, #8]
ADD sp, sp, #4
POP {pc}
B L17
L16:
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #8]
L17:
ADD sp, sp, #4
L15:
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L14
MOV r0, #0
POP {pc}
.ltorg
f_removeNode:
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
BEQ L18
MOV r0, #0
POP {pc}
B L19
L18:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L20
LDR r0, [sp, #4]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #8]
BL p_free_pair
LDR r0, [sp, #4]
POP {pc}
B L21
L20:
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_removeNode
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
LDR r0, [sp, #8]
ADD sp, sp, #4
POP {pc}
ADD sp, sp, #4
L21:
L19:
.ltorg
f_countNodes:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L23
L22:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp, #8]
L23:
LDR r0, [sp, #8]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L22
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg
f_printAllNodes:
PUSH {lr}
B L25
L24:
SUB sp, sp, #4
LDR r0, [sp, #8]
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
STR r0, [sp, #8]
ADD sp, sp, #4
L25:
LDR r0, [sp, #4]
PUSH {r0}
MOV r0, #0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L24
MOV r0, #1
POP {pc}
.ltorg
f_printMenu:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
LDR r0, =msg_2
BL p_print_string
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
BL p_print_ln
LDR r0, =msg_4
BL p_print_string
BL p_print_ln
LDR r0, =msg_5
BL p_print_string
BL p_print_ln
LDR r0, =msg_6
BL p_print_string
BL p_print_ln
LDR r0, =msg_7
BL p_print_string
BL p_print_ln
LDR r0, =msg_8
BL p_print_string
BL p_print_ln
LDR r0, =msg_9
BL p_print_string
BL p_print_ln
LDR r0, =msg_10
BL p_print_string
BL p_print_ln
LDR r0, =msg_11
BL p_print_string
BL p_print_ln
LDR r0, =msg_12
BL p_print_string
BL p_print_ln
LDR r0, =msg_13
BL p_print_string
BL p_print_ln
LDR r0, =msg_14
BL p_print_string
BL p_print_ln
LDR r0, =msg_15
BL p_print_string
BL p_print_ln
MOV r0, #'a'
STR r0, [sp, #4]
MOV r0, #'g'
STR r0, [sp]
B L27
L26:
SUB sp, sp, #5
LDR r0, =msg_16
BL p_print_string
MOV r0, #0
STRB r0, [sp, #4]
ADD r0, sp, #4
BL p_read_char
LDRSB r0, [sp, #4]
STR r0, [sp]
LDR r0, [sp, #9]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L30
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #9]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
L30:
CMP r0, #0
BEQ L28
LDRSB r0, [sp, #4]
ADD sp, sp, #13
POP {pc}
B L29
L28:
LDR r0, =msg_17
BL p_print_string
LDRSB r0, [sp, #4]
BL putchar
LDR r0, =msg_18
BL p_print_string
BL p_print_ln
L29:
ADD sp, sp, #5
L27:
MOV r0, #1
CMP r0, #1
BEQ L26
MOV r0, #0
ADD sp, sp, #8
POP {pc}
.ltorg
f_askForInt:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
BL p_print_string
LDR r0, =0
STR r0, [sp]
ADD r0, sp, #0
BL p_read_int
LDR r0, =msg_19
BL p_print_string
LDR r0, [sp]
BL p_print_int
BL p_print_ln
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg
f_handleMenuInsert:
PUSH {lr}
SUB sp, sp, #5
LDR r0, =msg_20
STR r0, [sp, #-4]!
BL f_askForInt
ADD sp, sp, #4
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_insertIfNotContain
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L31
LDR r0, =msg_21
BL p_print_string
BL p_print_ln
B L32
L31:
LDR r0, =msg_22
BL p_print_string
BL p_print_ln
L32:
MOV r0, #1
ADD sp, sp, #5
POP {pc}
.ltorg
f_handleMenuFind:
PUSH {lr}
SUB sp, sp, #5
LDR r0, =msg_23
STR r0, [sp, #-4]!
BL f_askForInt
ADD sp, sp, #4
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_contain
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L33
LDR r0, =msg_24
BL p_print_string
BL p_print_ln
B L34
L33:
LDR r0, =msg_25
BL p_print_string
BL p_print_ln
L34:
MOV r0, #1
ADD sp, sp, #5
POP {pc}
.ltorg
f_handleMenuCount:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
BL f_count
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L35
LDR r0, =msg_26
BL p_print_string
BL p_print_ln
B L36
L35:
LDR r0, =msg_27
BL p_print_string
LDR r0, [sp]
BL p_print_int
LDR r0, =msg_28
BL p_print_string
BL p_print_ln
L36:
MOV r0, #1
ADD sp, sp, #4
POP {pc}
.ltorg
f_handleMenuPrint:
PUSH {lr}
SUB sp, sp, #1
LDR r0, =msg_29
BL p_print_string
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_printAll
ADD sp, sp, #4
STRB r0, [sp]
MOV r0, #1
ADD sp, sp, #1
POP {pc}
.ltorg
f_handleMenuRemove:
PUSH {lr}
SUB sp, sp, #5
LDR r0, =msg_30
STR r0, [sp, #-4]!
BL f_askForInt
ADD sp, sp, #4
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #13]
STR r0, [sp, #-4]!
BL f_remove
ADD sp, sp, #8
STRB r0, [sp]
LDRSB r0, [sp]
CMP r0, #0
BEQ L37
LDR r0, =msg_31
BL p_print_string
BL p_print_ln
B L38
L37:
LDR r0, =msg_32
BL p_print_string
BL p_print_ln
L38:
MOV r0, #1
ADD sp, sp, #5
POP {pc}
.ltorg
f_handleMenuRemoveAll:
PUSH {lr}
SUB sp, sp, #1
LDR r0, [sp, #5]
STR r0, [sp, #-4]!
BL f_removeAll
ADD sp, sp, #4
STRB r0, [sp]
LDR r0, =msg_33
BL p_print_string
BL p_print_ln
MOV r0, #1
ADD sp, sp, #1
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #6
MOV r0, #56
BL malloc
MOV r3, r0
MOV r0, #0
STR r0, [r3, #4]
MOV r0, #0
STR r0, [r3, #8]
MOV r0, #0
STR r0, [r3, #12]
MOV r0, #0
STR r0, [r3, #16]
MOV r0, #0
STR r0, [r3, #20]
MOV r0, #0
STR r0, [r3, #24]
MOV r0, #0
STR r0, [r3, #28]
MOV r0, #0
STR r0, [r3, #32]
MOV r0, #0
STR r0, [r3, #36]
MOV r0, #0
STR r0, [r3, #40]
MOV r0, #0
STR r0, [r3, #44]
MOV r0, #0
STR r0, [r3, #48]
MOV r0, #0
STR r0, [r3, #52]
MOV r0, #13
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #2]
LDR r0, [sp, #2]
STR r0, [sp, #-4]!
BL f_init
ADD sp, sp, #4
STRB r0, [sp, #1]
MOV r0, #1
STRB r0, [sp]
B L40
L39:
SUB sp, sp, #1
BL f_printMenu
STRB r0, [sp]
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'a'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L41
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuInsert
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L42
L41:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'b'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L43
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuFind
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L44
L43:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'c'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L45
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuCount
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L46
L45:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'d'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L47
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuPrint
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L48
L47:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'e'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L49
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuRemove
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L50
L49:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'f'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L51
SUB sp, sp, #1
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
BL f_handleMenuRemoveAll
ADD sp, sp, #4
STRB r0, [sp]
ADD sp, sp, #1
B L52
L51:
LDRSB r0, [sp]
PUSH {r0}
MOV r0, #'g'
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L53
LDR r0, =msg_34
BL p_print_string
BL p_print_ln
MOV r0, #0
STRB r0, [sp, #1]
B L54
L53:
LDR r0, =msg_35
BL p_print_string
LDRSB r0, [sp]
BL putchar
LDR r0, =msg_36
BL p_print_string
BL p_print_ln
LDR r0, =-1
BL exit
L54:
L52:
L50:
L48:
L46:
L44:
L42:
ADD sp, sp, #1
L40:
LDRSB r0, [sp]
CMP r0, #1
BEQ L39
ADD sp, sp, #6
MOV r0, #0
POP {pc}
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_37
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_38
BLCS p_throw_runtime_error
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_39
BL p_throw_runtime_error
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_40
BLEQ p_throw_runtime_error
POP {pc}
p_free_pair:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_41
BEQ p_throw_runtime_error
PUSH {r0}
LDR r0, [r0]
BL free
LDR r0, [sp]
LDR r0, [r0, #4]
BL free
POP {r0}
BL free
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_42
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_43
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_check_divide_by_zero:
PUSH {lr}
CMP r1, #0
LDREQ r0, =msg_44
BLEQ p_throw_runtime_error
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_45
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_read_char:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_46
ADD r0, r0, #4
BL scanf
POP {pc}
p_read_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_47
ADD r0, r0, #4
BL scanf
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
