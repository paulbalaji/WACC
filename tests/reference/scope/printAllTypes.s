.data

msg_0:
.word 2
.ascii ", "
msg_1:
.word 16
.ascii "this is a string"
msg_2:
.word 5
.ascii "array"
msg_3:
.word 2
.ascii "of"
msg_4:
.word 7
.ascii "strings"
msg_5:
.word 3
.ascii "( ["
msg_6:
.word 5
.ascii "] , ["
msg_7:
.word 3
.ascii "] )"
msg_8:
.word 2
.ascii "[ "
msg_9:
.word 4
.ascii " = ("
msg_10:
.word 3
.ascii "), "
msg_11:
.word 4
.ascii " = ("
msg_12:
.word 3
.ascii ") ]"
msg_13:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_14:
.word 5
.ascii "%.*s\0"
msg_15:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_16:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"
msg_17:
.word 3
.ascii "%d\0"
msg_18:
.word 1
.ascii "\0"
msg_19:
.word 3
.ascii "%p\0"
msg_20:
.word 5
.ascii "true\0"
msg_21:
.word 6
.ascii "false\0"

.text

.global main
main:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =msg_0
STR r0, [sp, #4]
LDR r0, =5
STR r0, [sp]
SUB sp, sp, #1
MOV r0, #'x'
STRB r0, [sp]
SUB sp, sp, #1
MOV r0, #1
STRB r0, [sp]
SUB sp, sp, #4
LDR r0, =msg_1
STR r0, [sp]
SUB sp, sp, #16
MOV r0, #16
BL malloc
MOV r3, r0
LDR r0, =1
STR r0, [r3, #4]
LDR r0, =2
STR r0, [r3, #8]
LDR r0, =3
STR r0, [r3, #12]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #12]
SUB sp, sp, #4
MOV r0, #7
BL malloc
MOV r3, r0
MOV r0, #'x'
STRB r0, [r3, #4]
MOV r0, #'y'
STRB r0, [r3, #5]
MOV r0, #'z'
STRB r0, [r3, #6]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
SUB sp, sp, #4
MOV r0, #7
BL malloc
MOV r3, r0
MOV r0, #1
STRB r0, [r3, #4]
MOV r0, #0
STRB r0, [r3, #5]
MOV r0, #1
STRB r0, [r3, #6]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
SUB sp, sp, #16
MOV r0, #16
BL malloc
MOV r3, r0
LDR r0, =msg_2
STR r0, [r3, #4]
LDR r0, =msg_3
STR r0, [r3, #8]
LDR r0, =msg_4
STR r0, [r3, #12]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #12]
SUB sp, sp, #12
LDR r0, =1
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, =2
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
STR r0, [sp, #8]
SUB sp, sp, #24
MOV r0, #'a'
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #1
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #20]
MOV r0, #'b'
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #0
PUSH {r0}
MOV r0, #1
BL malloc
POP {r1}
STRB r1, [r0]
PUSH {r0}
MOV r0, #8
BL malloc
POP {r1, r2}
STR r2, [r0]
STR r1, [r0, #4]
STR r0, [sp, #16]
MOV r0, #12
BL malloc
MOV r3, r0
LDR r0, [sp, #20]
STR r0, [r3, #4]
LDR r0, [sp, #16]
STR r0, [r3, #8]
MOV r0, #2
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #12]
SUB sp, sp, #20
MOV r0, #16
BL malloc
MOV r3, r0
LDR r0, =1
STR r0, [r3, #4]
LDR r0, =2
STR r0, [r3, #8]
LDR r0, =3
STR r0, [r3, #12]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #16]
MOV r0, #7
BL malloc
MOV r3, r0
MOV r0, #'a'
STRB r0, [r3, #4]
MOV r0, #'b'
STRB r0, [r3, #5]
MOV r0, #'c'
STRB r0, [r3, #6]
MOV r0, #3
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #12]
LDR r0, [sp, #16]
PUSH {r0}
MOV r0, #4
BL malloc
POP {r1}
STR r1, [r0]
PUSH {r0}
LDR r0, [sp, #16]
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
STR r0, [sp, #8]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, =msg_5
BL p_print_string
LDR r0, [sp, #4]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, [sp, #106]
BL p_print_string
LDR r0, [sp, #4]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, [sp, #106]
BL p_print_string
LDR r0, [sp, #4]
PUSH {r4}
MOV r4, r0
LDR r0, =2
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, =msg_6
BL p_print_string
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL putchar
LDR r0, [sp, #106]
BL p_print_string
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL putchar
LDR r0, [sp, #106]
BL p_print_string
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =2
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL putchar
LDR r0, =msg_7
BL p_print_string
BL p_print_ln
ADD sp, sp, #20
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #8]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #7]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp, #6]
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #2]
LDR r0, [sp, #2]
BL p_check_null_pointer
LDR r0, [r0]
LDRSB r0, [r0]
STRB r0, [sp, #1]
LDR r0, [sp, #2]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDRSB r0, [r0]
STRB r0, [sp]
LDR r0, =msg_8
BL p_print_string
LDR r0, [sp, #8]
BL p_print_reference
LDR r0, =msg_9
BL p_print_string
LDRSB r0, [sp, #7]
BL putchar
LDR r0, [sp, #86]
BL p_print_string
LDRSB r0, [sp, #6]
BL p_print_bool
LDR r0, =msg_10
BL p_print_string
LDR r0, [sp, #2]
BL p_print_reference
LDR r0, =msg_11
BL p_print_string
LDRSB r0, [sp, #1]
BL putchar
LDR r0, [sp, #86]
BL p_print_string
LDRSB r0, [sp]
BL p_print_bool
LDR r0, =msg_12
BL p_print_string
BL p_print_ln
ADD sp, sp, #24
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #8]
BL p_check_null_pointer
LDR r0, [r0, #4]
LDR r0, [r0]
STR r0, [sp]
LDR r0, [sp, #4]
BL p_print_int
LDR r0, [sp, #62]
BL p_print_string
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #12
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #8]
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =2
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
LDR r0, [sp, #8]
BL p_print_string
LDR r0, [sp, #50]
BL p_print_string
LDR r0, [sp, #4]
BL p_print_string
LDR r0, [sp, #50]
BL p_print_string
LDR r0, [sp]
BL p_print_string
BL p_print_ln
ADD sp, sp, #16
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_bool
LDR r0, [sp, #34]
BL p_print_string
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_bool
LDR r0, [sp, #34]
BL p_print_string
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =2
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_bool
BL p_print_ln
ADD sp, sp, #4
LDR r0, [sp]
BL p_print_string
BL p_print_ln
ADD sp, sp, #4
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #8]
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =1
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, =2
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
LDR r0, [sp, #8]
BL p_print_int
LDR r0, [sp, #26]
BL p_print_string
LDR r0, [sp, #4]
BL p_print_int
LDR r0, [sp, #26]
BL p_print_string
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #16
LDR r0, [sp]
BL p_print_string
BL p_print_ln
ADD sp, sp, #4
LDRSB r0, [sp]
BL p_print_bool
BL p_print_ln
ADD sp, sp, #1
LDRSB r0, [sp]
BL putchar
BL p_print_ln
ADD sp, sp, #1
LDR r0, [sp]
BL p_print_int
BL p_print_ln
ADD sp, sp, #8
MOV r0, #0
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_13
BLEQ p_throw_runtime_error
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_14
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_15
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_16
BLCS p_throw_runtime_error
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_17
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_18
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_print_reference:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_19
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_bool:
PUSH {lr}
CMP r0, #0
LDRNE r0, =msg_20
LDREQ r0, =msg_21
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_throw_runtime_error:
BL p_print_string
MOV r0, #-1
BL exit
