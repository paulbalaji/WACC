var _ = require('underscore');

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
    ldr.toString = function() {
        return 'LDR ' + [dst, src].join(', ');
    }
    return ldr;
}

export function Mov(dst, src) {
	var mov: any = {};
	mov.dst = dst;
	mov.src = src;
	mov.toString = function() {
		return 'MOV ' + [dst, src].join(', ');
	}
	return mov;
}

export function Mem(memArg) {
	var mem: any = {};
	mem.memArg = memArg;
    mem.toString = function() {
        return '[' + memArg + ']';
    }
	return mem;
}

export function Bl(branchLabel) {
	var bl: any = {};
	bl.branchLabel = branchLabel;
	bl.toString = function() {
		return 'BL ' + bl.branchLabel;
	}
	return bl;
}

export function Blvs(branchLabel) {
	var blvs: any = {};
	blvs.branchLabel = branchLabel;
	blvs.toString = function() {
		return 'BLVS ' + blvs.branchLabel;
	}
	return blvs;
}

export function Blne(branchLabel) {
    var blne: any = {};
    blne.branchLabel = branchLabel;
    blne.toString = function() {
        return 'BLNE ' + blne.branchLabel;
    }
    return blne;
}

export function Add(...addArgs) {
	var add: any = {};
	add.args = addArgs;
    add.toString = function() {
        return 'ADD ' + add.args.join(', ');
    }
	return add;
}

export function Adds(...addsArgs) {
	var adds: any = {};
	adds.args = addsArgs;
	adds.toString = function() {
		return 'ADDS ' + adds.args.join(', ');
	}
	return adds;
}

export function Sub(...subArgs) {
    var sub: any = {};
    sub.args = subArgs;
    sub.toString = function() {
        return 'SUB ' + sub.args.join(', ');
    }
    return sub;
}

export function Subs(...subsArgs) {
    var subs: any = {};
    subs.args = subsArgs;
    subs.toString = function() {
        return 'SUBS ' + subs.args.join(', ');
    }
    return subs;
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

export function Asr(n) {
    var asr: any = {};
    asr.value = Const(n);
    asr.toString = function() {
        return 'ASR ' + asr.value;
    }
    return asr;
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

export function genStrDataBlock(str) {
	var label = nextDataLabel();
	return {label: label, instructions: [Label(label),
			Directive('word', str.length),
			Directive('ascii', '"' + str + '"')]}
		;
}

export function buildList(...unflattenedList) {
	return _.flatten(unflattenedList);
}