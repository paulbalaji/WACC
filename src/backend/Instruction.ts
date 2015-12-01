var _ = require('underscore');

export var mods = {
	ne: "NE",
	eq: "EQ",
    cs: "CS",
    vs: "VS",
    gt: "GT",
    ge: "GE",
    lt: "LT",
    le: "LE",
    b: "B",
    s: "S",
    sb: "SB",
    bang: "!",
	none: ""
};

export function modify (instr, mod) {
	instr.command += mod;
	return instr;
}

function modInstr(instrF, mod) {
	return function(...args) {
		var instr = instrF.apply(this, args);
		instr.command += mod;
		return instr;
	};
}

function isConst(obj) {
	return obj._const;
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
	cst._const = true; // Signals that this is of type const
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
    ldr.command = "LDR";

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
	
	var lastArg = _.last(memArgs);
	if (isConst(lastArg) && lastArg.n === 0) { // If last arg is a Const #0, then remove it as its unnesccessary
		memArgs = _.initial(memArgs); // Remove the last arg
	}

    mem.memArgs = memArgs;
    mem.command = ']';
    mem.toString = function() {
        return '[' + mem.memArgs.join(', ') + mem.command;
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

export var Blne = modInstr(Bl, mods.ne);
export var Bllt = modInstr(Bl, mods.lt);
export var Blcs = modInstr(Bl, mods.cs);
export var Bleq = modInstr(Bl, mods.eq);

export var Strb = modInstr(Str, mods.b);
export var Adds = modInstr(Add, mods.s);
export var Blvs = modInstr(Bl, mods.vs);
export var Movgt = modInstr(Mov, mods.gt);
export var Movle = modInstr(Mov, mods.le);
export var Movlt = modInstr(Mov, mods.lt);
export var Movge = modInstr(Mov, mods.ge);
export var Moveq = modInstr(Mov, mods.eq);
export var Movne = modInstr(Mov, mods.ne);
export var Beq = modInstr(B, mods.eq);
export var Ldrsb = modInstr(Ldr, mods.sb);
export var Ldrlt = modInstr(Ldr, mods.lt);
export var Ldreq = modInstr(Ldr, mods.eq);
export var Ldrcs = modInstr(Ldr, mods.cs);
export var Ldrne = modInstr(Ldr, mods.ne);
export var Rsbs = modInstr(Rsb, mods.s);
export var Subs = modInstr(Sub, mods.s);
/*export function Add(...addArgs) {
	var add: any = {};
	add.args = addArgs;
	add.command = 'ADD';
    add.toString = function() {
        return  add.command + ' ' + add.args.join(', ');
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
}*/

function SafeConst(cmd) {
	function isRepresentable(n) {

		while (n >= 256) {
			if (n & 3) {
				return false;
			}

			n >>= 2;
		}

		return true;
	}

	function makeRepresentable(n) {
		if (isRepresentable(n)) {
			return [n];
		}

		var window = 255 << 24;

		var prev = 0;
		while ((window & n) >= prev) {
			prev = window & n;
			window >>>= 2;
		}
		return [prev].concat(makeRepresentable(n - prev)); 
	}

	return function instr(...args) {
		var instrObj: any = {};
		instrObj.args = args;
		instrObj.command = cmd;

		var lastArg = _.last(args);


		instrObj.toString = function() {
			return instrObj.command + ' ' + instrObj.args.join(', ');

		}


		if (isConst(lastArg) && !isRepresentable(lastArg.n)) {
			return _.map(makeRepresentable(lastArg.n), function(representableN) {
				return instr.apply(this,  _.initial(args).concat(Const(representableN)));
			});
		}

		return instrObj;
	}
}

export var Add = SafeConst('ADD');
export var Sub = SafeConst('SUB');

export function Smull(...smullArgs) {
    var smull: any = {};
    smull.args = smullArgs;
    smull.toString = function() {
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

    return rsb;
}

export function Asr(n) {
    var asr: any = {};
    asr.value = Const(n);
    asr.toString = function() {
        return 'ASR ' + asr.value;
    }
    return asr;
}

export function Lsl(n) {
    var lsl: any = {};
    lsl.value = Const(n);
    lsl.toString = function() {
        return 'LSL ' + lsl.value;
    }
    return lsl;
}

export function Eor(...eorArgs) {
	var eor: any = {};
	eor.args = eorArgs;
	eor.toString = function() {
		return 'EOR ' + eor.args.join(', ');
	}
	return eor;
}

export function buildList(...unflattenedList) {
	return _.flatten(unflattenedList);
}