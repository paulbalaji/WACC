var NodeType = require('./NodeType');
var _ = require('underscore');
var SymbolTable = (function () {
    function SymbolTable(parent) {
        // initialise table
        this.table = {};
        this.parent = parent;
    }
    SymbolTable.prototype.insert = function (ident, infoObj) {
        this.table[ident.toString()] = infoObj;
    };
    SymbolTable.prototype.lookupAll = function (ident) {
        var result = this.lookup(ident);
        return result === null && this.parent ? this.parent.lookupAll(ident) : result;
    };
    SymbolTable.prototype.lookup = function (ident) {
        var result = this.table[ident.toString()];
        return result ? result : null;
    };
    SymbolTable.prototype.traverseUp = function (visitFunc) {
        for (var ident in this.table) {
            visitFunc(ident);
        }
        if (this.parent) {
            this.parent.traverseUp(visitFunc);
        }
    };
    return SymbolTable;
})();
exports.SymbolTable = SymbolTable;
function isType(type) {
    var compareTypes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        compareTypes[_i - 1] = arguments[_i];
    }
    if (compareTypes[0] instanceof Array) {
        compareTypes = compareTypes[0];
    }
    // check if given type matches one of the expected types
    return _.some(_.map(compareTypes, _.partial(isSameType.bind(this), type)));
}
exports.isType = isType;
function getType(obj) {
    return obj.constructor.name;
}
exports.getType = getType;
function isSameType(typeObj1, typeObj2) {
    /*
        N.B for use on primitive types.
        Special case for matching empty arrays with any array type
    */
    if (typeObj1 instanceof NodeType.ArrayTypeNode || typeObj2 instanceof NodeType.ArrayTypeNode) {
        // The case that an array type is being compared with an empty array type -> always equal
        if (typeObj1 instanceof NodeType.EmptyArrayTypeNode || typeObj2 instanceof NodeType.EmptyArrayTypeNode) {
            return true;
        }
        else if (typeObj1 instanceof NodeType.ArrayTypeNode && typeObj2 instanceof NodeType.ArrayTypeNode) {
            // The case we are comparing two arrays
            return isSameType(typeObj1.type, typeObj2.type);
        }
        else {
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
    function isSamePairType(pairType1, pairType2) {
        // PRE: Both types are pair types
        // Test if the pair types are the same
        return isSameType(pairType1.type1, pairType2.type1) && isSameType(pairType1.type2, pairType2.type2);
    }
    return getType(typeObj1) === getType(typeObj2);
}
function visitNodeList(nodeList, visitor) {
    return _.map(nodeList, function (statNode) { return statNode.visit(visitor); });
}
exports.visitNodeList = visitNodeList;
function isReadableType(typeObj) {
    // Types you can read into are INT, CHAR
    return isType(typeObj, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]);
}
exports.isReadableType = isReadableType;
function getIdentSpellingSuggestion(identNode, currentST) {
    var spell = require('spell'), dict = spell();
    // Traverse symbol table and add every ident to dict
    currentST.traverseUp(function (ident) {
        dict.add_word(ident);
    });
    return dict.lucky(identNode.toString());
}
exports.getIdentSpellingSuggestion = getIdentSpellingSuggestion;
