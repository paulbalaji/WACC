var _ = require('underscore');

export function Directive(name, ...args) {
	var dir = {};
	dir.name = name;
	dir.args = args;
	return dir;
}

export function Push(...rs) {
	var push = {};
	push.regs = rs;
	return push;
}

export function Pop(...rs) {
	var pop = {};
	pop.regs = rs;
	return pop;
}

export function Const(n) {
	var cst = {};
	cst. n = n;
	return cst;
}

export function Label(labelName) {
    var label: any = {};
    label.labelName = labelName;
    return label;
}

export function Ldr(dst, src) {
    var ldr: any = {};
    ldr.dst = dst;
    ldr.src = src;
    return ldr;
}

export function buildList(unflattenedList) {
	return _.flatten(unflattenedList);
}