var constants = require('./constants');
var NodeType = require('./NodeType');
var SemanticUtil = require('./SemanticUtil');
var Error = require("./WACCError");
var ReturnChecker = require('./ReturnChecker');
var OperatorInfo = require('./OperatorInfo');
var _ = require('underscore');
var SemanticVisitor = (function () {
    function SemanticVisitor() {
        this.errors = [];
        // Creating functions symbol table
        this.functionST = new SemanticUtil.SymbolTable(null);
        // Creating the root symbol table
        this.currentST = new SemanticUtil.SymbolTable(null);
    }
    SemanticVisitor.prototype.setCurrentScope = function (newCurrentST) {
        this.currentST = newCurrentST;
    };
    SemanticVisitor.prototype.enterNewScope = function () {
        this.setCurrentScope(new SemanticUtil.SymbolTable(this.currentST));
    };
    SemanticVisitor.prototype.switchToParentScope = function () {
        this.setCurrentScope(this.currentST.parent);
    };
    SemanticVisitor.prototype.visitProgramNode = function (node) {
        /*
            Partially visit all the functionNodes inserting their idents into the symbol table,
            and returning the rest of the visit as callback functions.
        */
        var visitFuncNodeCallbacks = SemanticUtil.visitNodeList(node.functionList, this);
        // Finish the visiting of all the function nodes.
        _.map(visitFuncNodeCallbacks, function (f) { return f(); });
        // Visit all the statments in the global program scope.
        SemanticUtil.visitNodeList(node.statList, this);
        // Execute return visitor to check for valid (and invalid) returns.
        var returnVisitor = new ReturnChecker.ReturnVisitor();
        node.visit(returnVisitor);
    };
    SemanticVisitor.prototype.visitFuncNode = function (node) {
        var _this = this;
        // Check for redefinition of the function.
        if (this.functionST.lookupAll(node.ident)) {
            var message = '';
            throw new Error.SemanticError('Illegally attempted to declare a previously declared function'
                + ' "' + node.ident + '".', node.ident.errorLocation);
        }
        // Insert function ident into the function lookup table.
        this.functionST.insert(node.ident, { type: node.type, node: node });
        node.ident.type = node.type;
        /*
            Return the rest of visiting method as a function to be called once the rest of the functions
            have been inserted into the lookup table.
        */
        return function () {
            _this.enterNewScope();
            SemanticUtil.visitNodeList(node.paramList, _this);
            SemanticUtil.visitNodeList(node.statList, _this);
            _this.switchToParentScope();
        };
    };
    SemanticVisitor.prototype.visitBinOpExprNode = function (node) {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);
        var opInfo = OperatorInfo.binOpMap[node.operator];
        if (!opInfo.isPermittedType(node.leftOperand.type)) {
            throw new Error.SemanticError('Left operand of "' + node.operator + '" must be of the correct type.', node.leftOperand.errorLocation);
        }
        // MID: Left type is correct, check that the rhs type is the same
        if (!SemanticUtil.isType(node.leftOperand.type, node.rightOperand.type)) {
            throw new Error.SemanticError('Right operand of "' + node.operator + '" must be of the correct type.', node.leftOperand.errorLocation);
        }
        node.type = opInfo.returnType;
    };
    SemanticVisitor.prototype.visitStrLiterNode = function (node) {
        node.type = NodeType.STRING_TYPE;
    };
    SemanticVisitor.prototype.visitReturnNode = function (node) {
        node.returnExpr.visit(this);
    };
    SemanticVisitor.prototype.visitAssignNode = function (node) {
        node.lhs.visit(this);
        node.rhs.visit(this);
        if (!SemanticUtil.isType(node.lhs.type, node.rhs.type)) {
            throw new Error.SemanticError('Assignment must be of correct type.  '
                + 'Expecting: ' + node.lhs.type + ', '
                + 'Actual: ' + node.rhs.type + '.', node.rhs.errorLocation);
        }
    };
    SemanticVisitor.prototype.visitBeginEndBlockNode = function (node) {
        this.enterNewScope();
        SemanticUtil.visitNodeList(node.statList, this);
        this.switchToParentScope();
    };
    SemanticVisitor.prototype.visitWhileNode = function (node) {
        node.predicateExpr.visit(this);
        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw new Error.SemanticError('Invalid while loop condition.  '
                + 'Expecting: ' + 'BOOL' + ', '
                + 'Actual: ' + node.predicateExpr.type + '.', node.predicateExpr.errorLocation);
        }
        this.enterNewScope();
        SemanticUtil.visitNodeList(node.loopBody, this);
        this.switchToParentScope();
    };
    SemanticVisitor.prototype.visitArrayLiterNode = function (node) {
        // Visit all expressions
        SemanticUtil.visitNodeList(node.exprList, this);
        if (_.isEmpty(node.exprList)) {
            // The case that the list is empty            
            node.type = NodeType.EMPTY_ARRAY_TYPE;
        }
        else {
            // The case that the list is not empty
            // Check that all expressions are of the same type
            var type = node.exprList[0].type;
            // mismatchedTypes is a list of types which do not match the first one in the list
            var mismatchedTypes = _.filter(node.exprList, function (expr) { return !SemanticUtil.isType(type, expr.type); });
            // check if all are same type
            if (!_.isEmpty(mismatchedTypes)) {
                throw new Error.SemanticError('Array Literal types must all be the same.', node.errorLocation);
            }
            if (node.exprList[0].type instanceof NodeType.ArrayTypeNode) {
                // consider if it's a nested array
                var n = node.exprList[0].type;
                node.type = new NodeType.ArrayTypeNode(n.type, n.depth + 1);
            }
            else {
                // not nested array
                node.type = new NodeType.ArrayTypeNode(node.exprList[0].type, 1);
            }
        }
    };
    SemanticVisitor.prototype.visitCharLiterNode = function (node) {
        node.type = NodeType.CHAR_TYPE;
    };
    SemanticVisitor.prototype.visitParamNode = function (node) {
        node.type.visit(this);
        this.currentST.insert(node.ident, { type: node.type, node: node });
        node.ident.visit(this);
    };
    SemanticVisitor.prototype.visitFreeNode = function (node) {
        node.expr.visit(this);
        if (node.expr instanceof NodeType.IdentNode) {
            var exprType = this.currentST.lookupAll(node.expr).type;
            if (!(exprType instanceof NodeType.ArrayTypeNode || exprType instanceof NodeType.PairTypeNode)) {
                throw new Error.SemanticError('Free statement must be given an array type or pair type.', node.expr.errorLocation);
            }
        }
        else {
            throw new Error.SemanticError('Free statement must be given a variable.', node.expr.errorLocation);
        }
    };
    SemanticVisitor.prototype.visitDeclareNode = function (node) {
        node.type.visit(this);
        node.rhs.visit(this);
        var res = this.currentST.lookup(node.ident);
        if (res && !(res.node instanceof NodeType.ParamNode)) {
            throw new Error.SemanticError('Redeclaration of variable "' + node.ident + '".', node.ident.errorLocation);
        }
        /*
         In the case that rhs is an array liter node, we must consider the case that is empty ([]).
         If it is a list of empty expressions, then it is the responsibility of declare node to fill
         in the type.
         This is because an ArrayLiterNode, [] cannot know its type and so cannot fill it in.
        */
        if (node.rhs instanceof NodeType.ArrayLiterNode) {
            var arrayLiter = node.rhs;
            if (_.isEmpty(arrayLiter.exprList)) {
                arrayLiter.type = node.type;
            }
        }
        if (!SemanticUtil.isType(node.type, node.rhs.type)) {
            throw new Error.SemanticError('Declaration expression must be of correct type.  '
                + 'Expecting: ' + node.type + ', '
                + 'Actual: ' + node.rhs.type + '.', node.rhs.errorLocation);
        }
        this.currentST.insert(node.ident, { type: node.type, node: node });
    };
    SemanticVisitor.prototype.visitArrayElemNode = function (node) {
        SemanticUtil.visitNodeList(node.exprList, this);
        node.ident.visit(this);
        // Check if every index is an integer
        if (!_.every(node.exprList, function (exprNode) { return SemanticUtil.isType(exprNode.type, NodeType.INT_TYPE); })) {
            throw new Error.SemanticError('Array index must be of type INT.', node.exprList[0].errorLocation);
        }
        var res = this.currentST.lookupAll(node.ident);
        if (!(res.type instanceof NodeType.ArrayTypeNode)) {
            throw new Error.SemanticError('Cannot access index of a non array type variable "' + node.ident + '".', node.type.errorLocation);
        }
        /*
            can be considered as:
                res.type.depth - node.exprList.length > 0

            The case when we are not accessing the full depth of the array
            
            e.g.
                int[][][] y = ....;
                y[0] = ....;

                here y[0] will have same base type as y's base type (ie int)
                but y[0]'s type's depth will be the (depth of y's type) - (the #indices referred)
                ie. depth(y) = 3, #indices = 1 (since y[0] only looks at the first nested array)
                hence y[0]'s type's depth will be 2, as expected
        */
        if (res.type.depth > node.exprList.length) {
            node.type = new NodeType.ArrayTypeNode(res.type.type, res.type.depth - node.exprList.length);
        }
        else {
            node.type = res.type.type;
        }
    };
    SemanticVisitor.prototype.visitCallNode = function (node) {
        SemanticUtil.visitNodeList(node.argList, this);
        var res = this.functionST.lookupAll(node.ident);
        if (!res) {
            throw new Error.SemanticError('Attempted to call undeclared function named "' + node.ident + '".', node.ident.errorLocation);
        }
        var funcNode = res.node;
        // Compare arguments
        if (node.argList.length === funcNode.paramList.length) {
            _.forEach(_.zip(node.argList, funcNode.paramList), function (nodes, i) {
                if (!SemanticUtil.isType(nodes[0].type, nodes[1].type)) {
                    throw new Error.SemanticError('Provided function arguments do not match the function declaration.', node.argList[i].errorLocation);
                }
            });
        }
        else {
            throw new Error.SemanticError('Invalid argument count when calling function named ' + node.ident + '.  '
                + 'Expecting ' + funcNode.paramList.length + ' arguments ' + ', '
                + 'given ' + node.argList.length + ' arguments.', node.argList[0].errorLocation);
        }
        // Type of call node is return type of the function being called
        node.type = res.type;
    };
    SemanticVisitor.prototype.visitPairLiterNode = function (node) {
        node.type = NodeType.NULL_TYPE;
    };
    SemanticVisitor.prototype.visitIntLiterNode = function (node) {
        node.type = NodeType.INT_TYPE;
        if (node.num > constants.WACC_MAX_INT) {
            throw new Error.SyntaxError('Int literal "' + node.num + '" exceeds max int.', node.errorLocation);
        }
        if (node.num < constants.WACC_MIN_INT) {
            throw new Error.SyntaxError('Int literal "' + node.num + '" is smaller than min int.', node.errorLocation);
        }
    };
    SemanticVisitor.prototype.visitIdentNode = function (node) {
        var res = this.currentST.lookupAll(node);
        if (!res) {
            var suggestion = SemanticUtil.getIdentSpellingSuggestion(node, this.currentST);
            throw new Error.SemanticError('Variable named "' + node + '" could not be found.\n'
                + 'Perhaps you meant \'' + suggestion + '\'', node.errorLocation);
        }
        node.type = res.type;
    };
    SemanticVisitor.prototype.visitReadNode = function (node) {
        var target = node.readTarget;
        target.visit(this);
        // Check it is possible to record into target
        if (!SemanticUtil.isReadableType(target.type)) {
            throw new Error.SemanticError('Cannot read into expression of type ' + node.readTarget.type + '. '
                + 'Expecting: INT, CHAR.', node.readTarget.errorLocation);
        }
    };
    SemanticVisitor.prototype.visitPrintlnNode = function (node) {
        node.expr.visit(this);
    };
    SemanticVisitor.prototype.visitPrintNode = function (node) {
        node.expr.visit(this);
    };
    SemanticVisitor.prototype.visitUnOpNode = function (node) {
        node.expr.visit(this);
        // Attempt to match the left operands type with an allowed type
        if (!OperatorInfo.unOpMap[node.operator].isPermittedType(node.expr.type)) {
            throw new Error.SemanticError('Unary operator "' + node.operator + '" '
                + 'given invalid expression of type ' + node.expr.type + '.', node.expr.errorLocation);
        }
        node.type = OperatorInfo.unOpMap[node.operator].returnType;
    };
    SemanticVisitor.prototype.visitExitNode = function (node) {
        node.expr.visit(this);
        if (!SemanticUtil.isType(node.expr.type, NodeType.INT_TYPE)) {
            throw new Error.SemanticError('Exit statement given expression of incorrect type.'
                + 'Expecting: ' + 'INT' + ', '
                + 'Actual: ' + node.expr.type + '.', node.expr.errorLocation);
        }
    };
    SemanticVisitor.prototype.visitIfNode = function (node) {
        node.predicateExpr.visit(this);
        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw new Error.SemanticError('Invalid if statement condition.  '
                + 'Expecting: ' + 'BOOL' + ', '
                + 'Actual: ' + node.predicateExpr.type + '.', node.predicateExpr.errorLocation);
        }
        // scope for the true branch
        this.enterNewScope();
        SemanticUtil.visitNodeList(node.trueStatList, this);
        this.switchToParentScope();
        // same parent but different scope for the false branch
        this.enterNewScope();
        SemanticUtil.visitNodeList(node.falseStatList, this);
        this.switchToParentScope();
    };
    SemanticVisitor.prototype.visitPairElemNode = function (node) {
        node.ident.visit(this);
        var res = this.currentST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                throw new Error.SemanticError('Given variable must be of type pair. '
                    + 'Expecting: ' + 'PAIR' + ', '
                    + 'Actual: ' + res.type + '.', node.type.errorLocation);
            }
        }
        if (node.index === 0) {
            // pair.fst
            node.type = res.type.type1;
        }
        else {
            // pair.snd
            node.type = res.type.type2;
        }
    };
    SemanticVisitor.prototype.visitNewPairNode = function (node) {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);
        // The type of the node is the type of the pair
        node.type = new NodeType.PairTypeNode(node.fstExpr.type, node.sndExpr.type);
    };
    SemanticVisitor.prototype.visitBoolLiterNode = function (node) {
        node.type = NodeType.BOOL_TYPE;
    };
    SemanticVisitor.prototype.visitSkipNode = function (node) { };
    SemanticVisitor.prototype.visitPairTypeNode = function (node) { };
    SemanticVisitor.prototype.visitArrayTypeNode = function (node) { };
    SemanticVisitor.prototype.visitIntTypeNode = function (node) { };
    SemanticVisitor.prototype.visitBoolTypeNode = function (node) { };
    SemanticVisitor.prototype.visitCharTypeNode = function (node) { };
    SemanticVisitor.prototype.visitEmptyArrayTypeNode = function (node) { };
    SemanticVisitor.prototype.visitNullTypeNode = function (node) { };
    return SemanticVisitor;
})();
exports.SemanticVisitor = SemanticVisitor;
