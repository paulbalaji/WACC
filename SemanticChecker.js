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
        //console.log('visiting a program node!');
        _.map(node.functionList, function (functionNode) { return functionNode.visit(_this); });
        _.map(node.statList, function (statNode) { return statNode.visit(_this); });
    };
    SemanticVisitor.prototype.visitFuncNode = function (node) {
        //throw 'You fucked up function semantics';
    };
    SemanticVisitor.prototype.visitBinOpExprNode = function (node) {
        var _this = this;
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }
        opMap['+'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['-'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['*'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['/'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['%'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.BOOL_TYPE);
        opMap['>'] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['>='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<'] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['=='] = new OperatorInfo([NodeType.ANY_TYPE], NodeType.BOOL_TYPE);
        opMap['!='] = new OperatorInfo([NodeType.ANY_TYPE], NodeType.BOOL_TYPE);
        opMap['&&'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
        opMap['||'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
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
        _.map(node.exprList, function (expr) { return expr.visit(_this); });
        if (_.isEmpty(node.exprList)) {
            // Nothing more to check, just fill in the node type as null
            node.type = null;
        }
        else {
            // Check that all expressions are of the same type
            var type = node.exprList[0].type;
            // Check that all types are equal to type
            // mismatchedTypes is a list of types which do not match the first one in the list
            var mismatchedTypes = _.filter(node.exprList, function (expr) { return !_this.checkSameType(type, expr.type); });
            if (!_.isEmpty(mismatchedTypes)) {
                throw 'Deary deary me.  In an array literal all expressions must be of the same type';
            }
            if (node.exprList[0].type instanceof NodeType.ArrayTypeNode) {
                var n = node.exprList[0].type;
                node.type = new NodeType.ArrayTypeNode(n.type, n.depth + 1);
            }
            else {
                node.type = new NodeType.ArrayTypeNode(node.exprList[0].type, 1);
            }
        }
    };
    SemanticVisitor.prototype.visitCharLiterNode = function (node) {
        node.type = NodeType.CHAR_TYPE;
    };
    SemanticVisitor.prototype.visitParamNode = function (node) {
        node.type.visit(this);
        node.ident.visit(this);
    };
    SemanticVisitor.prototype.visitFreeNode = function (node) { };
    SemanticVisitor.prototype.visitPrintNode = function (node) { };
    SemanticVisitor.prototype.visitDeclareNode = function (node) {
        node.type.visit(this);
        node.rhs.visit(this);
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            throw 'you fucked it - redeclaration';
            return;
        }
        /*
         In the case that rhs is an array liter node, we must consider the case that is empty ([]).
         If it is a list of empty expressions, then it is the rspsonsibility of declare node to fill
         in the type.
         This is because an ArrayLiterNode, [] cannot know its type and so cannot fill it in.

          If you have enjoyed my essay then please leave me a mark out of 10 in the fields below:
          Jan:
          Andrea:
          Paul:
        */
        if (node.rhs instanceof NodeType.ArrayLiterNode) {
            var arrayLiter = node.rhs;
            if (_.isEmpty(arrayLiter.exprList)) {
                arrayLiter.type = node.type;
            }
        }
        if (!this.checkSameType(node.type, node.rhs.type)) {
            throw 'Absolute nightmare.  Declare node: type of rhs does not match given type';
        }
        this.ST.insert(node.ident, node.type);
        node.ident.visit(this);
    };
    SemanticVisitor.prototype.visitArrayElemNode = function (node) {
        var _this = this;
        _.map(node.exprList, function (exprNode) { return exprNode.visit(_this); });
        node.ident.visit(this);
        // Check if every index is an integer
        console.log("Hi");
        if (!_.every(node.exprList, function (exprNode) { return _this.checkSameType(exprNode.type, NodeType.INT_TYPE); })) {
            throw "List indices must be integers mate. I know you are trying hard, but you should be more careful in the future.";
        }
        var res = this.ST.lookupAll(node.ident);
        if (!res) {
            throw 'Mate, fucking declare your arrays before you use them.';
        }
        console.log(res);
        if (!(res instanceof NodeType.ArrayTypeNode)) {
            throw "Mate, you are trying to index something which is not an array. have you been drinking?";
        }
        if (!(res.depth != node.exprList.length)) {
            throw "Mate, its hard imagining objects in many dimensions, you have probably failed.";
        }
        node.type = res.type;
    };
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
        var res = this.ST.lookupAll(node.identStr);
        if (!res) {
            throw 'Ident Node semantic error - the ident of ' + node + ' could not be found';
        }
        node.type = res;
    };
    SemanticVisitor.prototype.visitReadNode = function (node) { };
    SemanticVisitor.prototype.visitPrintlnNode = function (node) { };
    SemanticVisitor.prototype.visitBaseTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemTypeNode = function (node) { };
    SemanticVisitor.prototype.visitUnOpNode = function (node) {
        var _this = this;
        node.expr.visit(this);
        if (node.expr.type instanceof NodeType.ArrayTypeNode) {
            var ARRAY_TYPE = node.expr.type;
        }
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }
        opMap['!'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
        opMap['-'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['len'] = new OperatorInfo([NodeType.STRING_TYPE, ARRAY_TYPE], NodeType.INT_TYPE);
        opMap['ord'] = new OperatorInfo([NodeType.CHAR_TYPE], NodeType.INT_TYPE);
        opMap['chr'] = new OperatorInfo([NodeType.INT_TYPE], NodeType.CHAR_TYPE);
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
    SemanticVisitor.prototype.visitSkipNode = function (node) {
        //don't need to do anything for this
    };
    SemanticVisitor.prototype.visitExitNode = function (node) {
        node.expr.visit(this);
        if (!this.checkSameType(node.expr.type, NodeType.INT_TYPE)) {
            throw "WHERE'S THE EXIT NUMBERS MAAAAAN";
        }
    };
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
