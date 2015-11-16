var NodeType = require('./NodeType');
var SemanticUtil = require('./SemanticUtil');
var _ = require('underscore');
/*
    Function used to generator the info object that each operator maps to.
    Contains the possibleTypes that the operator works on and the return type of the operator
*/
function OpInfo(types, returnType) {
    this.isPermittedType = types instanceof Function ? types : _.partial(SemanticUtil.isType, _, types);
    this.returnType = returnType;
}
/*
    Unary Operator Info
*/
var _unOpMap = {};
_unOpMap['-'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_unOpMap['!'] = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_unOpMap['ord'] = new OpInfo(NodeType.CHAR_TYPE, NodeType.INT_TYPE);
_unOpMap['chr'] = new OpInfo(NodeType.INT_TYPE, NodeType.CHAR_TYPE);
_unOpMap['len'] = new OpInfo(function (t, t2) {
    return SemanticUtil.isType(t, NodeType.STRING_TYPE)
        || t instanceof NodeType.ArrayTypeNode;
}, NodeType.INT_TYPE);
exports.unOpMap = _unOpMap;
/*
    Binary Operator Info
*/
var _binOpMap = {};
_binOpMap['+'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['-'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['*'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['/'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['%'] = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['>'] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['<'] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['<='] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['>='] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['=='] = new OpInfo(function (t) { return true; }, NodeType.BOOL_TYPE);
_binOpMap['!='] = new OpInfo(function (t) { return true; }, NodeType.BOOL_TYPE);
_binOpMap['&&'] = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_binOpMap['||'] = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
exports.binOpMap = _binOpMap;
