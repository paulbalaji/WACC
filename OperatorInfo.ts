import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');


/*
	Function used to generator the info object that each operator maps to.
	Contains the possibleTypes that the operator works on and the return type of the operator
*/

function OperatorInfo(isPermittedType, returnType) {
        this.isPermittedType = isPermittedType;
        this.returnType = returnType;
}
/*
	Unary Operator Info
*/
var _unOpMap = {};

export var unOpMap = _unOpMap;

/*
	Binary Operator Info
*/
var isType = SemanticUtil.isType;

var _binOpMap = {};

_binOpMap['+']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['-']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['*']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['/']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['%']  = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_binOpMap['>']  = new OperatorInfo((t) => SemanticUtil.isType(t, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);
_binOpMap['>='] = new OperatorInfo((t) => SemanticUtil.isType(t, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);
_binOpMap['<']  = new OperatorInfo((t) => SemanticUtil.isType(t, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);
_binOpMap['<='] = new OperatorInfo((t) => SemanticUtil.isType(t, [NodeType.INT_TYPE, NodeType.CHAR_TYPE]), NodeType.BOOL_TYPE);

_binOpMap['=='] = new OperatorInfo((t) => true, NodeType.BOOL_TYPE);
_binOpMap['!='] = new OperatorInfo((t) => true, NodeType.BOOL_TYPE);

_binOpMap['&&'] = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.BOOL_TYPE), NodeType.BOOL_TYPE);
_binOpMap['||'] = new OperatorInfo((t) => SemanticUtil.isType(t, NodeType.BOOL_TYPE), NodeType.BOOL_TYPE);

export var binOpMap = _binOpMap;


