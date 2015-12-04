import Instr = require('./Instruction');
import Reg = require('./Register');
var _ = require('underscore');

export var MailboxBase = function() {
    return [
        Instr.Label('gx_get_mailbox_base'),
        Instr.Ldr(Reg.R0, Instr.Liter(0x2000B880)),
        Instr.Mov(Reg.PC, Reg.LR)
    ];
};

export var MailboxWrite = function() {
    return [
        Instr.Label('gx_mailbox_write'),
        Instr.Tst(Reg.R0, Instr.Const(0b1111)),
        Instr.Movne(Reg.PC, Reg.LR),
        Instr.Cmp(Reg.R1, Instr.Const(15)),
        Instr.Movhi(Reg.PC, Reg.LR),
        Instr.Mov(Reg.R2, Reg.R0),
        Instr.Push(Reg.LR),
        Instr.Bl('gx_get_mailbox_base'),
        Instr.Label('gx_wait1'),
        Instr.Ldr(Reg.R3, Instr.Mem(Reg.R0, Instr.Const(0x18))),
        Instr.Tst(Reg.R3, Instr.Const(0x80000000)),
        Instr.Bne('gx_wait1'),
        Instr.Add(Reg.R2, Reg.R1),
        Instr.Str(Reg.R2, Instr.Mem(Reg.R0, Instr.Const(0x20))),
        Instr.Pop(Reg.PC)
    ];
};

export var GetFrameBuffer = function () {
    return [
        Instr.Label('gx_get_frame_buffer'),
        Instr.Cmp(Reg.R0, Instr.Const(4096)),
        Instr.Bgt('gx_validate_fail'),
        Instr.Cmp(Reg.R1, Instr.Const(4096)),
        Instr.Bgt('gx_validate_fail'),
        Instr.Cmp(Reg.R2, Instr.Const(32)),
        Instr.Bgt('gx_validate_fail'),
        Instr.B('gx_continue'),
        Instr.Label('gx_validate_fail'),
        Instr.Movhi(Reg.R0, Instr.Const(0)),
        Instr.Movhi(Reg.PC, Reg.LR),

        Instr.Label('gx_continue'),
        Instr.Push(Reg.R4, Reg.LR),

        Instr.Push(Reg.R0),
        Instr.Mov(Reg.R0, Instr.Const(24)),
        Instr.Bl('malloc'),
        Instr.Mov(Reg.R4, Reg.R0),
        Instr.Pop(Reg.R0),

        Instr.Str(Reg.R0, Instr.Mem(Reg.R4, Instr.Const(0))),
        Instr.Str(Reg.R1, Instr.Mem(Reg.R4, Instr.Const(4))),
        Instr.Str(Reg.R0, Instr.Mem(Reg.R4, Instr.Const(8))),
        Instr.Str(Reg.R1, Instr.Mem(Reg.R4, Instr.Const(12))),
        Instr.Str(Reg.R2, Instr.Mem(Reg.R4, Instr.Const(20))),

        Instr.Mov(Reg.R0, Reg.R4),
        Instr.Add(Reg.R0, Instr.Const(0x40000000)),
        Instr.Mov(Reg.R1, Instr.Const(1)),
        Instr.Bl('gx_mailbox_write'),

        Instr.Mov(Reg.R0, Instr.Const(1)),
        Instr.Bl('gx_mailbox_read'),

        Instr.Teq(Reg.R0, Reg.R0, Instr.Const(0)),
        Instr.Movne(Reg.R0, Instr.Const(0)),
        Instr.Popne(Reg.R4, Reg.PC),

        Instr.Mov(Reg.R0, Reg.R4),
        Instr.Pop(Reg.R4, Reg.PC)
    ];
};

export var MailboxRead = function() {
    return [
        Instr.Label('gx_mailbox_read'),
        Instr.Cmp(Reg.R0, Instr.Const(15)),
        Instr.Movhi(Reg.PC, Reg.LR),
        Instr.Mov(Reg.R1, Reg.R0),
        Instr.Push(Reg.LR),
        Instr.Bl("gx_get_mailbox_base"),
        Instr.Label("gx_getmail"),
        Instr.Label("gx_wait2"),
        Instr.Ldr(Reg.R2, Instr.Mem(Reg.R0, Instr.Const(0x18))),
        Instr.Tst(Reg.R2, Instr.Mem(0x40000000)),
        Instr.Bne("gx_wait2"),
        Instr.Ldr(Reg.R2, Instr.Mem(Reg.R0)),
        Instr.And(Reg.R3, Reg.R2, Instr.Const(15)),
        Instr.Teq(Reg.R3, Reg.R1),
        Instr.Bne("gx_getmail"),
        Instr.And(Reg.R0, Reg.R2, Instr.Const(0xfffffff0)),
        Instr.Pop(Reg.PC)
    ];
};

export function testing() {
    console.log(MailboxBase().join('\n'), '\n', MailboxRead().join('\n'), '\n', MailboxWrite().join('\n'), '\n', GetFrameBuffer().join('\n'));
}