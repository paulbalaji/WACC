import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');

function OperatorInfo(isPermittedType, returnType) {
    this.isPermittedType = isPermittedType;
    this.returnType = returnType;
}

var _unOpMap = {};
var isType = SemanticUtil.isType;
_unOpMap['-'] = new OperatorInfo((t) => isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
_unOpMap['!'] = new OperatorInfo((t) => isType(t, NodeType.BOOL_TYPE), NodeType.BOOL_TYPE);
_unOpMap['ord'] = new OperatorInfo((t) => isType(t, NodeType.CHAR_TYPE), NodeType.INT_TYPE);
_unOpMap['chr'] = new OperatorInfo((t) => isType(t, NodeType.INT_TYPE), NodeType.CHAR_TYPE);
_unOpMap['len'] = new OperatorInfo((t) => isType(t, NodeType.STRING_TYPE) || t instanceof NodeType.ArrayTypeNode, NodeType.INT_TYPE);


export var unOpMap = _unOpMap;