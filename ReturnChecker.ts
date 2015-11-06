import NodeType = require('./NodeType');
var _ = require('underscore');
export class ReturnVisitor implements NodeType.Visitor {
	errors = [];
    visitProgramNode(node:NodeType.ProgramNode):boolean {
         _.map(node.functionList, (functionNode:NodeType.Visitable) => functionNode.visit(this));
         if (_.some(_.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this)))) {
             throw ("you fucked hard, you fucktard, global return");
         }
         return true;
    }
    visitBinOpExprNode(node:NodeType.BinOpExprNode):boolean { return false; }
    visitStrLiterNode(node:NodeType.StrLiterNode):boolean { return false; }
    visitReturnNode(node:NodeType.ReturnNode):boolean { return true; }
    visitAssignNode(node:NodeType.AssignNode):boolean {  return false; }
    visitBeginEndBlockNode(node:NodeType.BeginEndBlockNode):boolean {
        return _.some(_.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this)));
    }
    visitWhileNode(node:NodeType.WhileNode):boolean { return false; }
    visitPairTypeNode(node:NodeType.PairTypeNode):boolean {  return false; }
    visitArrayLiterNode(node:NodeType.ArrayLiterNode):boolean {  return false; }
    visitCharLiterNode(node:NodeType.CharLiterNode):boolean {  return false; }
    visitParamNode(node:NodeType.ParamNode):boolean {  return false; }
    visitFreeNode(node:NodeType.FreeNode):boolean {  return false; }
    visitPrintNode(node:NodeType.PrintNode):boolean {  return false; }
    visitDeclareNode(node:NodeType.DeclareNode):boolean {  return false; }
    visitArrayElemNode(node:NodeType.ArrayElemNode):boolean {  return false; }
    visitCallNode(node:NodeType.CallNode):boolean {  return false; }
    visitPairLiterNode(node:NodeType.PairLiterNode):boolean {  return false; }
    visitIntLiterNode(node:NodeType.IntLiterNode):boolean {  return false; }
    visitFuncNode(node:NodeType.FuncNode):boolean {
        if (!_.some(_.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this)))) {
            throw "You lazy bullshit, you need to return from functions.";
        }
        return true;
    }
    visitIdentNode(node:NodeType.IdentNode):boolean {  return false; }
    visitReadNode(node:NodeType.ReadNode):boolean {  return false; }
    visitPrintlnNode(node:NodeType.PrintlnNode):boolean {  return false; }
    // visitBaseTypeNode(node:NodeType.BaseTypeNode):boolean {}
    visitPairElemTypeNode(node:NodeType.PairElemTypeNode):boolean {  return false; }
    visitUnOpNode(node:NodeType.UnOpNode): boolean {  return false; }
    visitSkipNode(node:NodeType.SkipNode): boolean {  return false; }
    visitExitNode(node:NodeType.ExitNode): boolean {  return false; }
    visitIfNode(node:NodeType.IfNode): boolean {
        var branch1 : boolean = _.some(_.map(node.trueStatList, (statNode: NodeType.Visitable) => statNode.visit(this)))
        var branch2 : boolean = _.some(_.map(node.falseStatList, (statNode: NodeType.Visitable) => statNode.visit(this)))
        return branch1 && branch2;
    }
    visitArrayTypeNode(node:NodeType.ArrayTypeNode): boolean {  return false; }

    visitNewPairNode(node:NodeType.NewPairNode): boolean {  return false; }
    visitBoolLiterNode(node:NodeType.BoolLiterNode): boolean {  return false; }
    visitPairElemTypePAIRNode(node:NodeType.PairElemTypePAIRNode): boolean {  return false; }
    visitPairElemNode(node:NodeType.PairElemNode): boolean {  return false; }
    visitIntTypeNode(node:NodeType.IntTypeNode): boolean {  return false; }
    visitBoolTypeNode(node:NodeType.BoolTypeNode): boolean {  return false; }
    visitCharTypeNode(node:NodeType.CharTypeNode): boolean {  return false; }
    visitStringTypeNode(node:NodeType.StringTypeNode): boolean {  return false; }

    visitEmptyArrayTypeNode(node:NodeType.EmptyArrayTypeNode) {  return false; }
    visitNullTypeNode(node:NodeType.NullTypeNode): boolean {  return false; }
}