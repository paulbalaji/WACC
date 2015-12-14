/* Module SystemFunctionsHandler - manages system functions which are always inserted.
   Contains list of system function insertions to be done at end of code generation. */
import Instr = require('./Instruction');
import CodeGenUtil = require('./CodeGenUtil');
import GXMacros = require('./GraphicsMacros');
import Reg = require('./Register');
import Const = require('../frontend/constants');

var _ = require('underscore');

var barebones = Const.barebones;

export var sections = { dataSection: [], sysFuncSection: [] };

var closingInsertions = [];
/* A list of functions which insert instructions into relevant sections,
 to be run at the end of code gen */

export function runClosingInsertions() {
    for (var i = 0; i < closingInsertions.length; i++) {
        closingInsertions[i]();
    }
    return sections;
}

export var insertDataLabel =  _.once(function() {
	sections.dataSection.push(Instr.Directive('data'));
});

export var insertStringDataHeader = function(str: string) {
	insertDataLabel();
	var {label: dataLabel, instructions: strDataInstructions} = CodeGenUtil.genStrDataBlock(str.length - str.split("\\").length + 1, str);
	sections.dataSection.push(strDataInstructions);
	return dataLabel;
};

export var insertCheckNullPointer = _.once(() => {
	closingInsertions.push(function() {
		var nullPointerLabel = insertStringDataHeader("NullReferenceError: dereference a null reference\\n\\0");
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.checkNullPointer(nullPointerLabel));
		insertRuntimeError();
	});
});

export var insertMemset = _.once(() => {	

	closingInsertions.push(function() {
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.memset());
	});
});

export var insertReadInt = _.once(() => {
	closingInsertions.push(function() {
		var intFormatLabel = insertStringDataHeader("%d\\0");
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.readInt(intFormatLabel));
	});
});

export var insertReadChar = _.once(() => {
	closingInsertions.push(function() {
		var charFormatLabel = insertStringDataHeader(" %c\\0");
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.readChar(charFormatLabel));
	});
});

export var insertPrintString = _.once(() => {
	closingInsertions.push(function() {
		var message = '%.*s\\0';
		var dataLabel = insertStringDataHeader(message);
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.printString(dataLabel));
	});
});

export var insertPrintBool = _.once(() => {
	closingInsertions.push(function() {
		var trueLabel = insertStringDataHeader("true\\0");
		var falseLabel = insertStringDataHeader("false\\0");
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.printBool(trueLabel, falseLabel));
	});
});

export var insertPrintInt = _.once(() => {
	closingInsertions.push(function() {
		var intFormatLabel = insertStringDataHeader("%d\\0");
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.printInt(intFormatLabel));
	});
});

export var insertPrintRef = _.once(() => {
	closingInsertions.push(function() {
		var refFormatLabel = insertStringDataHeader('%p\\0');
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.printRef(refFormatLabel));
                //insertPrintInt();
	});
});

export var insertPrintLn = _.once(() => {
	closingInsertions.push(function() {
		var terminatorLabel = insertStringDataHeader('\\0');
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.printLn(terminatorLabel));
	});
});

export var insertOverflowError = _.once(() => {
	closingInsertions.push(function() {
		var message = 'OverflowError: the result is too small/large to store in a 4-byte signed-integer.\\n';
		var dataLabel = insertStringDataHeader(message);
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.overflowError(dataLabel));
		insertRuntimeError();
	});
});

export var insertCheckDivideByZero = _.once( () => {
	closingInsertions.push(function() {
		var message = 'DivideByZeroError: divide or modulo by zero\\n\\0';
		var dataLabel = insertStringDataHeader(message);
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.checkDivideByZero(dataLabel));
		insertRuntimeError();
	});
});

export var insertCheckArrayBounds = _.once(() => {
	closingInsertions.push(function() {
		var negMessage = 'ArrayIndexOutOfBoundsError: negative index\\n\\0';
		var negLabel = insertStringDataHeader(negMessage);
		var largeMessage = 'ArrayIndexOutOfBoundsError: index too large\\n\\0';
		var largeLabel = insertStringDataHeader(largeMessage);
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.checkArrayBounds(negLabel, largeLabel));
		insertRuntimeError();
	});
});

export var insertFreePair = _.once(() => {
	closingInsertions.push(function() {
		var message = 'NullReferenceError: dereference a null reference\\n\\0';
		var dataLabel = insertStringDataHeader(message);
		sections.sysFuncSection.push(CodeGenUtil.funcDefs.freePair(dataLabel));
		insertRuntimeError();
	});
});

export var insertRuntimeError = _.once(() => {
	closingInsertions.push(function() {
        var barebones = true;
		if (barebones) {
            sections.sysFuncSection.push([Instr.Label('p_throw_runtime_error'),
						                  Instr.Push(Reg.LR),
						                  Instr.Pop(Reg.PC)]);
			//do nothing for now
		} else {
			sections.sysFuncSection.push(CodeGenUtil.funcDefs.runtimeError());
			insertPrintString();
		}
	});
});

export var insertMailboxBase = _.once(() => {
    closingInsertions.push(function() {
        sections.sysFuncSection.push(GXMacros.MailboxBase());
    });
});

export var insertMailboxWrite = _.once(() => {
    closingInsertions.push(function() {
        sections.sysFuncSection.push(GXMacros.MailboxWrite());
        insertMailboxBase();
    });
});

export var insertMailboxRead = _.once(() => {
    closingInsertions.push(function() {
        sections.sysFuncSection.push(GXMacros.MailboxRead());
    });
});

export var insertGetFrameBuffer = _.once(() => {
    closingInsertions.push(function() {
        sections.sysFuncSection.push(GXMacros.GetFrameBuffer());
        insertMailboxBase();
        insertMailboxWrite();
        insertMailboxRead();
        insertDataLabel();
        sections.dataSection.push(GXMacros.FrameBufferInfo());

    });
});

export var insertMalloc = _.once(() => {
	if (barebones) {
		closingInsertions.push(function() {
        	sections.sysFuncSection.push(CodeGenUtil.funcDefs.malloc());
		});
	}
});



export var insertFree = _.once(() => {
	if (barebones) {
	    closingInsertions.push(function() {
	        sections.sysFuncSection.push(CodeGenUtil.funcDefs.free());
	    });
    }
});
