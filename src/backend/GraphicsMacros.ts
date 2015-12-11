import Instr = require('./Instruction');
import Reg = require('./Register');
var _ = require('underscore');

export var MailboxBase = function() {
    return [
        Instr.Label('gx_mailbox_base'),
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
        Instr.Bl('gx_mailbox_base'),
        Instr.Label('gx_wait1'),
        Instr.Ldr(Reg.R3, Instr.Mem(Reg.R0, Instr.Const(0x18))),
        Instr.Tst(Reg.R3, Instr.Const(0x80000000)),
        Instr.Bne('gx_wait1'),
        Instr.Add(Reg.R2, Reg.R1),
        Instr.Str(Reg.R2, Instr.Mem(Reg.R0, Instr.Const(0x20))),
        Instr.Pop(Reg.PC)
    ];
};

export var FrameBufferInfo = function () {
    return [
            Instr.Directive('align', 12),
            Instr.Label('gx_frame_buffer_info'),
            Instr.Directive('int', 1024),
            Instr.Directive('int', 767),
            Instr.Directive('int', 1024),
            Instr.Directive('int', 768),
            Instr.Directive('int', 0),
            Instr.Directive('int', 16),
            Instr.Directive('int', 0),
            Instr.Directive('int', 0),
            Instr.Directive('int', 0),
            Instr.Directive('int', 0)
    ];
};

export var GetFrameBuffer = function () {
    return [
        Instr.Label('gx_get_frame_buffer'),
        Instr.Cmp(Reg.R0, Instr.Const(4096)),
        Instr.Cmpls(Reg.R1, Instr.Const(4096)),
        Instr.Cmpls(Reg.R2, Instr.Const(32)),
        Instr.Movhi(Reg.R0, Instr.Const(0)),
        Instr.Movhi(Reg.PC, Reg.LR),

        Instr.Push(Reg.R4, Reg.LR),

        Instr.Ldr(Reg.R4, Instr.Liter('gx_frame_buffer_info')),

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

        Instr.Teq(Reg.R0, Instr.Const(0)),
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
        Instr.Bl("gx_mailbox_base"),
        Instr.Label("gx_right_mail"),
        Instr.Label("gx_wait2"),
        Instr.Ldr(Reg.R2, Instr.Mem(Reg.R0, Instr.Const(0x18))),
        Instr.Tst(Reg.R2, Instr.Const(0x40000000)),
        Instr.Bne("gx_wait2"),
        Instr.Ldr(Reg.R2, Instr.Mem(Reg.R0)),
        Instr.And(Reg.R3, Reg.R2, Instr.Const(15)),
        Instr.Teq(Reg.R3, Reg.R1),
        Instr.Bne("gx_right_mail"),
        Instr.And(Reg.R0, Reg.R2, Instr.Const(0xfffffff0)),
        Instr.Pop(Reg.PC)
    ];
};

export function testing() {
    console.log(MailboxBase().join('\n'), '\n', MailboxRead().join('\n'), '\n', MailboxWrite().join('\n'), '\n', GetFrameBuffer().join('\n'));
}