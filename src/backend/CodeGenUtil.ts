import Instr = require('./Instruction');
import Reg = require('./Register');

export var funcDefs = {
	printString: function(stringFormatLabel) {
		return [Instr.Label('p_print_string'),
				Instr.Push(Reg.LR),
				Instr.Ldr(Reg.R1, Instr.Mem(Reg.R0)),
				Instr.Add(Reg.R2, Reg.R0, Instr.Const(4)),
				Instr.Ldr(Reg.R0, Instr.Liter(stringFormatLabel)),
				Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),
				Instr.Bl('printf'),
				Instr.Mov(Reg.R0, Instr.Const(0)),
				Instr.Bl('fflush'),
				Instr.Pop(Reg.PC)];
	},

	overflowError: function(overflowErrorlLabel) {
        return [Instr.Label('p_throw_overflow_error'),
        		Instr.Ldr(Reg.R0, Instr.Liter(overflowErrorlLabel)),
            	Instr.Bl('p_throw_runtime_error')];
	},

	//TODO: make this properly
    divideByZeroError: function(overflowErrorlLabel) {
        return [Instr.Label('p_throw_overflow_error'),
           		Instr.Ldr(Reg.R0, Instr.Liter(overflowErrorlLabel)),
            	Instr.Bl('p_throw_runtime_error')];
    },

	runtimeError: function() {
        return [Instr.Label('p_throw_runtime_error'),
        		Instr.Bl('p_print_string'),
        		Instr.Mov(Reg.R0, Instr.Const(-1)),
        		Instr.Bl('exit')];
    }
};