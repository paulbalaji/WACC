import NodeType = require('./NodeType');
import WACCError = 
var _ = require('underscore');

export class SemanticVisitor implements NodeType.Visitor {
    errors: any[];

    constructor() {
        this.errors = [];
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
    visitAssignNode(node: NodeType.AssignNode):void {}
    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode):void {}
    visitWhileNode(node: NodeType.WhileNode):void {}
    visitPairTypeNode(node: NodeType.PairTypeNode):void {}
    visitPairElemSndNode(node: NodeType.PairElemSndNode):void {}
    visitArrayLiterNode(node: NodeType.ArrayLiterNode):void {}
    visitCharLiterNode(node: NodeType.CharLiterNode):void {}
    visitParamNode(node: NodeType.ParamNode):void {}
    visitFreeNode(node: NodeType.FreeNode):void {}
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {}
    visitArrayElemNode(node: NodeType.ArrayElemNode):void {}
    visitCallNode(node: NodeType.CallNode):void {}
    visitPairLiterNode(node: NodeType.PairLiterNode):void {}
    visitIntLiterNode(node: NodeType.IntLiterNode):void {}

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
    visitPairElemFstNode(node: NodeType.PairElemFstNode): void {}
    visitNewPairNode(node: NodeType.NewPairNode): void {}
    visitBoolLiterNode(node: NodeType.BoolLiterNode): void {}

    visitPairElemTypePAIRNode(node: NodeType.PairElemTypePAIRNode): void {}
}