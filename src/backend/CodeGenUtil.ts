import Instr = require('./Instruction');
import Reg = require('./Register');
import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil');
import Macros = require('./Macros');

var printFooter = [Instr.Add(Reg.R0, Reg.R0, Instr.Const(4)),
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

export function counterWithStrPrefix(strPrefix, initial) {
    var n = initial;
    return function() {
        return strPrefix + (n++);
    }
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
                Instr.Ldrne(Reg.R0, Instr.Liter(trueLabel)),
                Instr.Ldreq(Reg.R0, Instr.Liter(falseLabel)),
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
                Instr.Mov(Reg.R1, Reg.R0),
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
                Instr.Ldreq(Reg.R0, Instr.Liter(errorLabel)),
                Instr.Bleq('p_throw_runtime_error'),
                Instr.Pop(Reg.PC)];
    },

    checkArrayBounds: function(negIndexLabel, largeIndexLabel) {
        return [Instr.Label('p_check_array_bounds'),
                Instr.Push(Reg.LR),
                Instr.Cmp(Reg.R0, Instr.Const(0)),
                Instr.Ldrlt(Reg.R0, Instr.Liter(negIndexLabel)),
                Instr.Bllt('p_throw_runtime_error'),
                Instr.Ldr(Reg.R1, Instr.Mem(Reg.R4)),
                Instr.Cmp(Reg.R0, Reg.R1),
                Instr.Ldrcs(Reg.R0, Instr.Liter(largeIndexLabel)),
                Instr.Blcs('p_throw_runtime_error'),
                Instr.Pop(Reg.PC)];
    },

    freePair: function(errorLabel) {
        return [Instr.Label('p_free_pair'),
                Instr.Push(Reg.LR),
                Instr.Cmp(Reg.R0, Instr.Const(0)),
                Instr.Ldreq(Reg.R0, Instr.Liter(errorLabel)),
                Instr.Beq('p_throw_runtime_error'),
                Instr.Push(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
                Instr.Bl('free'),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP)),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0, Instr.Const(4))),
                Instr.Bl('free'),
                Instr.Pop(Reg.R0),
                Instr.Bl('free'),
                Instr.Pop(Reg.PC)];
    },
    memset: function() {
        return [Instr.Label('memset'),
            Instr.Push(Reg.LR),
            Instr.Mov(Reg.R2, Instr.Const(0)),
            Instr.Label('memset_continue'),
            Instr.Mov(Reg.R3, Instr.Const(0)),
            Instr.Strb(Reg.R3, Instr.Mem(Reg.R0, Reg.R2)),
            Instr.Add(Reg.R2, Reg.R2, Instr.Const(1)),
            Instr.Cmp(Reg.R2, Reg.R1),
            Instr.Ble('memset_continue'),
            Instr.Pop(Reg.PC)];
    },

    runtimeError: function() {
        return [Instr.Label('p_throw_runtime_error'),
                Instr.Bl('p_print_string'),
                Instr.Mov(Reg.R0, Instr.Const(-1)),
                Instr.Bl('exit')];
    },

    checkNullPointer: function(nullPointerLabel) {

		return [Instr.Label('p_check_null_pointer'),
				Instr.Push(Reg.LR),
				Instr.Cmp(Reg.R0, Instr.Const(0)),
				Instr.Ldreq(Reg.R0, Instr.Liter(nullPointerLabel)),
				Instr.Bleq('p_throw_runtime_error'),
    			Instr.Pop(Reg.PC)];
    },

    printNodeLogic: function(node, visitor) {
		var exprInstructions = node.expr.visit(visitor);
		if (node.expr.type instanceof NodeType.BoolTypeNode) {
			Macros.insertPrintBool();
			return [exprInstructions, Instr.Bl('p_print_bool')]
		} else if (node.expr.type instanceof NodeType.IntTypeNode) {
			Macros.insertPrintInt();
			return [exprInstructions, Instr.Bl('p_print_int')]
		} else if (node.expr.type instanceof NodeType.CharTypeNode) {
			return [exprInstructions, Instr.Bl('putchar')]
		} else if (node.expr.type instanceof NodeType.ArrayTypeNode
			&& (<NodeType.ArrayTypeNode>node.expr.type).type instanceof NodeType.CharTypeNode) {
			// The case for printing a string (array of chars)
			Macros.insertPrintString();
			return [exprInstructions, Instr.Bl('p_print_string')];
		} else if (node.expr.type instanceof NodeType.StructTypeNode || node.expr.type instanceof NodeType.ArrayTypeNode || node.expr.type instanceof NodeType.NullTypeNode
			|| node.expr.type instanceof NodeType.PairTypeNode) {

			Macros.insertPrintRef();
			return [exprInstructions, Instr.Bl('p_print_reference')];
		}


    }
};

var nextDataLabel = counterWithStrPrefix('msg_', 0);

export function genStrDataBlock(len: number, str: string) {
    var label = nextDataLabel();
    return {label: label, instructions: [Instr.Label(label),
            Instr.Directive('word', len),
            Instr.Directive('ascii', '"' + str + '"')]};
}
