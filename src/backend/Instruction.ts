var _ = require('underscore');

export function Directive(name, ...args) {
	var dir: any = {};
	dir.name = name;
	dir.args = args;
	return dir;
}

export function Push(...rs) {
	var push: any = {};
	push.pushRegs = rs;
	return push;
}

export function Pop(...rs) {
	var pop: any = {};
	pop.popRegs = rs;
	return pop;
}

export function Const(n) {
	var cst: any = {};
	cst.n = n;
	return cst;
}

export function Label(labelName: string) {
    var label: any = {};
    label.labelName = labelName;
    return label;
}

/* Represents =label */
export function LabelRef(labelName: string) {
	var labelRef: any = {};
	labelRef.labelName = labelName;
	return labelRef;
}

export function Ldr(dst, src) {
    var ldr: any = {};
    ldr.dst = dst;
    ldr.src = src;
    return ldr;
}

export function Mov(dst, src) {
	var mov: any = {};
	mov.dst = dst;
	mov.src = src;
	return mov;
}

export function Bl(branchLabel) {
	var bl: any = {};
	bl.branchLabel = branchLabel;
	return bl;
}

var nextDataLabel = function() {
	var l = 0;
	return function() {
		return l++;
	}
} ();

export function genStrDataBlock(str) {
	var label = 'msg_' + nextDataLabel();
	return {label: label, instructions: [Label(label),
			Directive('word', str.length),
			Directive('ascii', str)]}
		;
}

export function buildList(...unflattenedList) {
	return _.flatten(unflattenedList);
}