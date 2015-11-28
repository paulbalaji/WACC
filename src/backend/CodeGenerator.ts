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
    insertPrintBool: any;

    insertOverflowError: any;
    insertCheckDivideByZero: any;
    insertRuntimeError: any;
    

    closingInsertions: any[];

    spSubNum: number; // The number of words to subtract from SP at start of main. spSubNum = 1 means SUB sp, sp, #4 will be inserted.
    spSubCurrent: number;
    constructor() {
        this.nextReg = 4;
        this.sections = { header: [], footer: [] };
        this.defineSystemFunctions();
        this.closingInsertions = [];


        this.spSubNum = 0;
        this.spSubCurrent = 0;

    }

    defineSystemFunctions() {
        this.insertDataLabel = _.once(function() {
            this.sections.header.push(Instr.Directive('data'));
        })

        this.insertStringDataHeader = function(str: string) {
            this.insertDataLabel();
            var {label: dataLabel, instructions: strDataInstructions} = Instr.genStrDataBlock(str.length - str.split("\\").length + 1, str);
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

        this.insertPrintBool = _.once(() => {
            this.closingInsertions.push(function() {
                var trueLabel = this.insertStringDataHeader("true\\0");
                var falseLabel = this.insertStringDataHeader("false\\0");
                this.sections.footer.push(CodeGenUtil.funcDefs.printBool(trueLabel, falseLabel));
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

        this.insertCheckDivideByZero = _.once( () => {
            this.closingInsertions.push(function() {
                var message = 'DivideByZeroError: divide or modulo by zero\\n\\0';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.checkDivideByZero(dataLabel));
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
        var mainStart = [Instr.Directive('text'),
                     Instr.Directive('global', 'main'),
                     Instr.Label('main'), Instr.Push(Reg.LR)];
            var instructionList =
            [
                _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
                Instr.Mov(Reg.R0, Instr.Const(0)),
                Instr.Pop(Reg.PC),
                _.flatten(SemanticUtil.visitNodeList(node.functionList, this))];

        _.map(this.closingInsertions, (closingFunc) => closingFunc.call(this));

        var spSubInstr = this.spSubNum === 0 ? [] : [Instr.Sub(Reg.SP, Reg.SP, Instr.Const(this.spSubNum))];
        return Instr.buildList(this.sections.header, mainStart, spSubInstr, instructionList, this.sections.footer);
    }
   

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var binOpInstructions;

        switch (node.operator) {
            case '+':
                binOpInstructions = [Instr.Adds(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Bl('p_throw_overflow_error'), Instr.mods.vs)];
                this.insertOverflowError();
                break;

            case '-':
                binOpInstructions = [Instr.Subs(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Bl('p_throw_overflow_error'), Instr.mods.vs)];
                this.insertOverflowError();
                break;

            case '*':
                binOpInstructions = [Instr.Smull(Reg.R0, Reg.R1, Reg.R0, Reg.R1),
                                     Instr.Cmp(Reg.R1, Reg.R0, Instr.Asr(31)),
                                     Instr.modify(Instr.Bl('p_throw_overflow_error'), Instr.mods.ne)];
                this.insertOverflowError();
                break;

            case '/':
                binOpInstructions = [Instr.Bl('p_check_divide_by_zero'),
                                     Instr.Bl('__aeabi_idiv')];
                this.insertCheckDivideByZero();
                break;

            case '%':
                binOpInstructions = [Instr.Bl('p_check_divide_by_zero'),
                                     Instr.Bl('__aeabi_idivmod'),
                                     Instr.Mov(Reg.R0, Reg.R1)];
                this.insertCheckDivideByZero();
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
        return '\'' + node.ch + '\'';
    }

    visitParamNode(node: NodeType.ParamNode): any {

    }

    visitFreeNode(node: NodeType.FreeNode): any {

    }

    visitPrintNode(node: NodeType.PrintNode): any {
        var exprInstructions = node.expr.visit(this);
        if (node.expr.type instanceof NodeType.BoolTypeNode) {
            this.insertPrintBool();
            return [exprInstructions, Instr.Bl('p_print_bool')]
        } else {
            this.insertPrintString();
            return [exprInstructions, Instr.Bl('p_print_string')];
        }
       
    }

    visitPrintlnNode(node: NodeType.PrintlnNode): any {

    }

    visitDeclareNode(node: NodeType.DeclareNode): any {
        console.log("hi" + node.rhs);
        var rhsInstructions = node.rhs.visit(this); // Leave result of evaluating rhs in r0
        this.spSubNum += 4;

        return [rhsInstructions, Instr.Str(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(4)))];
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
        var unOpInstructions;

        switch (node.operator) {
            case '-':
                unOpInstructions = [Instr.Rsbs(Reg.R0, Reg.R0, Instr.Const(0))];
                break;
            case '!':
                unOpInstructions = [Instr.Eor(Reg.R0, Reg.R0, Instr.Const(1))];
                break;
            case 'ord':
                var character = node.expr.visit(this);
                unOpInstructions = [Instr.Mov(Reg.R0, Instr.Const(character)),
                                    Instr.Str(Reg.R0, Instr.Mem(Reg.SP)),
                                    Instr.Add(Reg.SP, Reg.SP, Instr.Const(4))];
                break;
            case 'chr':
                unOpInstructions = [Instr.Strb(Reg.R0, Instr.Mem(Reg.SP)),
                                    Instr.Add(Reg.SP, Reg.SP, Instr.Const(1))];
                break;
            case 'len':
                break;
        }

        var exprInstructions = node.expr.visit(this);
        return [exprInstructions, unOpInstructions];

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
        return [Instr.Mov(Reg.R0, node.bool ? Instr.Const(1) : Instr.Const(0))];

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
