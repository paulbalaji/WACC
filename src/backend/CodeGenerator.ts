import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil')
import Instr = require('./Instruction');
import Reg = require('./Register');
import CodeGenUtil = require('./CodeGenUtil')
var _ = require('underscore');


export class CodeGenerator implements NodeType.Visitor {

    nextReg: number;
    nextMessageLabel: number;
    sections: any;

    insertDataLabel: any;
    insertStringDataHeader: any;
    insertPrintString: any;

    insertOverflowError: any;
    insertRuntimeError: any;

    closingInsertions: any[];

    constructor() {
        this.nextReg = 4;
        this.sections = { header: [], footer: [] };
        this.defineSystemFunctions();
        this.closingInsertions = [];
    }

    defineSystemFunctions() {
        this.insertDataLabel = _.once(function() {
            this.sections.header.push(Instr.Directive('data'));
        })

        this.insertStringDataHeader = function(str: string) {
            var {label: dataLabel, instructions: strDataInstructions} = Instr.genStrDataBlock(str);
            this.sections.header.push(strDataInstructions);
            return dataLabel;
        };

        this.insertPrintString = _.once(() => {
            this.closingInsertions.push(function() {
                var dataLabel = this.insertStringDataHeader('%.*s\\0');
                this.sections.footer.push(CodeGenUtil.funcDefs.printString(dataLabel));
            });
        });

        this.insertOverflowError = _.once(() => {
            this.closingInsertions.push(function() {
                var dataLabel = this.insertStringDataHeader('OverflowError: the result is too small/large to store in a 4-byte signed-integer.\\n');
                this.sections.footer.push(CodeGenUtil.funcDefs.overflowError(dataLabel));
                this.insertRuntimeError();
            });
        });

        this.insertRuntimeError = _.once(() => {
            this.closingInsertions.push(function() {
                this.insertPrintString();
                this.sections.footer.push(CodeGenUtil.funcDefs.runtimeError());
            });
        });
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        var instructionList =
               [Instr.Directive('text'),
                Instr.Directive('global', 'main'),
                Instr.Label('main'),
                Instr.Push(Reg.LR),
                _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
                Instr.Ldr(Reg.R0, Instr.Liter(0)),
                Instr.Pop(Reg.PC),
                Instr.Directive('ltorg'),
                _.flatten(SemanticUtil.visitNodeList(node.functionList, this))];

        _.map(this.closingInsertions, (closingFunc) => closingFunc.call(this));
        return Instr.buildList(this.sections.header, instructionList, this.sections.footer);
    }
   

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var lhsInstructions = node.leftOperand.visit(this);
        var rest = [Instr.Push(Reg.R0),
                    node.rightOperand.visit(this),
                    Instr.Mov(Reg.R1, Reg.R0),
                    Instr.Pop(Reg.R0),
                    Instr.Adds(Reg.R0, Reg.R0, Reg.R1),
                    Instr.Blvs('p_throw_overflow_error')];
        this.insertOverflowError();
        return [lhsInstructions, rest];
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
        var toReturn = [];

        if (SemanticUtil.isType(node.expr.type, NodeType.STRING_TYPE)) {
            var str = '';
            
            if (node.expr instanceof NodeType.StrLiterNode) {
                str = (<NodeType.StrLiterNode>node.expr).str;
            } else {
                str = _.map((<NodeType.ArrayLiterNode>node.expr).exprList, (charNode) => charNode.ch).join('')
            }

            this.insertDataLabel();
            var {label:dataLabel, instructions: strDataInstructions} = Instr.genStrDataBlock(str);
            this.sections.header.push(strDataInstructions);
            this.insertPrintString();

            var spareReg = Reg.R4;
            toReturn = [Instr.Ldr(spareReg, Instr.Liter(dataLabel)),
                        Instr.Mov(Reg.R0, spareReg),
                        Instr.Bl('p_print_string')];
        }
        
        return toReturn;
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
        return [Instr.Ldr(Reg.R0, Instr.Liter(node.num))];
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
        return [];
    }

    visitExitNode(node: NodeType.ExitNode): any {
        return [node.expr.visit(this), Instr.Bl('exit')];
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
