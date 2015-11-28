import NodeType = require('./NodeType');
import CodeGenUtil = require('../backend/CodeGenUtil');
var _ = require('underscore');

interface typeAndNodeTuple {
	type:any;
	node:any;
    offset: any;
}



export class SymbolTable {
	table: any;
	parent: SymbolTable;
    name: string;

    byteSizes: number[];
    totalByteSize: number

    stackOffset: number;

	constructor(parent:SymbolTable) {
        // initialise table
		this.table = {};
		this.parent = parent;

        this.byteSizes = [];
        this.totalByteSize = 0;

        this.stackOffset = 0;
	}

	insert(ident:NodeType.IdentNode, infoObj:typeAndNodeTuple):void {
        infoObj.offset = CodeGenUtil.getByteSizeFromTypeNode(infoObj.node.type) + this.totalByteSize ;
        this.table[ident.toString()] = infoObj;

        this.byteSizes.push(infoObj.offset);
        this.totalByteSize += CodeGenUtil.getByteSizeFromTypeNode(infoObj.node.type);
	}

	lookupAll(ident:NodeType.IdentNode):typeAndNodeTuple {
		var result = this.lookup(ident);
		return result === null && this.parent ? this.parent.lookupAll(ident) : result;
	}

    lookUpOffset(ident: NodeType.IdentNode): number {
        var result =  this.lookup(ident);
        var scopeOffset = result === null ? (this.parent.lookUpOffset(ident) + this.totalByteSize) : this.totalByteSize - result.offset;
        return scopeOffset + (this.stackOffset * 4);

    }
    lookup(ident: NodeType.IdentNode):typeAndNodeTuple {
		var result = this.table[ident.toString()];
        return result ? result : null;
	}

    /*getByteSize() {
        var sum = (xs) => _.reduce(xs, (acc, n) => acc + n);

        var counts =  _.countBy(this.table, (tup) => {
            return tup.type.constructor.name;
        });
        
        // Bools and Chars require 1 byte and everything else 4 bytes
        var byteCount = sum(
            _.map(Object.keys(counts), (typeName)  => (typeName === 'BoolTypeNode' || typeName === 'CharTypeNode') 
                            ? counts[typeName] : counts[typeName] * 4));
        
        return byteCount;
    }*/

    traverseUp(visitFunc) {
        for (var ident in this.table) {
            visitFunc(ident);
        }

        if (this.parent) {
            this.parent.traverseUp(visitFunc);
        }
    }
}

export function isType(type, ...compareTypes):boolean {
    if (compareTypes[0] instanceof Array) {
        compareTypes = compareTypes[0];
    }
    // check if given type matches one of the expected types
    return _.some(_.map(compareTypes, _.partial(isSameType.bind(this), type)));
}

export function getType(obj):string {
    return obj.constructor.name;
}

function isSameType(typeObj1, typeObj2):boolean {
    /*
        N.B for use on primitive types.
        Special case for matching empty arrays with any array type
    */
    if (typeObj1 instanceof NodeType.ArrayTypeNode || typeObj2 instanceof NodeType.ArrayTypeNode) {
        // The case that an array type is being compared with an empty array type -> always equal
        if (typeObj1 instanceof NodeType.EmptyArrayTypeNode || typeObj2 instanceof NodeType.EmptyArrayTypeNode) {
            return true;
        } else if (typeObj1 instanceof NodeType.ArrayTypeNode && typeObj2 instanceof NodeType.ArrayTypeNode) {
            // The case we are comparing two arrays
            return isSameType(typeObj1.type, typeObj2.type);
        } else {
            /*
                The case that an array type is being compared with any other type.
                Do the normal check, plus deep equality (checking depth as well as type contained)
            */
            return getType(typeObj1) === getType(typeObj2) && _.isEqual(typeObj1, typeObj2);
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

    function isSamePairType(pairType1, pairType2):boolean {
        // PRE: Both types are pair types

        // Test if the pair types are the same
        return isSameType(pairType1.type1, pairType2.type1) && isSameType(pairType1.type2, pairType2.type2);
    }
    return getType(typeObj1) === getType(typeObj2);
}

export function visitNodeList(nodeList: NodeType.TreeNode[], visitor: NodeType.Visitor):any {
    return _.map(nodeList, (statNode: NodeType.Visitable) => statNode.visit(visitor));
}

export function isReadableType(typeObj):boolean {
    // Types you can read into are INT, CHAR
    return isType(typeObj, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]);
}

export function getIdentSpellingSuggestion(identNode: NodeType.IdentNode, currentST: SymbolTable) {
    var spell = require('spell'),
        dict  = spell();

    // Traverse symbol table and add every ident to dict
    currentST.traverseUp(function(ident) {
        dict.add_word(ident);
    });
    return dict.lucky(identNode.toString());
}