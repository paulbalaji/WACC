import NodeType = require('./NodeType');

var _ = require('underscore');

export class SemanticVisitor implements NodeType.Visitor {
    errors: any[];
    ST: any;


    constructor() {
        this.errors = [];
        this.ST = {};
        this.ST.table = {};
        this.ST.parent = null;
        this.ST.lookupAll = function (ident : string) : NodeType.DeclareNode {
            var result = this.table[ident];
            if (result) {
                return result;
            }
            if (this.parent) {
                return this.parent.lookupAll(ident);
            }
            return null;
        }

        this.ST.insert = function (ident : string, node: NodeType.DeclareNode):void {
            // PRE: the key is not already in the map
            this.table[ident] = node;
        }
    }

	visitProgramNode(node:NodeType.ProgramNode):void {
        console.log('visiting a program node!');
		_.map(node.functionList, (functionNode:NodeType.Visitable) => functionNode.visit(this));
		_.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this));
	}

    visitFuncNode(node:NodeType.FuncNode) {
        this.errors.push({ msg: 'You fucked up function semantics' });
    }

	visitBinOpExprNode(node: NodeType.BinOpExprNode):void {}
    visitStrLiterNode(node: NodeType.StrLiterNode):void {}
    visitReturnNode(node: NodeType.ReturnNode):void {}
    visitAssignNode(node: NodeType.AssignNode):void {
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

    }
    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode):void {}
    visitWhileNode(node: NodeType.WhileNode):void {}
    visitPairTypeNode(node: NodeType.PairTypeNode):void {}
    visitPairElemSndNode(node: NodeType.PairElemSndNode):void {}
    visitArrayLiterNode(node: NodeType.ArrayLiterNode):void {}
    visitCharLiterNode(node: NodeType.CharLiterNode):void {}
    visitParamNode(node: NodeType.ParamNode):void {}
    visitFreeNode(node: NodeType.FreeNode):void {}
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {
        node.type.visit(this);
        node.ident.visit(this);
        node.rhs.visit(this);

        var res = this.ST.lookupAll(node.ident);
        if (res) {
            this.errors.push("you fucked it - redeclaration")
            return;
        }
        this.ST.insert(node.ident, node);
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode):void {}
    visitCallNode(node: NodeType.CallNode):void {}
    visitPairLiterNode(node: NodeType.PairLiterNode):void {}
    visitIntLiterNode(node: NodeType.IntLiterNode):void {
        node.type = new IntTypeNode();
    }

    visitIdentNode(node: NodeType.IdentNode):void {}

    visitReadNode(node: NodeType.ReadNode):void {}
    visitPrintlnNode(node: NodeType.PrintlnNode):void {}
    visitBaseTypeNode(node: NodeType.BaseTypeNode):void {}
    visitPairElemTypeNode(node: NodeType.PairElemTypeNode):void {}
    visitUnOpNode(node: NodeType.UnOpNode): void {}
    visitSkipNode(node: NodeType.SkipNode): void {}
    visitExitNode(node: NodeType.ExitNode): void {}
    visitIfNode(node: NodeType.IfNode): void {}
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): void {}
    visitPairElemFstNode(node: NodeType.PairElemFstNode): void {
        var res : NodeType.DeclareNode = this.ST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                this.errors.push("you fucker, ident named " + res.ident + " is no pair !!!")
            } 

        } else { 
            this.errors.push('bullshit');
        }
    }
    visitNewPairNode(node: NodeType.NewPairNode): void {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);
    }
    visitBoolLiterNode(node: NodeType.BoolLiterNode): void {
        node.type = new BoolTypeNode();
        // There is nothing to check here
    }

    visitPairElemTypePAIRNode(node: NodeType.PairElemTypePAIRNode): void {
        //TODO
    }
}