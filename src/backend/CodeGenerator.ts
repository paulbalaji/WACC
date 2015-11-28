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
    insertPrintInt: any;
    insertPrintRef: any;
    insertPrintLn: any;

    insertOverflowError: any;
    insertCheckDivideByZero: any;
    insertRuntimeError: any;

    closingInsertions: any[];
    printNodeLogic: any;

    labelNum: number;

    spSubNum: number; // The number of words to subtract from SP at start of main. spSubNum = 1 means SUB sp, sp, #4 will be inserted.
    spSubCurrent: number;

    programInfo: any; // Containing info about the program, as returned by semantic checker

    constructor(programInfo) {
        this.nextReg = 4;
        this.sections = { header: [], footer: [] };
        this.defineSystemFunctions();
        this.closingInsertions = [];

        this.labelNum = 0;
        this.programInfo = programInfo;

        this.spSubCurrent = 4;

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

        this.insertPrintInt = _.once(() => {
            this.closingInsertions.push(function() {
                var intFormatLabel = this.insertStringDataHeader("%d\\0");
                this.sections.footer.push(CodeGenUtil.funcDefs.printInt(intFormatLabel));
            });
        });

        this.insertPrintRef = _.once(() => {
            this.closingInsertions.push(function() {
                var refFormatLabel = this.insertStringDataHeader('%p\\0');
                this.sections.footer.push(CodeGenUtil.funcDefs.printRef(refFormatLabel));
            });
        });

        this.insertPrintLn = _.once(() => {
            this.closingInsertions.push(function() {
                var terminatorLabel = this.insertStringDataHeader('\\0');
                this.sections.footer.push(CodeGenUtil.funcDefs.printLn(terminatorLabel));
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


        this.printNodeLogic = function(node) {
            var exprInstructions = node.expr.visit(this);

            if (node.expr.type instanceof NodeType.BoolTypeNode) {
                this.insertPrintBool();
                return [exprInstructions, Instr.Bl('p_print_bool')]
            } else if (node.expr.type instanceof NodeType.IntTypeNode) {
                this.insertPrintInt();
                return [exprInstructions, Instr.Bl('p_print_int')]
            } else if (node.expr.type instanceof NodeType.CharTypeNode) {
                return [exprInstructions, Instr.Bl('putchar')]
            } else if (node.expr.type instanceof NodeType.ArrayTypeNode
                        && (<NodeType.ArrayTypeNode> node.expr.type).type instanceof NodeType.CharTypeNode) {
                this.insertPrintString();
                return [exprInstructions, Instr.Bl('p_print_string')];
            } else if (node.expr.type instanceof NodeType.NullTypeNode
                        || node.expr.type instanceof NodeType.PairTypeNode) {
                console.log(exprInstructions);
                this.insertPrintRef();
                return [exprInstructions, Instr.Bl('p_print_reference')];
            } else {
                //please don't forget to remove this Jan
                console.log("UNIMPLEMENTED PRINT: WHAT A NIGHTMARE. LOOK AT THIS TYPE: " + node.expr.type.constructor)
            }

        }

    }

    getNextLabelName() {
        return 'L' + this.labelNum++;
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        var spSubInstr = this.programInfo.declareNodeCount === 0 ? [] : [Instr.Sub(Reg.SP, Reg.SP, Instr.Const(this.programInfo.declareNodeCount * 4))];
       
        var mainStart = [Instr.Directive('text'),
            Instr.Directive('global', 'main'),
            Instr.Label('main'), Instr.Push(Reg.LR), spSubInstr];
        
        var instructionList =
        [
            _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
         ];

        _.map(this.closingInsertions, (closingFunc) => closingFunc.call(this));


        var spAddInstr = [Instr.Add(Reg.SP, Reg.SP, Instr.Const(this.programInfo.declareNodeCount * 4))];
        var mainEnd = [spAddInstr, Instr.Mov(Reg.R0, Instr.Const(0)),
                     Instr.Pop(Reg.PC),
                     _.flatten(SemanticUtil.visitNodeList(node.functionList, this))];

        return Instr.buildList(this.sections.header, mainStart, instructionList, mainEnd, this.sections.footer);

    }
   

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var binOpInstructions;

        switch (node.operator) {
            case '+':
                binOpInstructions = [Instr.modify(Instr.Add(Reg.R0, Reg.R0, Reg.R1), Instr.mods.s),
                                     Instr.modify(Instr.Bl('p_throw_overflow_error'), Instr.mods.vs)];
                this.insertOverflowError();
                break;

            case '-':
                binOpInstructions = [Instr.modify(Instr.Sub(Reg.R0, Reg.R0, Reg.R1), Instr.mods.s),
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
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.gt),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.le)];
                break;

            case '<':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.lt),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.ge)];
                break;

            case '>=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.ge),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.lt)];
                break;

            case '<=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.le),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.gt)];
                break;

            case '==':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.eq),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.ne)];
                break;

            case '!=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(1)), Instr.mods.ne),
                                     Instr.modify(Instr.Mov(Reg.R0, Instr.Const(0)), Instr.mods.eq)];
                break;

            case '&&':
                var label = this.getNextLabelName();
                binOpInstructions = [Instr.Mov(Reg.R0, Instr.Const(1)),
                                     Instr.Cmp(Reg.R0, Instr.Const(0)),
                                     Instr.modify(Instr.B(label), Instr.mods.eq),
                                     Instr.Mov(Reg.R0, Instr.Const(0)),
                                     Instr.Label(label)];
                return binOpInstructions;

            case '||':
                var label = this.getNextLabelName();
                binOpInstructions = [Instr.Mov(Reg.R0, Instr.Const(1)),
                                     Instr.Cmp(Reg.R0, Instr.Const(1)),
                                     Instr.modify(Instr.B(label), Instr.mods.eq),
                                     Instr.Mov(Reg.R0, Instr.Const(0)),
                                     Instr.Label(label)];
                return binOpInstructions;

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

        if (node.ch.length > 1) {
            var ch = node.ch[1];
        } else {
            var ch = node.ch;
        }
        return [Instr.Mov(Reg.R0, Instr.Const('\'' + ch + '\''))]

    }

    visitParamNode(node: NodeType.ParamNode): any {

    }

    visitFreeNode(node: NodeType.FreeNode): any {

    }

    visitPrintNode(node: NodeType.PrintNode): any {
        return this.printNodeLogic(node);

       
    }

    visitPrintlnNode(node: NodeType.PrintlnNode): any {
        var printInstrs = this.printNodeLogic(node);
        this.insertPrintLn();
        return [printInstrs, Instr.Bl('p_print_ln')]

    }

    visitDeclareNode(node: NodeType.DeclareNode): any {
        var rhsInstructions = node.rhs.visit(this); // Leave result of evaluating rhs in r0
        var spConst = Instr.Const((this.programInfo.declareNodeCount * 4) - this.spSubCurrent);

        this.spSubCurrent += 4;
        return [rhsInstructions, Instr.Str(Reg.R0, Instr.Mem(Reg.SP, spConst))];
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
                unOpInstructions = [Instr.modify(Instr.Rsb(Reg.R0, Reg.R0, Instr.Const(0)), Instr.mods.s)];
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
                unOpInstructions = [Instr.modify(Instr.Str(Reg.R0, Instr.Mem(Reg.SP)), Instr.mods.b),
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
        // TO CHECK
        return [Instr.Mov(Reg.R0, Instr.Const(0))];

    }
}
