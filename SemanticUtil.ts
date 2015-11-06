import NodeType = require('./NodeType');

interface typeAndNodeTuple {
	type:any;
	node:any;
}

export class SymbolTable {
	table:any;
	parent:SymbolTable;
    name: string;

	constructor(parent:SymbolTable) {
		this.table = {}; // init table
		this.parent = parent;
	}

	insert(ident:NodeType.IdentNode, infoObj:typeAndNodeTuple):void {
		this.table[ident.toString()] = infoObj;
	}

	lookupAll(ident:NodeType.IdentNode):typeAndNodeTuple {
		var result = this.lookup(ident);
		return result === null && this.parent ? this.parent.lookupAll(ident) : result;
	}

	lookup(ident:NodeType.IdentNode):typeAndNodeTuple {
		var result = this.table[ident.toString()];

		if (result) {
			return result;
		}

		return null;
	}
}