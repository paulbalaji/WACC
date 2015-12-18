.data 
msg_0:
.word 1
.ascii "\t"
msg_1:
.word 0
.ascii ""
msg_2:
.word 50
.ascii "NullReferenceError: dereference a null reference\n\0"
msg_3:
.word 82
.ascii "OverflowError: the result is too small/large to store in a 4-byte signed-integer.\n"
msg_4:
.word 44
.ascii "ArrayIndexOutOfBoundsError: negative index\n\0"
msg_5:
.word 45
.ascii "ArrayIndexOutOfBoundsError: index too large\n\0"
.align 12
gx_frame_buffer_info:
.int 1024
.int 767
.int 1024
.int 768
.int 0
.int 16
.int 0
.int 0
.int 0
.int 0
msg_6:
.word 45
.ascii "DivideByZeroError: divide or modulo by zero\n\0"
.text 
.global main
main:
LDR sp, =32768
LDR r5, =1048564
LDR r6, =1048560
STR r5, [r6]
LDR r0, =538968068
MOV r1, #0
STR r1, [r0]
PUSH {lr}
SUB sp, sp, #96
LDR r0, =560000
STR r0, [sp, #92]
LDR r0, =10000
STR r0, [sp, #88]
LDR r0, =4
STR r0, [sp, #84]
LDR r0, =0
STR r0, [sp, #80]
BL f_initialiseColours
STR r0, [sp, #76]
LDR r0, =18
STR r0, [sp, #72]
LDR r0, =10
STR r0, [sp, #68]
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #64]
LDR r0, [sp, #84]
STR r0, [sp, #60]
LDR r0, [sp, #80]
STR r0, [sp, #56]
LDR r0, =0
STR r0, [sp, #52]
MOV r0, #1024
MOV r1, #768
MOV r2, #32
BL gx_get_frame_buffer
LDR r0, [r0, #32]
STR r0, [sp, #48]
BL f_Blocks
STR r0, [sp, #44]
LDR r0, =0
STR r0, [sp, #40]
LDR r0, =0
STR r0, [sp, #36]
LDR r0, [sp, #36]
STR r0, [sp, #32]
LDR r0, [sp, #44]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #44]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #40]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #28]
MOV r0, #16
BL malloc
MOV r1, #16
BL memset
STR r0, [sp, #24]
LDR r0, [sp, #76]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #56]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, =0
STR r0, [sp, #20]
LDR r0, =1
STR r0, [sp, #16]
LDR r0, =0
STR r0, [sp, #12]
LDR r0, =1
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L157
L156:
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
LDR r0, =0
STR r0, [sp, #12]
B L159
L158:
LDR r0, [sp, #88]
STR r0, [sp, #-4]!
LDR r0, [sp, #28]
STR r0, [sp, #-4]!
BL f_pollBtns
ADD sp, sp, #8
LDR r0, [sp, #24]
BL p_check_null_pointer
LDR r0, [r0]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L160
LDR r0, [sp, #56]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #20]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L162
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #60]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #60]
LDR r0, [sp, #76]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #56]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
B L163
L162:
L163:
B L161
L160:
L161:
LDR r0, [sp, #24]
BL p_check_null_pointer
LDR r0, [r0, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L164
LDR r0, [sp, #56]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #20]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L166
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #60]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #60]
LDR r0, [sp, #76]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #56]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
B L167
L166:
L167:
B L165
L164:
L165:
LDR r0, [sp, #24]
BL p_check_null_pointer
LDR r0, [r0, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L168
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #20]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L170
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #56]
LDR r0, [sp, #76]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #56]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
B L171
L170:
L171:
B L169
L168:
L169:
LDR r0, [sp, #24]
BL p_check_null_pointer
LDR r0, [r0, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L172
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #44]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #40]
STR r0, [sp]
LDR r0, [sp, #40]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #40]
LDR r0, [sp, #40]
PUSH {r0}
LDR r0, =4
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L174
LDR r0, =0
STR r0, [sp, #40]
B L175
L174:
LDR r0, [sp, #40]
STR r0, [sp, #40]
L175:
LDR r0, [sp, #48]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #48]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #44]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #32]
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #76]
STR r0, [sp, #-4]!
LDR r0, [sp, #44]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #24]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L176
LDR r0, [sp]
STR r0, [sp, #40]
LDR r0, [sp, #48]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #48]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #44]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #32]
B L177
L176:
L177:
LDR r0, [sp, #80]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #60]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #44]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
ADD sp, sp, #4
B L173
L172:
L173:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #12]
L159:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, [sp, #92]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L158
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #20]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L178
SUB sp, sp, #4
LDR r0, [sp, #80]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #60]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #80]
STR r0, [sp, #-4]!
LDR r0, [sp, #48]
STR r0, [sp, #-4]!
BL f_copyBlockToGrid
ADD sp, sp, #20
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
BL f_detectRows
ADD sp, sp, #4
STR r0, [sp]
LDR r0, [sp]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L180
LDR r0, [sp]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
BL f_shiftDown
ADD sp, sp, #8
B L181
L180:
L181:
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #56]
STR r0, [sp, #-4]!
BL f_drawGrid
ADD sp, sp, #8
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #56]
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, [sp, #84]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L182
LDR r0, =0
STR r0, [sp, #56]
B L183
L182:
LDR r0, [sp, #56]
STR r0, [sp, #56]
L183:
LDR r0, [sp, #44]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #44]
LDR r0, [sp, #44]
PUSH {r0}
LDR r0, [sp, #52]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L184
LDR r0, =0
STR r0, [sp, #44]
B L185
L184:
LDR r0, [sp, #44]
STR r0, [sp, #44]
L185:
LDR r0, [sp, #40]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #40]
LDR r0, [sp, #40]
PUSH {r0}
LDR r0, =4
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L186
LDR r0, =0
STR r0, [sp, #40]
B L187
L186:
LDR r0, [sp, #40]
STR r0, [sp, #40]
L187:
LDR r0, [sp, #48]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #48]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #44]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #32]
LDR r0, [sp, #88]
STR r0, [sp, #64]
LDR r0, [sp, #84]
STR r0, [sp, #60]
LDR r0, [sp, #80]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #60]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
LDR r0, [sp, #72]
STR r0, [sp, #-4]!
LDR r0, [sp, #44]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #76]
STR r0, [sp, #-4]!
LDR r0, [sp, #44]
STR r0, [sp, #-4]!
BL f_isColliding
ADD sp, sp, #16
STR r0, [sp, #24]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L188
LDR r0, =0
STR r0, [sp, #20]
B L189
L188:
L189:
ADD sp, sp, #4
B L179
L178:
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
LDR r0, [sp, #56]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #56]
LDR r0, [sp, #76]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #56]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #60]
STR r0, [sp, #-4]!
LDR r0, [sp, #68]
STR r0, [sp, #-4]!
LDR r0, [sp, #40]
STR r0, [sp, #-4]!
LDR r0, [sp, #64]
STR r0, [sp, #-4]!
BL f_drawBlock
ADD sp, sp, #20
L179:
L157:
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #1
BEQ L156
B L191
L190:
L191:
MOV r0, #1
CMP r0, #1
BEQ L190
ADD sp, sp, #96
MOV r0, #0
POP {pc}
f_pollBtns:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #0
POP {r1}
STR r1, [r0]
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #4
POP {r1}
STR r1, [r0]
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #8
POP {r1}
STR r1, [r0]
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #12
POP {r1}
STR r1, [r0]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L1
L0:
LDR r0, =24
LDR r1, =538968116
LDR r7, [r1]
TST r7, #16777216
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L2
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #0
POP {r1}
STR r1, [r0]
B L3
L2:
L3:
LDR r0, =27
LDR r1, =538968116
LDR r7, [r1]
TST r7, #134217728
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L6
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L6:
CMP r0, #0
BEQ L4
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #4
POP {r1}
STR r1, [r0]
B L5
L4:
L5:
LDR r0, =22
LDR r1, =538968116
LDR r7, [r1]
TST r7, #4194304
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L9
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L10
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #4]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L10:
L9:
CMP r0, #0
BEQ L7
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #8
POP {r1}
STR r1, [r0]
B L8
L7:
L8:
LDR r0, =23
LDR r1, =538968116
LDR r7, [r1]
TST r7, #8388608
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L13
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L14
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #4]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L15
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #8]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
L15:
L14:
L13:
CMP r0, #0
BEQ L11
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
ADD r0, r0, #12
POP {r1}
STR r1, [r0]
B L12
L11:
L12:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L1:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L0
LDR r0, =0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_pollLeftBtn:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L17
L16:
SUB sp, sp, #4
LDR r0, =24
LDR r1, =538968116
LDR r7, [r1]
TST r7, #16777216
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L18
LDR r0, =1
ADD sp, sp, #8
POP {pc}
B L19
L18:
L19:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L17:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L16
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_pollRightBtn:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L21
L20:
SUB sp, sp, #4
LDR r0, =27
LDR r1, =538968116
LDR r7, [r1]
TST r7, #134217728
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L22
LDR r0, =1
ADD sp, sp, #8
POP {pc}
B L23
L22:
L23:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L21:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L20
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_pollUpBtn:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L25
L24:
SUB sp, sp, #4
LDR r0, =22
LDR r1, =538968116
LDR r7, [r1]
TST r7, #4194304
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L26
LDR r0, =1
ADD sp, sp, #8
POP {pc}
B L27
L26:
L27:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L25:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L24
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_pollDownBtn:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L29
L28:
SUB sp, sp, #4
LDR r0, =23
LDR r1, =538968116
LDR r7, [r1]
TST r7, #8388608
MOVNE r0, #1
MOVEQ r0, #0
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
BEQ L30
LDR r0, =1
ADD sp, sp, #8
POP {pc}
B L31
L30:
L31:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L29:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L28
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_initIntArray2D:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #20]
MOV r4, r0
MOV r1, #4
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L33
L32:
SUB sp, sp, #4
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_initIntArray
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, [sp, #12]
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
L33:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #24]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L32
LDR r0, [sp, #4]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_initIntArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
MOV r4, r0
MOV r1, #4
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L35
L34:
LDR r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, [sp, #8]
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
L35:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L34
LDR r0, [sp, #4]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_containInt:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp]
B L37
L36:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L38
MOV r0, #1
ADD sp, sp, #8
POP {pc}
B L39
L38:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L39:
L37:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L36
MOV r0, #0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_containChar:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp]
B L41
L40:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDRSB r0, [sp, #20]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L42
MOV r0, #1
ADD sp, sp, #8
POP {pc}
B L43
L42:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L43:
L41:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L40
MOV r0, #0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_containBool:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp]
B L45
L44:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDRSB r0, [sp, #20]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L46
MOV r0, #1
ADD sp, sp, #8
POP {pc}
B L47
L46:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L47:
L45:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #1
BEQ L44
MOV r0, #0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_concatIntArray:
PUSH {lr}
SUB sp, sp, #20
LDR r0, [sp, #24]
LDR r0, [r0]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #16]
LDR r0, [sp, #16]
MOV r4, r0
MOV r1, #4
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #12]
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
B L49
L48:
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
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
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L49:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #28]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L48
LDR r0, =0
STR r0, [sp]
B L51
L50:
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
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
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L51:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L50
LDR r0, [sp, #12]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_concatCharArray:
PUSH {lr}
SUB sp, sp, #20
LDR r0, [sp, #24]
LDR r0, [r0]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #16]
LDR r0, [sp, #16]
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #12]
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
B L53
L52:
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L53:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #28]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L52
LDR r0, =0
STR r0, [sp]
B L55
L54:
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L55:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L54
LDR r0, [sp, #12]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_concatBoolArray:
PUSH {lr}
SUB sp, sp, #20
LDR r0, [sp, #24]
LDR r0, [r0]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #16]
LDR r0, [sp, #16]
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #12]
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
B L57
L56:
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L57:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #28]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L56
LDR r0, =0
STR r0, [sp]
B L59
L58:
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
L59:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #32]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L58
LDR r0, [sp, #12]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_initBoolArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #13]
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L61
L60:
LDRSB r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, [sp, #8]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L61:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #17]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L60
LDR r0, [sp, #4]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_initCharArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #13]
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L63
L62:
LDRSB r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, [sp, #8]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L63:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #17]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L62
LDR r0, [sp, #4]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_copyIntArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
MOV r4, r0
MOV r1, #4
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_concatIntArray
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_copyCharArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_concatCharArray
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_copyBoolArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
MOV r4, r0
MOV r1, #1
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp, #4]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_concatBoolArray
ADD sp, sp, #8
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_quickSort:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
LDR r0, [r0]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
BL f_quickSort2
ADD sp, sp, #12
STR r0, [sp]
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_swap:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #20]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, [sp, #20]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp]
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, [sp, #24]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_partition:
PUSH {lr}
SUB sp, sp, #16
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #32]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #12]
LDR r0, [sp, #24]
STR r0, [sp, #8]
LDR r0, [sp, #24]
STR r0, [sp, #4]
B L65
L64:
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
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #0
BEQ L66
SUB sp, sp, #4
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #16]
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
BL f_swap
ADD sp, sp, #12
STR r0, [sp]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #12]
ADD sp, sp, #4
B L67
L66:
L67:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L65:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #32]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLE r0, #1
MOVGT r0, #0
CMP r0, #1
BEQ L64
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #28]
STR r0, [sp, #-4]!
BL f_swap
ADD sp, sp, #12
STR r0, [sp]
LDR r0, [sp, #8]
ADD sp, sp, #16
POP {pc}
.ltorg 
f_quickSort2:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #24]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGE r0, #1
MOVLT r0, #0
CMP r0, #0
BEQ L68
LDR r0, =0
ADD sp, sp, #8
POP {pc}
B L69
L68:
L69:
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_partition
ADD sp, sp, #12
STR r0, [sp, #4]
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_quickSort2
ADD sp, sp, #12
STR r0, [sp]
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_quickSort2
ADD sp, sp, #12
STR r0, [sp]
LDR r0, =0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_printIntArray2D:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L71
L70:
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
BL f_printIntArray
ADD sp, sp, #4
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L71:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L70
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_printIntArray:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
MOV r0, #'['
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
B L73
L72:
MOV r0, #','
BL putchar
MOV r0, #' '
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L73:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L72
MOV r0, #']'
BL putchar
MOV r0, #' '
BL putchar
BL p_print_ln
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_printCharArray:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
MOV r0, #'['
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL putchar
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
B L75
L74:
MOV r0, #','
BL putchar
MOV r0, #' '
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL putchar
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L75:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L74
MOV r0, #']'
BL putchar
MOV r0, #' '
BL putchar
BL p_print_ln
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_printBoolArray:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
MOV r0, #'['
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_bool
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
B L77
L76:
MOV r0, #','
BL putchar
MOV r0, #' '
BL putchar
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0
LDRSB r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_bool
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L77:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L76
MOV r0, #']'
BL putchar
MOV r0, #' '
BL putchar
BL p_print_ln
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_fillIntArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #16]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L79
L78:
LDR r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, [sp, #8]
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
L79:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L78
LDR r0, [sp, #16]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_fillCharArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #13]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L81
L80:
LDRSB r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #21]
LDR r0, [sp, #8]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L81:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L80
LDR r0, [sp, #13]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_fillBoolArray:
PUSH {lr}
SUB sp, sp, #8
LDR r0, [sp, #13]
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L83
L82:
LDRSB r0, [sp, #12]
PUSH {r0, r4}
LDR r4, [sp, #21]
LDR r0, [sp, #8]
ADD r4, r4, #4
ADD r4, r4, r0
MOV r1, r4
POP {r0, r4}
STRB r0, [r1]
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L83:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L82
LDR r0, [sp, #13]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_singletonBlock:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #4]
STR r0, [r3, #4]
LDR r0, [sp, #4]
STR r0, [r3, #8]
LDR r0, [sp, #4]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_squareBlock:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, =2
STR r0, [sp, #-4]!
LDR r0, =1
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #4]
STR r0, [r3, #4]
LDR r0, [sp, #4]
STR r0, [r3, #8]
LDR r0, [sp, #4]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #8
POP {pc}
.ltorg 
f_LBlock:
PUSH {lr}
SUB sp, sp, #20
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #16]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #12]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #8]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #16]
STR r0, [r3, #4]
LDR r0, [sp, #12]
STR r0, [r3, #8]
LDR r0, [sp, #8]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_TBlock:
PUSH {lr}
SUB sp, sp, #20
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #16]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #12]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #8]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #16]
STR r0, [r3, #4]
LDR r0, [sp, #12]
STR r0, [r3, #8]
LDR r0, [sp, #8]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_SBlock:
PUSH {lr}
SUB sp, sp, #20
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #16]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #12]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #8]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =3
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #16]
STR r0, [r3, #4]
LDR r0, [sp, #12]
STR r0, [r3, #8]
LDR r0, [sp, #8]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_IBlock:
PUSH {lr}
SUB sp, sp, #20
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #16]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, =3
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #12]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =3
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #8]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, =3
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =4
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp, #4]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #12]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, =3
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
MOV r0, #20
BL malloc
MOV r3, r0
LDR r0, [sp, #16]
STR r0, [r3, #4]
LDR r0, [sp, #12]
STR r0, [r3, #8]
LDR r0, [sp, #8]
STR r0, [r3, #12]
LDR r0, [sp, #4]
STR r0, [r3, #16]
MOV r0, #4
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #20
POP {pc}
.ltorg 
f_Blocks:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =5
MOV r4, r0
MOV r1, #4
SMULL r0, r1, r0, r1
MOV r1, r0
ADD r0, #4
ADD r1, #4
BL malloc
BL memset
STR r4, [r0]
STR r0, [sp]
BL f_LBlock
PUSH {r0, r4}
LDR r4, [sp, #8]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
BL f_TBlock
PUSH {r0, r4}
LDR r4, [sp, #8]
LDR r0, =1
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
BL f_SBlock
PUSH {r0, r4}
LDR r4, [sp, #8]
LDR r0, =2
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
BL f_IBlock
PUSH {r0, r4}
LDR r4, [sp, #8]
LDR r0, =3
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
BL f_squareBlock
PUSH {r0, r4}
LDR r4, [sp, #8]
LDR r0, =4
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg 
f_drawRect:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #12]
BL p_check_null_pointer
LDR r0, [r0, #4]
STR r0, [sp]
B L85
L84:
SUB sp, sp, #4
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0]
STR r0, [sp]
B L87
L86:
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0, #16]
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1024
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
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
L87:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #20]
BL p_check_null_pointer
LDR r0, [r0]
PUSH {r0}
LDR r0, [sp, #24]
BL p_check_null_pointer
LDR r0, [r0, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L86
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L85:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
BL p_check_null_pointer
LDR r0, [r0, #4]
PUSH {r0}
LDR r0, [sp, #20]
BL p_check_null_pointer
LDR r0, [r0, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L84
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_debug:
PUSH {lr}
SUB sp, sp, #12
MOV r0, #1024
MOV r1, #768
MOV r2, #32
BL gx_get_frame_buffer
LDR r0, [r0, #32]
STR r0, [sp, #8]
MOV r0, #20
BL malloc
MOV r1, #20
BL memset
STR r0, [sp, #4]
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #8]
BL p_check_null_pointer
ADD r0, r0, #0
POP {r1}
STR r1, [r0]
LDR r0, =0
PUSH {r0}
LDR r0, [sp, #8]
BL p_check_null_pointer
ADD r0, r0, #4
POP {r1}
STR r1, [r0]
LDR r0, =500
PUSH {r0}
LDR r0, [sp, #8]
BL p_check_null_pointer
ADD r0, r0, #8
POP {r1}
STR r1, [r0]
LDR r0, =500
PUSH {r0}
LDR r0, [sp, #8]
BL p_check_null_pointer
ADD r0, r0, #12
POP {r1}
STR r1, [r0]
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #8]
BL p_check_null_pointer
ADD r0, r0, #16
POP {r1}
STR r1, [r0]
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
BL f_drawRect
ADD sp, sp, #8
STR r0, [sp]
LDR r0, =0
ADD sp, sp, #12
POP {pc}
.ltorg 
f_redDebug:
PUSH {lr}
LDR r0, =16711680
STR r0, [sp, #-4]!
BL f_debug
ADD sp, sp, #4
LDR r0, =0
POP {pc}
.ltorg 
f_greenDebug:
PUSH {lr}
LDR r0, =65280
STR r0, [sp, #-4]!
BL f_debug
ADD sp, sp, #4
LDR r0, =0
POP {pc}
.ltorg 
f_wait:
PUSH {lr}
B L89
L88:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L89:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGT r0, #1
MOVLE r0, #0
CMP r0, #1
BEQ L88
LDR r0, =0
POP {pc}
.ltorg 
f_initialiseGrid:
PUSH {lr}
SUB sp, sp, #4
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray2D
ADD sp, sp, #12
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #4
POP {pc}
.ltorg 
f_rotate2:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
LDR r0, [r0]
STR r0, [sp]
B L91
L90:
SUB sp, sp, #12
LDR r0, [sp, #16]
STR r0, [sp, #8]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #24]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
LDR r0, [sp, #8]
STR r0, [sp]
B L93
L92:
SUB sp, sp, #8
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
LDR r0, [sp, #32]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #20]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
LDR r0, [sp, #32]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #20]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #40]
LDR r0, [sp, #24]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #32]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #40]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #24]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #32]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #40]
LDR r0, [sp, #20]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp]
PUSH {r0, r4}
LDR r4, [sp, #40]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #20]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
ADD sp, sp, #8
L93:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L92
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #16]
ADD sp, sp, #12
L91:
LDR r0, [sp, #4]
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
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L90
LDR r0, =0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_rotate:
PUSH {lr}
SUB sp, sp, #16
LDR r0, [sp, #20]
LDR r0, [r0]
STR r0, [sp, #12]
LDR r0, =0
STR r0, [sp, #8]
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =2
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L94
LDR r0, =0
ADD sp, sp, #16
POP {pc}
B L95
L94:
L95:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =3
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L96
LDR r0, =1
STR r0, [sp, #8]
LDR r0, =2
STR r0, [sp, #4]
B L97
L96:
L97:
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =4
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L98
LDR r0, =2
STR r0, [sp, #8]
LDR r0, =2
STR r0, [sp, #4]
B L99
L98:
L99:
LDR r0, =0
STR r0, [sp]
B L101
L100:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L103
L102:
SUB sp, sp, #4
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp]
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #36]
LDR r0, [sp, #16]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #12]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #36]
LDR r0, [sp, #12]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #24]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp, #28]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #36]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #24]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, [sp]
PUSH {r0, r4}
LDR r4, [sp, #36]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, =1
PUSH {r0}
LDR r0, [sp, #20]
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #16]
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
L103:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L102
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L101:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L100
LDR r0, =0
ADD sp, sp, #16
POP {pc}
.ltorg 
f_initialiseColours:
PUSH {lr}
SUB sp, sp, #44
LDR r0, =0
STR r0, [sp, #40]
LDR r0, =16032864
STR r0, [sp, #36]
LDR r0, =16711680
STR r0, [sp, #32]
LDR r0, =16753920
STR r0, [sp, #28]
LDR r0, =16776960
STR r0, [sp, #24]
LDR r0, =3329330
STR r0, [sp, #20]
LDR r0, =65280
STR r0, [sp, #16]
LDR r0, =255
STR r0, [sp, #12]
LDR r0, =5577355
STR r0, [sp, #8]
LDR r0, =16738740
STR r0, [sp, #4]
MOV r0, #40
BL malloc
MOV r3, r0
LDR r0, [sp, #36]
STR r0, [r3, #4]
LDR r0, [sp, #32]
STR r0, [r3, #8]
LDR r0, [sp, #28]
STR r0, [r3, #12]
LDR r0, [sp, #24]
STR r0, [r3, #16]
LDR r0, [sp, #20]
STR r0, [r3, #20]
LDR r0, [sp, #16]
STR r0, [r3, #24]
LDR r0, [sp, #12]
STR r0, [r3, #28]
LDR r0, [sp, #8]
STR r0, [r3, #32]
LDR r0, [sp, #4]
STR r0, [r3, #36]
MOV r0, #9
STR r0, [r3]
MOV r0, r3
STR r0, [sp]
LDR r0, [sp]
ADD sp, sp, #44
POP {pc}
.ltorg 
f_showGrid:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L105
L104:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L107
L106:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
BL p_print_int
LDR r0, =msg_0
BL p_print_string
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L107:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L106
LDR r0, =msg_1
BL p_print_string
BL p_print_ln
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L105:
LDR r0, [sp]
PUSH {r0}
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
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L104
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_drawGridSquare:
PUSH {lr}
SUB sp, sp, #12
LDR r0, =312
STR r0, [sp, #8]
LDR r0, =24
STR r0, [sp, #4]
MOV r0, #20
BL malloc
MOV r1, #20
BL memset
STR r0, [sp]
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, =40
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #0
POP {r1}
STR r1, [r0]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, =40
MOV r1, r0
POP {r0}
SMULL r0, r1, r0, r1
CMP r1, r0, ASR #31
BLNE p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #4
POP {r1}
STR r1, [r0]
LDR r0, =40
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #8
POP {r1}
STR r1, [r0]
LDR r0, =40
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #12
POP {r1}
STR r1, [r0]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, [sp, #4]
BL p_check_null_pointer
ADD r0, r0, #16
POP {r1}
STR r1, [r0]
LDR r0, [sp]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_drawRect
ADD sp, sp, #8
LDR r0, =0
ADD sp, sp, #12
POP {pc}
.ltorg 
f_drawGrid:
PUSH {lr}
SUB sp, sp, #12
LDR r0, [sp, #20]
LDR r0, [r0]
STR r0, [sp, #8]
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L109
L108:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L111
L110:
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #8]
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
BL f_drawGridSquare
ADD sp, sp, #16
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L111:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L110
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L109:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L108
LDR r0, =0
ADD sp, sp, #12
POP {pc}
.ltorg 
f_drawBlock:
PUSH {lr}
SUB sp, sp, #12
LDR r0, [sp, #20]
LDR r0, [r0]
STR r0, [sp, #8]
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L113
L112:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L115
L114:
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L116
LDR r0, [sp, #36]
STR r0, [sp, #-4]!
LDR r0, [sp, #36]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #36]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #32]
STR r0, [sp, #-4]!
BL f_drawGridSquare
ADD sp, sp, #16
B L117
L116:
L117:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L115:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L114
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L113:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L112
LDR r0, =0
ADD sp, sp, #12
POP {pc}
.ltorg 
f_copyBlockToGrid:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L119
L118:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L121
L120:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L122
LDR r0, [sp, #28]
PUSH {r0, r4}
LDR r4, [sp, #24]
LDR r0, [sp, #32]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L123
L122:
L123:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L121:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L120
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L119:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L118
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_isColliding:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L125
L124:
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L127
L126:
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L130
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L131
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #20]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGE r0, #1
MOVLT r0, #0
CMP r0, #1
BEQ L132
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L133
LDR r0, [sp, #20]
PUSH {r0}
LDR r0, [sp, #4]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGE r0, #1
MOVLT r0, #0
CMP r0, #1
BEQ L134
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #28]
PUSH {r0}
LDR r0, [sp, #12]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #24]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
L134:
L133:
L132:
L131:
L130:
CMP r0, #0
BEQ L128
LDR r0, =1
ADD sp, sp, #8
POP {pc}
B L129
L128:
L129:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L127:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L126
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
ADD sp, sp, #4
L125:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L124
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_shiftDown:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, [sp, #12]
LDR r0, [r0]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
B L136
L135:
LDR r0, [sp, #16]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L137
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_fillIntArray
ADD sp, sp, #8
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
B L138
L137:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #8]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #16]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L139
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #4]
STR r0, [sp, #-4]!
LDR r0, [sp, #20]
STR r0, [sp, #-4]!
BL f_shiftRowDown
ADD sp, sp, #12
B L140
L139:
L140:
L138:
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp]
L136:
LDR r0, [sp]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVGE r0, #1
MOVLT r0, #0
CMP r0, #1
BEQ L135
LDR r0, =0
ADD sp, sp, #8
POP {pc}
.ltorg 
f_shiftRowDown:
PUSH {lr}
LDR r0, [sp, #12]
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L141
LDR r0, =0
POP {pc}
B L142
L141:
L142:
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
PUSH {r0}
LDR r0, [sp, #8]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L143
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, [sp, #16]
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
LDR r0, [sp, #12]
STR r0, [sp, #-4]!
BL f_copyRow
ADD sp, sp, #12
LDR r0, [sp, #4]
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
LDR r0, =0
STR r0, [sp, #-4]!
BL f_fillIntArray
ADD sp, sp, #8
B L144
L143:
L144:
LDR r0, =0
POP {pc}
.ltorg 
f_copyRow:
PUSH {lr}
SUB sp, sp, #4
LDR r0, =0
STR r0, [sp]
B L146
L145:
LDR r0, [sp, #8]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #16]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #4]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0, r4}
LDR r4, [sp, #16]
LDR r0, [sp, #24]
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #8]
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
L146:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #12]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #24]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L145
LDR r0, =0
ADD sp, sp, #4
POP {pc}
.ltorg 
f_detectRows:
PUSH {lr}
SUB sp, sp, #8
LDR r0, =19
STR r0, [sp, #-4]!
LDR r0, =0
STR r0, [sp, #-4]!
BL f_initIntArray
ADD sp, sp, #8
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L148
L147:
SUB sp, sp, #8
LDR r0, =0
STR r0, [sp, #4]
LDR r0, =0
STR r0, [sp]
B L150
L149:
LDR r0, [sp, #20]
PUSH {r4}
MOV r4, r0
LDR r0, [sp, #12]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
LDR r0, [sp, #8]
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
PUSH {r0}
LDR r0, =0
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
CMP r0, #0
BEQ L151
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
SUBS r0, r0, r1
BLVS p_throw_overflow_error
MOV r1, r0
POP {r0}
CMP r0, r1
MOVEQ r0, #1
MOVNE r0, #0
CMP r0, #0
BEQ L153
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, [sp, #16]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
LDR r0, =1
STR r0, [sp]
LDR r0, =1
PUSH {r0, r4}
LDR r4, [sp, #20]
LDR r0, =0
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
MOV r1, r4
POP {r0, r4}
STR r0, [r1]
B L154
L153:
L154:
B L152
L151:
LDR r0, =1
STR r0, [sp]
L152:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #4]
L150:
LDR r0, [sp, #4]
PUSH {r0}
LDR r0, [sp, #24]
PUSH {r4}
MOV r4, r0
LDR r0, =0
BL p_check_array_bounds
ADD r4, r4, #4
ADD r4, r4, r0, LSL #2
LDR r4, [r4]
MOV r0, r4
POP {r4}
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #0
BEQ L155
LDR r0, [sp]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
CMP r0, r1
MOVNE r0, #1
MOVEQ r0, #0
L155:
CMP r0, #1
BEQ L149
LDR r0, [sp, #8]
PUSH {r0}
LDR r0, =1
MOV r1, r0
POP {r0}
ADDS r0, r0, r1
BLVS p_throw_overflow_error
STR r0, [sp, #8]
ADD sp, sp, #8
L148:
LDR r0, [sp]
PUSH {r0}
LDR r0, [sp, #16]
LDR r0, [r0]
MOV r1, r0
POP {r0}
CMP r0, r1
MOVLT r0, #1
MOVGE r0, #0
CMP r0, #1
BEQ L147
LDR r0, [sp, #4]
ADD sp, sp, #8
POP {pc}
.ltorg 
putchar:
PUSH {lr}
POP {pc}
p_print_int:
PUSH {lr}
POP {pc}
p_print_ln:
PUSH {lr}
POP {pc}
p_print_bool:
PUSH {lr}
POP {pc}
__aeabi_idiv:
PUSH {lr}
POP {pc}
p_print_string:
PUSH {lr}
POP {pc}
p_check_null_pointer:
PUSH {lr}
CMP r0, #0
LDREQ r0, =msg_2
BLEQ p_throw_runtime_error
POP {pc}
p_throw_runtime_error:
PUSH {lr}
POP {pc}
p_throw_overflow_error:
LDR r0, =msg_3
BL p_throw_runtime_error
memset:
PUSH {lr}
MOV r2, #0
memset_continue:
MOV r3, #0
STRB r3, [r0, r2]
ADD r2, r2, #1
CMP r2, r1
BLE memset_continue
POP {pc}
malloc:
PUSH {lr}
PUSH {r1}
PUSH {r2}
PUSH {r3}
LDR r2, =1048560
LDR r1, [r2]
ADD r3, r1, r0
MOV r0, r1
STR r3, [r2]
POP {r3}
POP {r2}
POP {r1}
POP {pc}
p_check_array_bounds:
PUSH {lr}
CMP r0, #0
LDRLT r0, =msg_4
BLLT p_throw_runtime_error
LDR r1, [r4]
CMP r0, r1
LDRCS r0, =msg_5
BLCS p_throw_runtime_error
POP {pc}
gx_get_frame_buffer:
CMP r0, #4096
CMP r1, #4096
CMP r2, #32
MOVHI r0, #0
MOVHI pc, lr
PUSH {r4, lr}
LDR r4, =gx_frame_buffer_info
STR r0, [r4]
STR r1, [r4, #4]
STR r0, [r4, #8]
STR r1, [r4, #12]
STR r2, [r4, #20]
MOV r0, r4
ADD r0, #1073741824
MOV r1, #1
BL gx_mailbox_write
MOV r0, #1
BL gx_mailbox_read
TEQ r0, #0
MOVNE r0, #0
POPNE {r4, pc}
MOV r0, r4
POP {r4, pc}
p_check_divide_by_zero:
PUSH {lr}
CMP r1, #0
LDREQ r0, =msg_6
BLEQ p_throw_runtime_error
POP {pc}
gx_mailbox_base:
LDR r0, =536918144
MOV pc, lr
gx_mailbox_write:
TST r0, #15
MOVNE pc, lr
CMP r1, #15
MOVHI pc, lr
MOV r2, r0
PUSH {lr}
BL gx_mailbox_base
gx_wait1:
LDR r3, [r0, #24]
TST r3, #2147483648
BNE gx_wait1
ADD r2, r1
STR r2, [r0, #32]
POP {pc}
gx_mailbox_read:
CMP r0, #15
MOVHI pc, lr
MOV r1, r0
PUSH {lr}
BL gx_mailbox_base
gx_right_mail:
gx_wait2:
LDR r2, [r0, #24]
TST r2, #1073741824
BNE gx_wait2
LDR r2, [r0]
AND r3, r2, #15
TEQ r3, r1
BNE gx_right_mail
AND r0, r2, #4294967280
POP {pc}
