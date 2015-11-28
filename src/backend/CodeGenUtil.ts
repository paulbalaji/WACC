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

	printBool: function(trueLabel, falseLabel) {
		return [Instr.Label('p_print_bool'),
				Instr.Push(Reg.LR),
				Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(trueLabel)), Instr.mods.ne),
				Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(falseLabel)), Instr.mods.eq),
				Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),
				Instr.Bl("printf"),
				Instr.Mov(Reg.R0, Instr.Const(0)),
				Instr.Bl('fflush'),
				Instr.Pop(Reg.PC)];

	},
	
	overflowError: function(overflowErrorlLabel) {
        return [Instr.Label('p_throw_overflow_error'),
        		Instr.Ldr(Reg.R0, Instr.Liter(overflowErrorlLabel)),
            	Instr.Bl('p_throw_runtime_error')];
	},

    checkDivideByZero: function(errorLabel) {
        return [Instr.Label('p_check_divide_by_zero'),
        		Instr.Push(Reg.LR),
        		Instr.Cmp(Reg.R1, Instr.Const(0)),
        		Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(errorLabel)), Instr.mods.eq),
        		Instr.modify(Instr.Bl('p_throw_runtime_error'), Instr.mods.eq),
        		Instr.Pop(Reg.PC)];
    },

	runtimeError: function() {
        return [Instr.Label('p_throw_runtime_error'),
        		Instr.Bl('p_print_string'),
        		Instr.Mov(Reg.R0, Instr.Const(-1)),
        		Instr.Bl('exit')];
    }
};