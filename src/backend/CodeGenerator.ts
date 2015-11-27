import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil')
import Instr = require('./Instruction');
import Reg = require('./Register');
var _ = require('underscore');


export class CodeGenerator implements NodeType.Visitor {

    nextReg: number;
    nextMessageLabel: number;

    constructor() {
        this.nextReg = 4;
    }

    insertStringData(str: string) {
    }


     

    visitProgramNode(node: NodeType.ProgramNode): any {
        return Instr.buildList( Instr.Directive('text'),
                          Instr.Directive('global', 'main'),
                          _.flatten(SemanticUtil.visitNodeList(node.functionList, this)),
                          Instr.Label('main'),
                          Instr.Push(Reg.LR),
                          _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
                          Instr.Ldr(Reg.R0, Instr.Const(0)),
                          Instr.Pop(Reg.PC),
                          Instr.Directive('ltorg'));
    }

   

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {

    }
 
    visitStrLiterNode(node: NodeType.StrLiterNode): any {

    }

    visitReturnNode(node: NodeType.ReturnNode): any {

    }

    visitAssignNode(node: NodeType.AssignNode): any {

    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode): any {

    }

    visitWhileNode(node: NodeType.WhileNode): any {

    }

    visitPairTypeNode(node: NodeType.PairTypeNode): any {

    }

    visitArrayLiterNode(node: NodeType.ArrayLiterNode): any {

    }

    visitCharLiterNode(node: NodeType.CharLiterNode): any {

    }

    visitParamNode(node: NodeType.ParamNode): any {

    }

    visitFreeNode(node: NodeType.FreeNode): any {

    }

    visitPrintNode(node: NodeType.PrintNode): any {
        //
        return [Instr.Push(Reg.R0)];
    }

    visitPrintlnNode(node: NodeType.PrintlnNode): any {

    }

    visitDeclareNode(node: NodeType.DeclareNode): any {

    }

    visitArrayElemNode(node: NodeType.ArrayElemNode): any {

    }

    visitCallNode(node: NodeType.CallNode): any {

    }

    visitPairLiterNode(node: NodeType.PairLiterNode): any {

    }

    visitIntLiterNode(node: NodeType.IntLiterNode): any {

    }

    visitFuncNode(node: NodeType.FuncNode): any {
        return Instr.Push(Reg.R0);
    }

    visitIdentNode(node: NodeType.IdentNode): any {

    }

    visitReadNode(node: NodeType.ReadNode): any {

    }

    visitUnOpNode(node: NodeType.UnOpNode): any {

    }

    visitSkipNode(node: NodeType.SkipNode): any {
        // done
        return '';
    }

    visitExitNode(node: NodeType.ExitNode): any {
       
    }

    visitIfNode(node: NodeType.IfNode): any {

    }

    visitArrayTypeNode(node: NodeType.ArrayTypeNode): any {

    }

    visitNewPairNode(node: NodeType.NewPairNode): any {

    }

    visitBoolLiterNode(node: NodeType.BoolLiterNode): any {

    }

    visitPairElemNode(node: NodeType.PairElemNode): any {

    }


    visitIntTypeNode(node: NodeType.IntTypeNode): any {

    }

    visitBoolTypeNode(node: NodeType.BoolTypeNode): any {

    }

    visitCharTypeNode(node: NodeType.CharTypeNode): any {

    }

    visitEmptyArrayTypeNode(node: NodeType.EmptyArrayTypeNode): any {

    }

    visitNullTypeNode(node: NodeType.NullTypeNode): any {

    }

}
