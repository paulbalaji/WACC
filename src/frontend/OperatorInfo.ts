import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');
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

_unOpMap['-']   = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_unOpMap['!']   = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_unOpMap['ord'] = new OpInfo(NodeType.CHAR_TYPE, NodeType.INT_TYPE);
_unOpMap['chr'] = new OpInfo(NodeType.INT_TYPE, NodeType.CHAR_TYPE);
_unOpMap['len'] = new OpInfo((t, t2) =>
	SemanticUtil.isType(t, NodeType.STRING_TYPE)
	|| t instanceof NodeType.ArrayTypeNode, NodeType.INT_TYPE);

export var unOpMap = _unOpMap;

/*
	Binary Operator Info
*/
var _binOpMap = {};

_binOpMap['+']  = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['-']  = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['*']  = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['/']  = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['%']  = new OpInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_binOpMap['>']  = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['<']  = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['<='] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['>='] = new OpInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);

_binOpMap['=='] = new OpInfo((t) => true, NodeType.BOOL_TYPE);
_binOpMap['!='] = new OpInfo((t) => true, NodeType.BOOL_TYPE);

_binOpMap['&&'] = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_binOpMap['||'] = new OpInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);

export var binOpMap = _binOpMap;