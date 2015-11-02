var NodeType = require('./NodeType');
var _ = require('underscore');
var SemanticVisitor = (function () {
    function SemanticVisitor() {
        this.errors = [];
        this.ST = {};
        this.ST.table = {};
        this.ST.parent = null;
        this.ST.lookupAll = function (ident) {
            var result = this.table[ident];
            if (result) {
                return result;
            }
            if (this.parent) {
                return this.parent.lookupAll(ident);
            }
            return null;
        };
        this.ST.insert = function (ident, node) {
            // PRE: the key is not already in the map
            this.table[ident] = node;
        };
    }
    SemanticVisitor.prototype.getType = function (obj) {
        return obj.constructor.name;
    };
    SemanticVisitor.prototype.checkSameType = function (obj1, obj2) {
        return this.getType(obj1) === this.getType(obj2) && _.isEqual(obj1, obj2);
    };
    SemanticVisitor.prototype.visitProgramNode = function (node) {
        var _this = this;
        console.log('visiting a program node!');
        _.map(node.functionList, function (functionNode) { return functionNode.visit(_this); });
        _.map(node.statList, function (statNode) { return statNode.visit(_this); });
    };
    SemanticVisitor.prototype.visitFuncNode = function (node) {
        throw 'You fucked up function semantics';
    };
    SemanticVisitor.prototype.visitBinOpExprNode = function (node) {
        var _this = this;
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);
        // REMEMBER however the two expressions must be the SAME type aswell as a required one
        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var ANY_TYPE = undefined;
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }
        opMap['+'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['-'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['*'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['/'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['%'] = new OperatorInfo([INT_TYPE], BOOL_TYPE);
        opMap['>'] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['>='] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['<'] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['<='] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['=='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);
        opMap['!='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);
        opMap['&&'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        opMap['||'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, function (t) { return _this.checkSameType(node.leftOperand.type, t); });
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type on lhs is not valid for the operator');
            }
        }
        // MID: Left type is  correct, check that the rhs type is the same
        if (!this.checkSameType(node.leftOperand.type, node.rightOperand.type)) {
            throw 'Fuck sake, its a binary operator and you should know by now that the types on lhs and rhs should be the same...';
        }
        node.type = opMap[node.operator].returnType;
    };
    SemanticVisitor.prototype.visitStrLiterNode = function (node) {
        node.type = new NodeType.BaseTypeNode('string');
    };
    SemanticVisitor.prototype.visitReturnNode = function (node) { };
    SemanticVisitor.prototype.visitAssignNode = function (node) {
        node.lhs.visit(this);
        node.rhs.visit(this);
        if (!this.checkSameType(node.lhs.type, node.rhs.type)) {
            throw 'AssignNode error lhs and rhs are not the same fucking type.  lhs type is ' + this.getType(node.lhs) + ' . rhs type is ' + this.getType(node.rhs);
        }
    };
    SemanticVisitor.prototype.visitBeginEndBlockNode = function (node) { };
    SemanticVisitor.prototype.visitWhileNode = function (node) { };
    SemanticVisitor.prototype.visitPairTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemSndNode = function (node) { };
    SemanticVisitor.prototype.visitArrayLiterNode = function (node) {
        var _this = this;
        // Visit all expressions
        _.map(node.list, function (expr) { return expr.visit(_this); });
        // All expressions must be the same type
        // Some code here to check that...
        // Now fill in the type
        // TODO - fix below line. Assumes there is an elem in the list, returns null if there is not. ArrayDepth assumed to be 1
        node.type = node.list[0] ? new NodeType.ArrayTypeNode(node.list[0].type, 1) : new NodeType.BaseTypeNode('lol');
    };
    SemanticVisitor.prototype.visitCharLiterNode = function (node) {
    };
    SemanticVisitor.prototype.visitParamNode = function (node) { };
    SemanticVisitor.prototype.visitFreeNode = function (node) { };
    SemanticVisitor.prototype.visitPrintNode = function (node) { };
    SemanticVisitor.prototype.visitDeclareNode = function (node) {
        node.type.visit(this);
        node.ident.visit(this);
        node.rhs.visit(this);
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            throw 'you fucked it - redeclaration';
            return;
        }
        if (!this.checkSameType(node.type, node.rhs.type)) {
            throw 'Absolute nightmare.  Declare node: type of rhs does not match given type';
        }
        this.ST.insert(node.ident, node.type);
    };
    SemanticVisitor.prototype.visitArrayElemNode = function (node) { };
    SemanticVisitor.prototype.visitCallNode = function (node) {
        var _this = this;
        node.ident.visit(this);
        node.argList = _.map(node.argList, function (arg) { return arg.visit(_this); });
        var funcNode = { argList: node.argList, ident: node.ident };
        //compare arguments
        if (node.argList.length === funcNode.argList.length) {
            for (var i = 0; i < node.argList.length; i++) {
                if (!this.checkSameType(node.argList[i], funcNode.argList[i])) {
                    throw 'Come on man, pass the correct arguments ffs';
                }
            }
        }
        else {
            throw 'Learn how to count, get the number of arguments right';
        }
        //compare return types
        if (!this.checkSameType(node.ident, funcNode.ident)) {
            throw 'Is it so hard to return the right fricking things?';
        }
        node.type = node.ident.type;
    };
    SemanticVisitor.prototype.visitPairLiterNode = function (node) {
    };
    SemanticVisitor.prototype.visitIntLiterNode = function (node) {
        node.type = new NodeType.BaseTypeNode('int');
    };
    SemanticVisitor.prototype.visitIdentNode = function (node) {
        node.type = this.ST.lookupAll(node.identStr);
    };
    SemanticVisitor.prototype.visitReadNode = function (node) { };
    SemanticVisitor.prototype.visitPrintlnNode = function (node) { };
    SemanticVisitor.prototype.visitBaseTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemTypeNode = function (node) { };
    SemanticVisitor.prototype.visitUnOpNode = function (node) {
        var _this = this;
        node.expr.visit(this);
        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var STRING_TYPE = new NodeType.BaseTypeNode('string');
        var ANY_TYPE = undefined;
        if (node.expr.type instanceof NodeType.ArrayTypeNode) {
            var ARRAY_TYPE = node.expr.type;
        }
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }
        opMap['!'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        opMap['-'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['len'] = new OperatorInfo([STRING_TYPE, ARRAY_TYPE], INT_TYPE);
        opMap['ord'] = new OperatorInfo([CHAR_TYPE], INT_TYPE);
        opMap['chr'] = new OperatorInfo([INT_TYPE], CHAR_TYPE);
        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, function (t) { return _this.checkSameType(node.expr.type, t); });
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type is not valid for this unary operator');
            }
        }
        node.type = opMap[node.operator].returnType;
    };
    SemanticVisitor.prototype.visitSkipNode = function (node) { };
    SemanticVisitor.prototype.visitExitNode = function (node) { };
    SemanticVisitor.prototype.visitIfNode = function (node) { };
    SemanticVisitor.prototype.visitArrayTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemFstNode = function (node) {
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                throw 'you fucker, ident named ' + res.ident + ' is no pair !!!';
            }
        }
        else {
            throw 'bullshit';
        }
    };
    SemanticVisitor.prototype.visitNewPairNode = function (node) {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);
        // The type of the node is the type of the pair
        node.type = new NodeType.PairTypeNode(node.fstExpr.type, node.sndExpr.type);
    };
    SemanticVisitor.prototype.visitBoolLiterNode = function (node) {
        node.type = new NodeType.BaseTypeNode('bool');
        // There is nothing to check here
    };
    SemanticVisitor.prototype.visitPairElemTypePAIRNode = function (node) {
        //TODO
    };
    return SemanticVisitor;
})();
exports.SemanticVisitor = SemanticVisitor;
