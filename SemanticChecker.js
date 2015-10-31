var _ = require('./node_modules/underscore');
var SemanticVisitor = (function () {
    function SemanticVisitor() {
        this.errors = [];
    }
    SemanticVisitor.prototype.visitProgramNode = function (node) {
        var _this = this;
        _.map(node.functionList, function (functionNode) { return functionNode.visit(_this); });
        _.map(node.statList, function (statNode) { return statNode.visit(_this); });
    };
    SemanticVisitor.prototype.visitBinOpExprNode = function (node) { };
    SemanticVisitor.prototype.visitStrLiterNode = function (node) { };
    SemanticVisitor.prototype.visitReturnNode = function (node) { };
    SemanticVisitor.prototype.visitAssignNode = function (node) { };
    SemanticVisitor.prototype.visitBeginEndBlockNode = function (node) { };
    SemanticVisitor.prototype.visitWhileNode = function (node) { };
    SemanticVisitor.prototype.visitPairTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemSndNode = function (node) { };
    SemanticVisitor.prototype.visitArrayLiterNode = function (node) { };
    SemanticVisitor.prototype.visitCharLiterNode = function (node) { };
    SemanticVisitor.prototype.visitParamNode = function (node) { };
    SemanticVisitor.prototype.visitFreeNode = function (node) { };
    SemanticVisitor.prototype.visitPrintNode = function (node) { };
    SemanticVisitor.prototype.visitDeclareNode = function (node) { };
    SemanticVisitor.prototype.visitArrayElemNode = function (node) { };
    SemanticVisitor.prototype.visitCallNode = function (node) { };
    SemanticVisitor.prototype.visitPairLiterNode = function (node) { };
    SemanticVisitor.prototype.visitIntLiterNode = function (node) { };
    SemanticVisitor.prototype.visitFuncNode = function (node) { };
    SemanticVisitor.prototype.visitIdentNode = function (node) { };
    SemanticVisitor.prototype.visitReadNode = function (node) { };
    SemanticVisitor.prototype.visitPrintlnNode = function (node) { };
    SemanticVisitor.prototype.visitBaseTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemTypeNode = function (node) { };
    SemanticVisitor.prototype.visitUnOpNode = function (node) { };
    SemanticVisitor.prototype.visitSkipNode = function (node) { };
    SemanticVisitor.prototype.visitExitNode = function (node) { };
    SemanticVisitor.prototype.visitIfNode = function (node) { };
    SemanticVisitor.prototype.visitArrayTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemFstNode = function (node) { };
    SemanticVisitor.prototype.visitNewPairNode = function (node) { };
    SemanticVisitor.prototype.visitBoolLiterNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemTypePAIRNode = function (node) { };
    return SemanticVisitor;
})();
