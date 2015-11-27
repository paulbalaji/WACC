var _ = require('underscore');

function commaJoin(list) {
	var joined = list.join(', ');
	return joined.slice(1, joined.length - 1);
}

export function Directive(name, ...args) {
	var dir: any = {};
	dir.name = name;
	dir.args = args;
	return dir;
}

export function Push(...rs) {
	var push: any = {};
	push.pushRegs = rs;
	push.toString = function() {
		return 'PUSH ' + '{' + commaJoin(push.pushRegs) + '}';
	}

	return push;
}

export function Pop(...rs) {
	var pop: any = {};
	pop.popRegs = rs;
    pop.toString = function() {
        return 'POP ' + '{' + commaJoin(pop.popRegs) + '}';
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
        return 'LDR ' + commaJoin([dst, src]);
    }
    return ldr;
}

export function Mov(dst, src) {
	var mov: any = {};
	mov.dst = dst;
	mov.src = src;
	mov.toString = function() {
		return 'MOV ' + dst + ', ' + src;
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

export function Add(...addArgs) {
	var add: any = {};
	add.args = addArgs;
    add.toString = function() {
        return 'ADD ' + commaJoin(add.args);
    }
	return add;
}

var nextDataLabel = function() {
	var l = 0;
	return function() {
		return 'msg_' + (l++);
	}
} ();

export function genStrDataBlock(str) {
	var label = nextDataLabel();
	return {label: label, instructions: [Label(label),
			Directive('word', str.length),
			Directive('ascii', str)]}
		;
}

export function buildList(...unflattenedList) {
	return _.flatten(unflattenedList);
}