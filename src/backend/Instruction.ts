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

export function buildList(unflattenedList) {
	return _.flatten(unflattenedList);
}