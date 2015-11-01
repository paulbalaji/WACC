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
    SemanticVisitor.prototype.visitProgramNode = function (node) {
        var _this = this;
        console.log('visiting a program node!');
        _.map(node.functionList, function (functionNode) { return functionNode.visit(_this); });
        _.map(node.statList, function (statNode) { return statNode.visit(_this); });
    };
    SemanticVisitor.prototype.visitFuncNode = function (node) {
        this.errors.push({ msg: 'You fucked up function semantics' });
    };
    SemanticVisitor.prototype.visitBinOpExprNode = function (node) { };
    SemanticVisitor.prototype.visitStrLiterNode = function (node) { };
    SemanticVisitor.prototype.visitReturnNode = function (node) { };
    SemanticVisitor.prototype.visitAssignNode = function (node) {
        node.lhs.visit(this);
        node.rhs.visit(this);
        if (!checkSameType(node.lhs.type, node.rhs.type)) {
            this.errors.push('AssignNode error lhs and rhs are not the same fucking type.  lhs type is ' + getType(node.lhs) + ' . rhs type is ' + getType(node.rhs));
        }
        function getType(obj) {
            return obj.constructor.name;
        }
        function checkSameType(obj1, obj2) {
            return getType(obj1) === getType(obj2);
        }
    };
    SemanticVisitor.prototype.visitBeginEndBlockNode = function (node) { };
    SemanticVisitor.prototype.visitWhileNode = function (node) { };
    SemanticVisitor.prototype.visitPairTypeNode = function (node) { };
    SemanticVisitor.prototype.visitPairElemSndNode = function (node) { };
    SemanticVisitor.prototype.visitArrayLiterNode = function (node) { };
    SemanticVisitor.prototype.visitCharLiterNode = function (node) { };
    SemanticVisitor.prototype.visitParamNode = function (node) { };
    SemanticVisitor.prototype.visitFreeNode = function (node) { };
    SemanticVisitor.prototype.visitPrintNode = function (node) { };
    SemanticVisitor.prototype.visitDeclareNode = function (node) {
        node.type.visit(this);
        node.ident.visit(this);
        node.rhs.visit(this);
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            this.errors.push("you fucked it - redeclaration");
            return;
        }
        this.ST.insert(node.ident, node);
    };
    SemanticVisitor.prototype.visitArrayElemNode = function (node) { };
    SemanticVisitor.prototype.visitCallNode = function (node) { };
    SemanticVisitor.prototype.visitPairLiterNode = function (node) { };
    SemanticVisitor.prototype.visitIntLiterNode = function (node) {
    };
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
    SemanticVisitor.prototype.visitPairElemFstNode = function (node) {
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                this.errors.push("you fucker, ident named " + res.ident + " is no pair !!!");
            }
        }
        else {
            this.errors.push('bullshit');
        }
    };
    SemanticVisitor.prototype.visitNewPairNode = function (node) {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);
    };
    SemanticVisitor.prototype.visitBoolLiterNode = function (node) {
        // There is nothing to check here
    };
    SemanticVisitor.prototype.visitPairElemTypePAIRNode = function (node) {
        //TODO
    };
    return SemanticVisitor;
})();
exports.SemanticVisitor = SemanticVisitor;
