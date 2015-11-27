import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil')

var _ = require('underscore');


export class CodeGenerator implements NodeType.Visitor {

    nextReg: number;
    nextMessageLabel: number;

    constructor() {
        this.nextReg = 4;
    }

    insertStringData(str: string) {
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
        return BuildList( Directive('text'),
                          Directive('global', 'main'),
                          _.flatten(SemanticUtil.visitNodeList(node.functionList, this)),
                          Label('main'),
                          Push(Reg.LR),
                          _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
                          Ldr(Reg.R0, Const(0)),
                          Pop(Reg.PC),
                          Directive('ltorg'));
    }

    getNextReg() {
        return 'r' + this.nextReg++;
    }

    createPrintStringFunction() {
        this.insertStringData('%.*s\0');

        var addSys = (addFunc) => _.partial(addFunc, _, this.Section.SYS_FUNC);
        addSys(this.addLabel)('p_print_string')
        addSys(this.addCode)('PUSH {lr}')
        this.addLabel('p_print_string:', this.Section.SYS_FUNC);
        _.map( ['PUSH {lr}',
                'LDR r1, [r0]',
                'ADD r2, r0, #4',
                'LDR r0, =msg_1',
                'ADD r0, r0, #4',
                'BL printf',
                'MOV r0, #0',
                'BL fflush',
                'POP {pc}'],
                _.partial(addSys(this.addCode)))

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
