import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil')
import Instr = require('./Instruction');
import Reg = require('./Register');
var _ = require('underscore');


export class CodeGenerator implements NodeType.Visitor {

    nextReg: number;
    nextMessageLabel: number;
    sections: any;


    constructor() {
        this.nextReg = 4;

        this.sections = { header: [], footer: [] };
    }

    insertStringData(str: string) {
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        return Instr.buildList(this.sections.header, Instr.Directive('text'),
               Instr.Directive('global', 'main'),
               Instr.Label('main'),
               Instr.Push(Reg.LR),
               _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
               Instr.Ldr(Reg.R0, Instr.Const(0)),
               Instr.Pop(Reg.PC),
               Instr.Directive('ltorg'),
               _.flatten(SemanticUtil.visitNodeList(node.functionList, this)),
               this.sections.footer);
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
        //making msg
        //putting message in spare reg
        //moving from reg to r0
        //BL p_print_string
        var toReturn = [];

        if (SemanticUtil.isType(node.expr.type, NodeType.STRING_TYPE)) {
            var str = '';
            if (node.expr instanceof NodeType.StrLiterNode) {
                str = (<NodeType.StrLiterNode>node.expr).str;
            } else {
                str = _.map((<NodeType.ArrayLiterNode>node.expr).exprList, (charNode) => charNode.ch).join('')
            }

            var {label:dataLabel, instructions: strDataInstructions} = Instr.genStringDataBlock(str);
            this.sections.header.push(strDataInstructions);

            var spareReg = Reg.R4;
            toReturn = [Instr.Ldr(spareReg, Instr.LabelRef(dataLabel)),
                        Instr.Mov(Reg.R0, spareReg),
                        Instr.Bl('p_print_string')];
        }

        // LDR r4, =msg_0
        // 15        MOV r0, r4
        // 16        BL p_print_string
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
