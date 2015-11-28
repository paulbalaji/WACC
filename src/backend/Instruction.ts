var _ = require('underscore');

export function modify (instr, mod) {
	instr.command += mod;
	return instr;
}
export function Directive(name, ...args) {
	var dir: any = {};
	dir.name = name;
	dir.args = args;
    dir.toString = function() {
        return '.' + dir.name + ' ' + args.join(' ');
    }
	return dir;
}

export function Push(...rs) {
	var push: any = {};
	push.pushRegs = rs;
	push.toString = function() {
		return 'PUSH ' + '{' + push.pushRegs.join(', ') + '}';
	}

	return push;
}

export function Pop(...rs) {
	var pop: any = {};
	pop.popRegs = rs;
    pop.toString = function() {
        return 'POP ' + '{' + pop.popRegs.join(', ') + '}';
    }

	return pop;
}

/* Represents #n */
export function Const(n) {
	var cst: any = {};
	cst.n = n;
	cst.toString = function() {
		return '#' + n;
	}

	return cst;
}

export function Label(labelName: string) {
    var label: any = {};
    label.labelName = labelName;
    label.toString = function() {
        return label.labelName + ':';
    }
    return label;
}

/* Represents =... */
export function Liter(arg) {
	var liter: any = {};
	liter.arg = arg;
	liter.toString = function() {
		return '=' + liter.arg;
	}
	return liter;
}

export function Ldr(dst, src) {
    var ldr: any = {};
    ldr.dst = dst;
    ldr.src = src;
	ldr.command = "LDR"
    ldr.toString = function() {
        return  ldr.command + ' ' + [dst, src].join(', ');
    }
    return ldr;
}

export function Mov(dst, src) {
	var mov: any = {};
	mov.dst = dst;
	mov.src = src;
	mov.command = 'MOV';

	mov.toString = function() {
		return  mov.command + ' ' + [dst, src].join(', ');
	}

	return mov;
}

export function Mem(...memArgs) {
	var mem: any = {};
    
    mem.memArgs = memArgs

    // var lastElem = mem.memArgs[mem.memArgs.length - 1];
    // if (lastElem instanceof Const) {
    //     if (lastElem.n === 0) {
    //         mem.memArgs = mem.memArgs.slice(0, -1);
    //     } else {
    //     	;
    //     }
    // }

    mem.toString = function() {
        return '[' + mem.memArgs.join(', ') + ']';
    }

	return mem;
}

export function Str(...strArgs) {
	var str: any = {};
	str.strArgs = strArgs;
	str.command = 'STR';

	str.toString = function() {
		return str.command + ' ' + str.strArgs.join(', ');
	}

	return str;
}

export function B(branchLabel) {
    var b: any = {};
    b.branchLabel = branchLabel;
    b.command = 'B';

    b.toString = function() {
        return b.command + ' ' + b.branchLabel;
    }

    return b;
}

export function Bl(branchLabel) {
	var bl: any = {};
	bl.branchLabel = branchLabel;
    bl.command = 'BL';

	bl.toString = function() {
		return bl.command + ' ' + bl.branchLabel;
	}
    
	return bl;
}

export function Add(...addArgs) {
	var add: any = {};
	add.args = addArgs;
    add.command = 'ADD';
    add.toString = function() {
        return add.command + ' ' + add.args.join(', ');
    }
	return add;
}

export function Sub(...subArgs) {
    var sub: any = {};
    sub.args = subArgs;
    sub.command = 'SUB';
    sub.toString = function() {
        return sub.command + ' ' + sub.args.join(', ');
    }
    return sub;
}

export function Smull(...smullArgs) {
    var smull: any = {};
    smull.args = smullArgs;
    smull.toString = function() {
        console.log("blah blah blah");
        return 'SMULL ' + smull.args.join(', ');
    }
    return smull;
}

export function Cmp(...cmpArgs) {
    var cmp: any = {};
    cmp.args = cmpArgs;
    cmp.toString = function() {
        return 'CMP ' + cmp.args.join(', ');
    }
    return cmp;
}

export function Rsb(...rsbArgs) {
    var rsb: any = {};
    rsb.args = rsbArgs;
    rsb.command = 'RSB';
    rsb.toString = function() {
        return rsb.command + ' ' + rsb.args.join(', ');
    }
}

export function Asr(n) {
    var asr: any = {};
    asr.value = Const(n);
    asr.toString = function() {
        return 'ASR ' + asr.value;
    }
    return asr;
}

export var mods = {
	ne : "NE",
	eq : "EQ",
    vs:  "VS",
    gt: "GT",
    ge: "GE",
    lt: "LT",
    le: "LE",
    b: "B",
    s: "S",
	none : ""
}

export function Eor(...eorArgs) {
	var eor: any = {};
	eor.args = eorArgs;
	eor.toString = function() {
		return 'EOR ' + eor.args.join(', ');
	}
	return eor;
}

var nextDataLabel = function() {
	var l = 0;
	return function() {
		return 'msg_' + (l++);
	}
} ();

/*function unescape(str) {
	console.log(str);
	str = str.replace('\0', '\\0')
		.replace('\b', '\\b')
		.replace('\t', '\\t')
		.replace('\n', '\\n')
		.replace('\f', '\\f')
		.replace('\r', '\\r')
		.replace('\"', '\\"')
		.replace('\'', '\\\'')
		.replace('\\', '\\\\');
	console.log(str);

	return str;
}*/

export function genStrDataBlock(len: number, str: string) {
	var label = nextDataLabel();
	return {label: label, instructions: [Label(label),
			Directive('word', len),
			Directive('ascii', '"' + str + '"')]}
		;
}

export function buildList(...unflattenedList) {
	return _.flatten(unflattenedList);
}