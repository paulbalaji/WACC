import NodeType = require('./NodeType');
var _ = require('underscore');

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


export function isType(type, ...compareTypes) {
    if (compareTypes[0] instanceof Array) {
        compareTypes = compareTypes[0];
    }
    return _.some(_.map(compareTypes, _.partial(this.isSameType.bind(this), type)));
}

export function getType(obj): string {
    return obj.constructor.name;
}

function isSameType(typeObj1, typeObj2): boolean {
    // N.B for use on primitive types.
    // Special case for matching empty arrays with any array type
    if (typeObj1 instanceof NodeType.ArrayTypeNode || typeObj2 instanceof NodeType.ArrayTypeNode) {
            
        // The case that an array type is being compared with an empty array type -> always equal
        if (typeObj1 instanceof NodeType.EmptyArrayTypeNode || typeObj2 instanceof NodeType.EmptyArrayTypeNode) {
            return true;
        } else if (typeObj1 instanceof NodeType.ArrayTypeNode && typeObj2 instanceof NodeType.ArrayTypeNode) { // The case we are comparing two arrays
            return this.isSameType(typeObj1.type, typeObj2.type);
        } else { // The case that an array type is being compared with any other type.  Do the normal check, plus deep equality (checking depth as well as type contained)
            return this.getType(typeObj1) === this.getType(typeObj2) && _.isEqual(typeObj1, typeObj2);
        }
    }

    if (typeObj1 instanceof NodeType.PairTypeNode || typeObj2 instanceof NodeType.PairTypeNode) {
        if (typeObj1 instanceof NodeType.NullTypeNode || typeObj2 instanceof NodeType.NullTypeNode) {
            return true;
        }
    }

    if (typeObj1 instanceof NodeType.PairTypeNode && typeObj2 instanceof NodeType.PairTypeNode) {
        return isSamePairType.bind(this)(typeObj1, typeObj2);
    }

    function isSamePairType(pairType1, pairType2) {
        // PRE: Both types are pair types

        // Test if the pair types are the same
        return this.isSameType(pairType1.type1, pairType2.type1) &&
            this.isSameType(pairType1.type2, pairType2.type2);

    }

    return this.getType(typeObj1) === this.getType(typeObj2);
}