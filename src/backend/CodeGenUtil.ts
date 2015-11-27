import Instr = require('./Instruction');
import Reg = require('./Register');

export var funcDefs = {
	printString: function(stringFormatLabel) {
		return [Instr.Label('p_print_string'),
				  Instr.Ldr(Reg.R1, Mem(Reg.R0)),
				  Instr.Add(Reg.R2, Reg.R0, Const(4)),
				  Instr.Ldr(Reg.R0, Mem(stringFormatLabel)),
				  Instr.Add(Reg.R0, Reg.R0, Const(4)),
				  Instr.Bl('printf'),
				  Instr.Mov(Reg.R0, Const(0)),
				  Instr.Bl('fflush'),
				  Instr.Pop(Reg.PC)
				  ];
	}
};