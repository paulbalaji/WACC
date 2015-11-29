import Instr = require('./Instruction');
import Reg = require('./Register');
import NodeType = require('../frontend/NodeType');

var printFooter = [	
	Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),
	Instr.Bl('printf'),
	Instr.Mov(Reg.R0, Instr.Const(0)),
	Instr.Bl('fflush'),
	Instr.Pop(Reg.PC)
]

var readHeader = [Instr.Push(Reg.LR), Instr.Mov(Reg.R1, Reg.R0)];
var readFooter = [Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),
				  Instr.Bl('scanf'),
				  Instr.Pop(Reg.PC)];

export function getByteSizeFromTypeNode(typeNode) {
    var typeName = typeNode.constructor.name;
    return (typeName === 'BoolTypeNode' || typeName === 'CharTypeNode') ? 1 : 4;
}

export var funcDefs = {
	readInt: function(readFormatLabel) {
		return [Instr.Label('p_read_int'),
				readHeader,
				Instr.Ldr(Reg.R0, Instr.Liter(readFormatLabel)),
				readFooter];
	},

	readChar: function(readFormatLabel) {
		return [Instr.Label('p_read_char'),
				readHeader,
				Instr.Ldr(Reg.R0, Instr.Liter(readFormatLabel)),
				readFooter];
	},

	printString: function(stringFormatLabel) {
		return [Instr.Label('p_print_string'),
				Instr.Push(Reg.LR),
				Instr.Ldr(Reg.R1, Instr.Mem(Reg.R0)),
				Instr.Add(Reg.R2, Reg.R0, Instr.Const(4)),
				Instr.Ldr(Reg.R0, Instr.Liter(stringFormatLabel)),
				printFooter];

	},

	printBool: function(trueLabel, falseLabel) {
		return [Instr.Label('p_print_bool'),
			Instr.Push(Reg.LR),
			Instr.Cmp(Reg.R0, Instr.Const(0)),
			Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(trueLabel)), Instr.mods.ne),
			Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(falseLabel)), Instr.mods.eq),
			printFooter];

	},

	printInt: function(intFormatLabel) {
		return [Instr.Label('p_print_int'),
				Instr.Push(Reg.LR),
				Instr.Mov(Reg.R1, Reg.R0),
				Instr.Ldr(Reg.R0, Instr.Liter(intFormatLabel)),
				printFooter];
	},

	printRef: function(refFormatLabel) {
		return [Instr.Label('p_print_reference'),
				Instr.Push(Reg.LR),
				Instr.Ldr(Reg.R1, Instr.Mem(Reg.R0)),
				Instr.Add(Reg.R2, Reg.R0, Instr.Const(4)),
				Instr.Ldr(Reg.R0, Instr.Liter(refFormatLabel)),
				printFooter];
	},

	printLn: function(terminatorLabel) {
		return [Instr.Label('p_print_ln'),
				Instr.Push(Reg.LR),
				Instr.Ldr(Reg.R0, Instr.Liter(terminatorLabel)),
				Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),

				Instr.Bl('puts'),
				Instr.Mov(Reg.R0, Instr.Const(0)),
				Instr.Bl('fflush'),
				Instr.Pop(Reg.PC)
				];
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

    checkArrayBounds: function(negIndexLabel, largeIndexLabel) {
        return [Instr.Label('p_check_array_bounds'),
	            Instr.Push(Reg.LR),
	            Instr.Cmp(Reg.R0, Instr.Const(0)),
	            Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(negIndexLabel)), Instr.mods.lt),
	            Instr.modify(Instr.Bl('p_throw_runtime_error'), Instr.mods.lt),
	            Instr.Ldr(Reg.R1, Instr.Mem(Reg.R4)),
	            Instr.Cmp(Reg.R0, Reg.R1),
	            Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(largeIndexLabel)), Instr.mods.cs),
	            Instr.modify(Instr.Bl('p_throw_runtime_error'), Instr.mods.cs),
	            Instr.Pop(Reg.PC)];
    },

    freePair: function(errorLabel) {
        return [Instr.Label('p_free_pair'),
        		Instr.Push(Reg.LR),
        		Instr.Cmp(Reg.R0, Instr.Const(0)),
        		Instr.modify(Instr.Ldr(Reg.R0, Instr.Liter(errorLabel)), Instr.mods.eq),
        		Instr.modify(Instr.B('p_throw_runtime_error'), Instr.mods.eq),
        		Instr.Push(Reg.R0),
        		Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
        		Instr.B('free'),
	            Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP)),
				Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0, Instr.Const(4))),
                Instr.B('free'),
                Instr.Pop(Reg.R0),
				Instr.B('free'),
                Instr.Pop(Reg.PC)];
    },

	runtimeError: function() {
        return [Instr.Label('p_throw_runtime_error'),
        		Instr.Bl('p_print_string'),
        		Instr.Mov(Reg.R0, Instr.Const(-1)),
        		Instr.Bl('exit')];
    }
};