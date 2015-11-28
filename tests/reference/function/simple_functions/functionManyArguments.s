.data

msg_0:
.word 5
.ascii "a is "
msg_1:
.word 5
.ascii "b is "
msg_2:
.word 5
.ascii "c is "
msg_3:
.word 5
.ascii "d is "
msg_4:
.word 5
.ascii "e is "
msg_5:
.word 5
.ascii "f is "
msg_6:
.word 5
.ascii "hello"
msg_7:
.word 10
.ascii "answer is "
msg_8:
.word 5
.ascii "%.*s\0"
msg_9:
.word 3
.ascii "%d\0"
msg_10:
.word 1
.ascii "\0"
msg_11:
.word 5
.ascii "true\0"
msg_12:
.word 6
.ascii "false\0"
msg_13:
.word 3
.ascii "%p\0"

.text

.global main
f_doSomething:
PUSH {lr}
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp, #4]
BL p_print_int
BL p_print_ln
LDR r0, =msg_1
BL p_print_string
LDRSB r0, [sp, #8]
BL p_print_bool
BL p_print_ln
LDR r0, =msg_2
BL p_print_string
LDRSB r0, [sp, #9]
BL putchar
BL p_print_ln
LDR r0, =msg_3
BL p_print_string
LDR r0, [sp, #10]
BL p_print_string
BL p_print_ln
LDR r0, =msg_4
BL p_print_string
LDR r0, [sp, #14]
BL p_print_reference
BL p_print_ln
LDR r0, =msg_5
BL p_print_string
LDR r0, [sp, #18]
BL p_print_reference
BL p_print_ln
MOV r0, #'g'
POP {pc}
.ltorg
main:
PUSH {lr}
SUB sp, sp, #9
MOV r0, #6
BL malloc
MOV r3, r0
MOV r0, #0
STRB r0, [r3, #4]
MOV r0, #1
STRB r0, [r3, #5]
MOV r0, #2
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #5]
MOV r0, #12
BL malloc
MOV r3, r0
LDR r0, =1
STR r0, [r3, #4]
LDR r0, =2
STR r0, [r3, #8]
MOV r0, #2
STR r0, [r3]
MOV r0, r3
STR r0, [sp, #1]
LDR r0, [sp, #1]
STR r0, [sp, #-4]!
LDR r0, [sp, #9]
STR r0, [sp, #-4]!
LDR r0, =msg_6
STR r0, [sp, #-4]!
MOV r0, #'u'
STRB r0, [sp, #-1]!
MOV r0, #1
STRB r0, [sp, #-1]!
LDR r0, =42
STR r0, [sp, #-4]!
BL f_doSomething
ADD sp, sp, #18
STRB r0, [sp]
LDR r0, =msg_7
BL p_print_string
LDRSB r0, [sp]
BL putchar
BL p_print_ln
ADD sp, sp, #9
MOV r0, #0
POP {pc}
p_print_string:
PUSH {lr}
LDR r1, [r0]
ADD r2, r0, #4
LDR r0, =msg_8
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_int:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_9
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_ln:
PUSH {lr}
LDR r0, =msg_10
ADD r0, r0, #4
BL puts
MOV r0, #0
BL fflush
POP {pc}
p_print_bool:
PUSH {lr}
CMP r0, #0
LDRNE r0, =msg_11
LDREQ r0, =msg_12
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
p_print_reference:
PUSH {lr}
MOV r1, r0
LDR r0, =msg_13
ADD r0, r0, #4
BL printf
MOV r0, #0
BL fflush
POP {pc}
