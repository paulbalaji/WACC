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
    insertDivideByZeroError: any;
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
            this.insertDataLabel();
            var {label: dataLabel, instructions: strDataInstructions} = Instr.genStrDataBlock(str.length - 1, str);
            this.sections.header.push(strDataInstructions);
            return dataLabel;
        };

        this.insertPrintString = _.once(() => {
            this.closingInsertions.push(function() {
                var message = '%.*s\\0';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.printString(dataLabel));
            });
        });

        this.insertOverflowError = _.once(() => {
            this.closingInsertions.push(function() {
                var message = 'OverflowError: the result is too small/large to store in a 4-byte signed-integer.\\n';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.overflowError(dataLabel));
            });
            this.insertRuntimeError();
        });

        this.insertDivideByZeroError = _.once( () => {
            this.closingInsertions.push(function() {
                var message = 'DivideByZeroError: divide or modulo by zero\\n\\0';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.divideByZeroError(dataLabel));
            });
            this.insertRuntimeError();
        });

        this.insertRuntimeError = _.once(() => {
            this.closingInsertions.push(function() {
                this.sections.footer.push(CodeGenUtil.funcDefs.runtimeError());
            });
            this.insertPrintString();
        });


    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        var instructionList =
               [Instr.Directive('text'),
                Instr.Directive('global', 'main'),
                Instr.Label('main'),
                Instr.Push(Reg.LR),
                _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
                Instr.Mov(Reg.R0, Instr.Const(0)),
                Instr.Pop(Reg.PC),
                _.flatten(SemanticUtil.visitNodeList(node.functionList, this))];

        _.map(this.closingInsertions, (closingFunc) => closingFunc.call(this));
        return Instr.buildList(this.sections.header, instructionList, this.sections.footer);
    }
   

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var binOpInstructions;

        switch (node.operator) {
            case '+':
                binOpInstructions = [Instr.Adds(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.Blvs('p_throw_overflow_error')];
                this.insertOverflowError();
                break;

            case '-':
                binOpInstructions = [Instr.Subs(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.Blvs('p_throw_overflow_error')];
                this.insertOverflowError();
                break;

            case '*':
                binOpInstructions = [Instr.Smull(Reg.R0, Reg.R1, Reg.R0, Reg.R1),
                                     Instr.Cmp(Reg.R1, Reg.R0, Instr.Asr(31)),
                                     Instr.Blne('p_throw_overflow_error')];
                this.insertOverflowError();
                break;

            case '/':
                break;

            case '%':
                break;

            case '>':
                break;

            case '<':
                break;

            case '<=':
                break;

            case '>=':
                break;

            case '==':
                break;

            case '!=':
                break;

            case '&&':
                break;

            case '||':
                break;

        }

        var lhsInstructions = node.leftOperand.visit(this);
        var rest = [Instr.Push(Reg.R0),
                    node.rightOperand.visit(this),
                    Instr.Mov(Reg.R1, Reg.R0),
                    Instr.Pop(Reg.R0),
                    binOpInstructions];
        
        return [lhsInstructions, rest];
    }
 
    visitStrLiterNode(node: NodeType.StrLiterNode): any {
        this.insertDataLabel();
        var {label: dataLabel, instructions: strDataInstructions} = Instr.genStrDataBlock(node.actualStrLength, node.str);
        this.sections.header.push(strDataInstructions);
       
        return [Instr.Ldr(Reg.R0, Instr.Liter(dataLabel))];
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
        var exprInstructions = node.expr.visit(this);
        this.insertPrintString();
        return [exprInstructions, Instr.Bl('p_print_string')];       
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
        // skip does nothing, so return empty list
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
