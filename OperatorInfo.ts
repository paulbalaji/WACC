import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');

/*
    Function from SemanticUtil to avoid repeated typing of SemanticUtil
*/
var isType = SemanticUtil.isType;

/*
	Function used to generator the info object that each operator maps to.
	Contains the possibleTypes that the operator works on and the return type of the operator
*/
function OperatorInfo(types, returnType) {
    this.isPermittedType = types instanceof Function ? types : _.partial(isType, _, types);
    this.returnType = returnType;
}

/*
	Unary Operator Info
*/
var _unOpMap = {};

_unOpMap['-'] = new OperatorInfo(NodeType.INT_TYPE, NodeType.INT_TYPE);
_unOpMap['!'] = new OperatorInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_unOpMap['ord'] = new OperatorInfo(NodeType.CHAR_TYPE, NodeType.INT_TYPE);
_unOpMap['chr'] = new OperatorInfo(NodeType.INT_TYPE, NodeType.CHAR_TYPE);
_unOpMap['len'] = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.STRING_TYPE) || t instanceof NodeType.ArrayTypeNode, NodeType.INT_TYPE);

export var unOpMap = _unOpMap;

/*
	Binary Operator Info
*/
var _binOpMap = {};

_binOpMap['+']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['-']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['*']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['/']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['%']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['>']  = new OperatorInfo((t) => SemanticUtil.isType(t, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);
_binOpMap['>='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
_binOpMap['<']  = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);
_binOpMap['<='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);

_binOpMap['=='] = new OperatorInfo((t) => true, NodeType.BOOL_TYPE);
_binOpMap['!='] = new OperatorInfo((t) => true, NodeType.BOOL_TYPE);

_binOpMap['&&'] = new OperatorInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);
_binOpMap['||'] = new OperatorInfo(NodeType.BOOL_TYPE, NodeType.BOOL_TYPE);

export var binOpMap = _binOpMap;

