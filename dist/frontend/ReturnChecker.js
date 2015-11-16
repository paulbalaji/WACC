var SemanticUtil = require('./SemanticUtil');
var Error = require("./WACCError");
var _ = require('underscore');
var ReturnVisitor = (function () {
    function ReturnVisitor() {
        // When checking each function, this field is set to valid return type of that function.
        this.expectedReturnType = null;
    }
    // Checks valid returns in all functions and then check for invalid return in global scope.
    ReturnVisitor.prototype.visitProgramNode = function (node) {
        SemanticUtil.visitNodeList(node.functionList, this);
        this.expectedReturnType = null;
        SemanticUtil.visitNodeList(node.statList, this);
        return true;
    };
    /*
        Return node must be of the right type. If expectedReturnType is not set, we are
        are in global scope and visitor throws an error. Otherwise it checks if the
        expected and actual types match.
    */
    ReturnVisitor.prototype.visitReturnNode = function (node) {
        if (this.expectedReturnType === null) {
            throw new Error.SemanticError('Attempted return from global scope.', node.errorLocation);
        }
        if (!SemanticUtil.isType(node.returnExpr.type, this.expectedReturnType)) {
            throw new Error.SemanticError('Incorrect return type. '
                + 'Expecting: ' + this.expectedReturnType + ', '
                + 'Actual: ' + node.returnExpr.type + '.', node.returnExpr.errorLocation);
        }
        return true;
    };
    /*
        BeginEnd block can be an ancestor of valid return statement, so we need to check
        all its children.
    */
    ReturnVisitor.prototype.visitBeginEndBlockNode = function (node) {
        return _.some(SemanticUtil.visitNodeList(node.statList, this));
    };
    // Every function needs to have a return statement with matching type.
    ReturnVisitor.prototype.visitFuncNode = function (node) {
        var _this = this;
        this.expectedReturnType = node.type;
        if (!_.some(_.map(node.statList, function (statNode) { return statNode.visit(_this); }))) {
            //NEED TO THROW SYNTAX ERROR HERE
            throw new Error.SyntaxError('Function "' + node.ident + '" missing return statement.', node.ident.errorLocation);
        }
        return true;
    };
    // Visit node requires that both branches to contain a return statement. 
    ReturnVisitor.prototype.visitIfNode = function (node) {
        var branch1 = _.some(SemanticUtil.visitNodeList(node.trueStatList, this));
        var branch2 = _.some(SemanticUtil.visitNodeList(node.falseStatList, this));
        return branch1 && branch2;
    };
    // Exit node acts as return.
    ReturnVisitor.prototype.visitExitNode = function (node) { return true; };
    /*
        Implementation of other Node visit functions that
        do not return nor they can be an valid ancestor of
        a return node.
    */
    ReturnVisitor.prototype.visitBinOpExprNode = function (node) { return false; };
    ReturnVisitor.prototype.visitStrLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitAssignNode = function (node) { return false; };
    ReturnVisitor.prototype.visitPairTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitArrayLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitCharLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitParamNode = function (node) { return false; };
    ReturnVisitor.prototype.visitFreeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitPrintNode = function (node) { return false; };
    ReturnVisitor.prototype.visitDeclareNode = function (node) { return false; };
    ReturnVisitor.prototype.visitArrayElemNode = function (node) { return false; };
    ReturnVisitor.prototype.visitCallNode = function (node) { return false; };
    ReturnVisitor.prototype.visitPairLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitIntLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitIdentNode = function (node) { return false; };
    ReturnVisitor.prototype.visitReadNode = function (node) { return false; };
    ReturnVisitor.prototype.visitPrintlnNode = function (node) { return false; };
    ReturnVisitor.prototype.visitUnOpNode = function (node) { return false; };
    ReturnVisitor.prototype.visitSkipNode = function (node) { return false; };
    ReturnVisitor.prototype.visitArrayTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitNewPairNode = function (node) { return false; };
    ReturnVisitor.prototype.visitBoolLiterNode = function (node) { return false; };
    ReturnVisitor.prototype.visitPairElemNode = function (node) { return false; };
    /*
        There is no general guarantee that while loop is entered at runtime,
        so even if it contains a return statement, we do not consider it.
    */
    ReturnVisitor.prototype.visitWhileNode = function (node) { return false; };
    ReturnVisitor.prototype.visitIntTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitBoolTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitCharTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitEmptyArrayTypeNode = function (node) { return false; };
    ReturnVisitor.prototype.visitNullTypeNode = function (node) { return false; };
    return ReturnVisitor;
})();
exports.ReturnVisitor = ReturnVisitor;
