import NodeType = require('./NodeType');

interface typeAndNodeTuple {
	type:any;
	node:any;
}

export class SymbolTable {
	table:any;
	parent:SymbolTable;

	constructor(parent:SymbolTable) {
		this.table = {}; // init table
		this.parent = parent;
	}

	insert(ident:NodeType.IdentNode, infoObj:typeAndNodeTuple):void {
		this.table[ident.toString()] = infoObj;
	}

	lookupAll(ident:NodeType.IdentNode):typeAndNodeTuple {
		var result = this.table[ident.toString()];

		if (result) {
			return result;
		}
		if (this.parent) {
			return this.parent.lookupAll(ident);
		}

		return null;
	}
}