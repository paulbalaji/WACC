import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil')

var _ = require('underscore');

export class CodeGenerator implements NodeType.Visitor {

    Section = { DATA: 'dataHeader', FUNC: 'functionHeader' };

    nextReg: number;
    nextMessageLabel: number;

    generatedCode: {dataHeader: string[], functionHeader: string[], main: string[]};

    constructor() {
        this.nextReg = 4;

        this.generatedCode = { dataHeader: [], functionHeader: [], main: [] };
    }

    insertStringData(str: string) {
        if (this.generatedCode.dataHeader.length === 0) {
            this.addLabel('.data', this.Section.DATA);
        }

        this.addLabel('msg_' + this.nextMessageLabel++ + ':', this.Section.DATA);
        this.addCode('.word ' + str.length);
        this.addCode('.ascii ' + str);
    }

    addLabel(label: string, section?: string) {
        section = section || 'main';
        this.generatedCode[section].push(label + '\n');
    }

    addCode(str: string, section?: string) {
        section = section || 'main';
        this.generatedCode[section].push('\t' + str + '\n');
    }

    joinEverything() {
        return _.map(this.generatedCode, (code) => code.join('')).join('\n');
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        this.addLabel('.text');
        this.addLabel('.global main');

        SemanticUtil.visitNodeList(node.functionList, this);

        this.addLabel('main:');
        this.addCode('PUSH {lr}');

        SemanticUtil.visitNodeList(node.statList, this);

        this.addCode('LDR r0, =0');
        this.addCode('POP {pc}');
        this.addCode('.ltorg');

        return this.joinEverything();
    }

    getNextReg() {
        return 'r' + this.nextReg++;
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

    }

    visitIdentNode(node: NodeType.IdentNode): any {

    }

    visitReadNode(node: NodeType.ReadNode): any {

    }

    visitPrintlnNode(node: NodeType.PrintlnNode): any {

    }

    visitUnOpNode(node: NodeType.UnOpNode): any {

    }

    visitSkipNode(node: NodeType.SkipNode): any {
        // done
        return '';
    }

    visitExitNode(node: NodeType.ExitNode): any {
        var reg = this.getNextReg();
        this.addCode('LDR ' + reg + ', =' + (<NodeType.IntLiterNode>node.expr).num)
        this.addCode('MOV r0, ' + reg);
        this.addCode('BL exit');
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
