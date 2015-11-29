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

    insertReadInt: any;
    insertReadChar: any;

    insertPrintString: any;
    insertPrintBool: any;
    insertPrintInt: any;
    insertPrintRef: any;
    insertPrintLn: any;

    insertOverflowError: any;
    insertCheckDivideByZero: any;
    insertCheckArrayBounds: any;
    insertFreePair: any;
    insertRuntimeError: any;

    closingInsertions: any[];
    printNodeLogic: any;

    spSubNum: number; // The number of words to subtract from SP at start of main. spSubNum = 1 means SUB sp, sp, #4 will be inserted.
    spSubCurrent: number;

    programInfo: any; // Contains info about the program, as returned by semantic checker

    stackMap: any; // Maps ident strings to corresponding stack locations

    currentST: SemanticUtil.SymbolTable;

    getNextLabelName: any; 

    constructor(programInfo) {
        this.nextReg = 4;
        this.sections = { header: [], userFuncs: [], footer: [] };
        this.defineSystemFunctions();
        this.closingInsertions = [];

        this.programInfo = programInfo;

        this.spSubCurrent = 4;

        this.stackMap = {};

        this.getNextLabelName = (function() {
            var labelNum = 0;
            return function() {
                return 'L' + labelNum++;
            }
        })();
    }

    pushWithIncrement(...pushArgs) { // Increments currentST stack offset and returns the push instruction
        this.currentST.stackOffset += pushArgs.length;
        return Instr.Push.apply(this, pushArgs);
    }

    popWithDecrement(...popArgs) { // Decrements currentST stack offset and returns the push instruction
        this.currentST.stackOffset -= popArgs.length;
        return Instr.Pop.apply(this, popArgs);
    }

    enterNewScope(st) {
        this.currentST = st;
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

        this.insertReadInt = _.once(() => {
            this.closingInsertions.push(function() {
                var intFormatLabel = this.insertStringDataHeader("%d\\0");
                this.sections.footer.push(CodeGenUtil.funcDefs.readInt(intFormatLabel));
            });
        });

        this.insertReadChar = _.once(() => {
            this.closingInsertions.push(function() {
                var charFormatLabel = this.insertStringDataHeader(" %c\\0");
                this.sections.footer.push(CodeGenUtil.funcDefs.readChar(charFormatLabel));
            });
        });

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
                //this.insertPrintInt();
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
                this.insertRuntimeError();
            });
        });

        this.insertCheckDivideByZero = _.once( () => {
            this.closingInsertions.push(function() {
                var message = 'DivideByZeroError: divide or modulo by zero\\n\\0';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.checkDivideByZero(dataLabel));
                this.insertRuntimeError();
            });
        });

        this.insertCheckArrayBounds = _.once(() => {
            this.closingInsertions.push(function() {
                var negMessage = 'ArrayIndexOutOfBoundsError: negative index\\n\\0';
                var negLabel = this.insertStringDataHeader(negMessage);
                var largeMessage = 'ArrayIndexOutOfBoundsError: index too large\\n\\0';
                var largeLabel = this.insertStringDataHeader(largeMessage);
                this.sections.footer.push(CodeGenUtil.funcDefs.checkArrayBounds(negLabel, largeLabel));
                this.insertRuntimeError();
            });
        });

        this.insertFreePair = _.once(() => {
            this.closingInsertions.push(function() {
                var message = 'NullReferenceError: dereference a null reference\\n\\0';
                var dataLabel = this.insertStringDataHeader(message);
                this.sections.footer.push(CodeGenUtil.funcDefs.freePair(dataLabel));
                this.insertRuntimeError();
            });
        });

        this.insertRuntimeError = _.once(() => {
            this.closingInsertions.push(function() {
                this.sections.footer.push(CodeGenUtil.funcDefs.runtimeError());
                this.insertPrintString();
            });
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
                // The case for printing a string (array of chars)
                this.insertPrintString();
                return [exprInstructions, Instr.Bl('p_print_string')];
            } else if (node.expr.type instanceof NodeType.ArrayTypeNode || node.expr.type instanceof NodeType.NullTypeNode
                        || node.expr.type instanceof NodeType.PairTypeNode) {
                this.insertPrintRef();
                return [exprInstructions, Instr.Bl('p_print_reference')];
            } else {
                //please don't forget to remove this Jan
                console.log("UNIMPLEMENTED PRINT: WHAT A NIGHTMARE. LOOK AT THIS TYPE: " + node.expr.type.constructor)
            }
        }

    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        this.currentST = node.st;
        var byteSize = node.st.totalByteSize;

       
        /* Visit the functions - does not insert any code in main,
           but will cause an insertion in this.sections.userFuncs later.
           This is why we just need to visit the function nodes.
        */
        SemanticUtil.visitNodeList(node.functionList, this);


        var instructionList = [
            _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
        ];

        (function() {
            for (var i = 0; i < this.closingInsertions.length; i++) {
                this.closingInsertions[i].call(this);
            }
        }).call(this);
         // this.closingInsertions.map((closingFunc) => {console.log(this.closingInsertions.length); closingFunc.call(this)
    
        var mainStart = [Instr.Directive('text'),
            Instr.Directive('global', 'main')];
        var mainLabelInit = [Instr.Label('main'), Instr.Push(Reg.LR)];
        var mainEnd = [Instr.Mov(Reg.R0, Instr.Const(0)),
            Instr.Pop(Reg.PC)];
        return Instr.buildList(this.sections.header, mainStart, this.sections.userFuncs, mainLabelInit, this.scopedInstructions(byteSize, instructionList), mainEnd, this.sections.footer);
    }

    visitFuncNode(node: NodeType.FuncNode): any {
        this.currentST = node.st;
        var statListInstructions = [_.flatten(SemanticUtil.visitNodeList(node.statList, this))];
        var funcInstructions = [Instr.Label('f_' + node.ident.toString()),
                                Instr.Push(Reg.LR),
                                statListInstructions,
                                Instr.Pop(Reg.PC),
                                Instr.Directive('ltorg')
                               ];

        this.sections.userFuncs.push(funcInstructions);
        this.currentST = node.st.parent;
        return [];
    }

   
    scopedInstructions(byteSize, instructions) {
        /* Given the byteSize for the current scope,
           generate instructions for manipulating Reg.SP appopriately. */
       
        if (byteSize === 0) {
            return instructions;
        } else {
            return [Instr.Sub(Reg.SP, Reg.SP, Instr.Const(byteSize)),
                instructions,
                Instr.Add(Reg.SP, Reg.SP, Instr.Const(byteSize))];
        }
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var binOpInstructions;

        var lhsInstructions = node.leftOperand.visit(this);

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
                var rhsInstructions = node.rightOperand.visit(this);
                binOpInstructions = [lhsInstructions,
                                     Instr.Cmp(Reg.R0, Instr.Const(0)),
                                     Instr.modify(Instr.B(label), Instr.mods.eq),
                                     rhsInstructions,
                                     Instr.Label(label)];
                return binOpInstructions;

            case '||':
                var label = this.getNextLabelName();
                var rhsInstructions = node.rightOperand.visit(this);
                binOpInstructions = [lhsInstructions,
                                     Instr.Cmp(Reg.R0, Instr.Const(1)),
                                     Instr.modify(Instr.B(label), Instr.mods.eq),
                                     rhsInstructions,
                                     Instr.Label(label)];
                return binOpInstructions;

        }

        var rest = [this.pushWithIncrement(Reg.R0),
                    node.rightOperand.visit(this),
                    Instr.Mov(Reg.R1, Reg.R0),
                    this.popWithDecrement(Reg.R0),
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
        var returnExprInstructions = node.returnExpr.visit(this);
        return [returnExprInstructions];    
    }

    visitAssignNode(node: NodeType.AssignNode): any {
        var rhsIns = node.rhs.visit(this);
        var strInstruction = (SemanticUtil.isType(node.lhs.type, NodeType.BOOL_TYPE, NodeType.CHAR_TYPE)) ? (arg1, arg2) => Instr.modify(Instr.Str(arg1, arg2), Instr.mods.b) : Instr.Str;

        if (node.lhs instanceof NodeType.IdentNode) {

            return [rhsIns, strInstruction(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(<NodeType.IdentNode>node.lhs))))];

        } else if (node.lhs instanceof NodeType.ArrayElemNode) {
            this.insertCheckArrayBounds();
            var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode(node.lhs.type);

            var findAddress = function(step) {
                return [
                    Instr.Bl('p_check_array_bounds'),
                    Instr.Add(Reg.R4, Reg.R4, Instr.Const(4)),
                    step == 4 ? Instr.Add(Reg.R4, Reg.R4, Reg.R0, Instr.Lsl(2)) : Instr.Add(Reg.R4, Reg.R4, Reg.R0)
                ];
            }
            var indexExprs = (<NodeType.ArrayElemNode>node.lhs).exprList;
            var instructions = [
                rhsIns,
                this.pushWithIncrement(Reg.R0, Reg.R4),
                Instr.Ldr(Reg.R4, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset((<NodeType.ArrayElemNode>node.lhs).ident)))),
            ]
            for (var i = 0; i < indexExprs.length - 1; i++) {
                instructions.push(indexExprs[i].visit(this));
                instructions.push(findAddress(4));
                instructions.push(Instr.Ldr(Reg.R4, Instr.Mem(Reg.R4)))
            }

            instructions.push([
                indexExprs[indexExprs.length - 1].visit(this),
                findAddress(elemByteSize),
                Instr.Mov(Reg.R1, Reg.R4),
                this.popWithDecrement(Reg.R0, Reg.R4),
                strInstruction(Reg.R0, Instr.Mem(Reg.R1))
            ]);



            return instructions;

        }

    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode): any {
        this.currentST = node.st;
        var instrs = SemanticUtil.visitNodeList(node.statList, this);
        this.currentST = node.st.parent;
        return this.scopedInstructions(node.st.totalByteSize, instrs);
    }

    visitWhileNode(node: NodeType.WhileNode): any {
        var bodyLabel = this.getNextLabelName();
        var exprLabel = this.getNextLabelName();
        this.currentST = node.st;
        var body = this.scopedInstructions(node.st.totalByteSize, SemanticUtil.visitNodeList(node.loopBody, this));
        this.currentST = node.st.parent;
        var expr = node.predicateExpr.visit(this);
        return [Instr.B(exprLabel),
                Instr.Label(bodyLabel),
                body,
                Instr.Label(exprLabel),
                expr,
                Instr.Cmp(Reg.R0, Instr.Const(1)),
                Instr.modify(Instr.B(bodyLabel), Instr.mods.eq)];
    }

    visitPairTypeNode(node: NodeType.PairTypeNode): any {

    }

    visitArrayLiterNode(node: NodeType.ArrayLiterNode): any {
        var instrList = [];
        var arrayLength = node.exprList ? node.exprList.length : 0;
        var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode((<NodeType.ArrayTypeNode>node.type).type);

        // add 4 in front to store the array length
        var offset = 4;

        var size = offset + arrayLength * elemByteSize;
        
        instrList.push(Instr.Mov(Reg.R0, Instr.Const(size)),
                       Instr.Bl('malloc'),
                       Instr.Mov(Reg.R3, Reg.R0));

        if (elemByteSize === 4) {
            for (var i = 1; i <= arrayLength; i++) {
                instrList.push(node.exprList[i - 1].visit(this),
                               Instr.Str(Reg.R0, Instr.Mem(Reg.R3, Instr.Const(i * elemByteSize))));
            }
        } else {
            for (var i = 0; i < arrayLength; i++) {
                instrList.push(node.exprList[i].visit(this),
                               Instr.modify(Instr.Str(Reg.R0, Instr.Mem(Reg.R3, Instr.Const(offset + i))),
                                            Instr.mods.b));
            }
        }

        instrList.push(Instr.Mov(Reg.R0, Instr.Const(arrayLength)),
                       Instr.Str(Reg.R0, Instr.Mem(Reg.R3)),
                       Instr.Mov(Reg.R0, Reg.R3));

        return instrList;
    }

    visitCharLiterNode(node: NodeType.CharLiterNode): any {
        var ch = node.ch.length > 1 ? node.ch[1] : node.ch;
        var cst;
        if (ch === '0') {
            cst = Instr.Const(ch);
        } else {
            cst = Instr.Const('\'' + ch + '\''); 
        }
        return [Instr.Mov(Reg.R0, cst)];
    }

    visitParamNode(node: NodeType.ParamNode): any {

    }

    visitFreeNode(node: NodeType.FreeNode): any {
        var instrList = [node.expr.visit(this)];
        var freeText = 'free';

        if (node.expr instanceof NodeType.PairTypeNode) {
            freeText = 'p_free_pair';
            this.insertFreePair();
        }

        return [node.expr.visit(this), Instr.Bl(freeText)];
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
        this.currentST.seenIdents.push(node.ident);
        var rhsInstructions = node.rhs.visit(this); // Leave result of evaluating rhs in r0
        var spOffset = this.currentST.totalByteSize - this.currentST.byteSizes.shift(); // Pops from front of byte sizes
        
        // Decide whether to use a Strb instruction or just a str, depending on the type of the node
        var strInstruction = (SemanticUtil.isType(node.type, NodeType.BOOL_TYPE, NodeType.CHAR_TYPE)) ? (arg1, arg2) => Instr.modify(Instr.Str(arg1, arg2), Instr.mods.b) : Instr.Str;
        
        return [rhsInstructions,
                strInstruction(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(spOffset)))];
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode): any {
        // int[] x = a[0]
        var instrList = [];
        instrList.push(node.ident.visit(this));

        if (!node.exprList) {
            // if asking for the entire array, just return what you get from visiting the ident
            return instrList;
        }

        var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode(node.type);

        instrList.push(this.pushWithIncrement(Reg.R4),
                       Instr.Mov(Reg.R4, Reg.R0));

        for (var i = 0; i < node.exprList.length; i++) {
            this.insertCheckArrayBounds();
            instrList.push(node.exprList[i].visit(this),
                           Instr.Bl('p_check_array_bounds'),
                           Instr.Add(Reg.R4, Reg.R4, Instr.Const(elemByteSize)),
                           Instr.Add(Reg.R4, Reg.R4, Reg.R0, Instr.Lsl(2)),
                           Instr.Ldr(Reg.R4, Instr.Mem(Reg.R4)));
        }

        instrList.push(Instr.Mov(Reg.R0, Reg.R4),
                       this.popWithDecrement(Reg.R4));

        return instrList;
    }

    visitCallNode(node: NodeType.CallNode): any {
        // if no parameters, simply just call Bl 'f_'+node.ident.identStr
        // leaves result in R0

        var functionCall = Instr.Bl('f_' + node.ident.identStr)
        
        if (!node.argList) {
            return [functionCall];
        }

        

    }

    visitPairLiterNode(node: NodeType.PairLiterNode): any {
        return node.type.visit(this);   
    }

    visitIntLiterNode(node: NodeType.IntLiterNode): any {
        return [Instr.Ldr(Reg.R0, Instr.Liter(node.num))];
    }

    visitIdentNode(node: NodeType.IdentNode): any {
        var ldrInstruction = (SemanticUtil.isType(node.type, NodeType.BOOL_TYPE, NodeType.CHAR_TYPE)) ? (arg1, arg2) => Instr.modify(Instr.Ldr(arg1, arg2), Instr.mods.sb) : Instr.Ldr;
        return [ldrInstruction(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(node))))]; 
    }

    visitReadNode(node: NodeType.ReadNode): any {
        var readInstruction;
        if (node.readTarget.type instanceof NodeType.IntTypeNode) {
            readInstruction = [Instr.Bl('p_read_int')];
            this.insertReadInt();
        } else if (node.readTarget.type instanceof NodeType.CharTypeNode) {
            readInstruction = [Instr.Bl('p_read_char')];
            this.insertReadChar();
        }
        if (node.readTarget instanceof NodeType.IdentNode) {
            return [Instr.Add(Reg.R0, Reg.SP, Instr.Const(this.currentST.lookUpOffset(<NodeType.IdentNode>node.readTarget))), readInstruction];

        }
        return []

    }

    visitUnOpNode(node: NodeType.UnOpNode): any {
        var unOpInstructions;

        switch (node.operator) {
            case '-':
                unOpInstructions = [Instr.modify(Instr.Rsb(Reg.R0, Reg.R0, Instr.Const(0)), Instr.mods.s),
                                    Instr.modify(Instr.Bl('p_throw_overflow_error'), Instr.mods.vs)];
                this.insertOverflowError();
                break;
            case '!':
                unOpInstructions = [Instr.Eor(Reg.R0, Reg.R0, Instr.Const(1))];
                break;
            case 'ord':
                unOpInstructions = []
                break;
            case 'chr':
                unOpInstructions = [];
                break;
            case 'len':
                unOpInstructions = [Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0))];
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


        var falseLabel = this.getNextLabelName(),
            afterLabel = this.getNextLabelName();

        var exprInstructions = node.predicateExpr.visit(this);
        var parentST = this.currentST;

        var cmpInstructions = [Instr.Cmp(Reg.R0, Instr.Const(0)), Instr.modify(Instr.B(falseLabel), Instr.mods.eq)];
        this.currentST = node.trueSt;
        var trueInstructions = this.scopedInstructions(node.trueSt.totalByteSize, SemanticUtil.visitNodeList(node.trueStatList, this));
        
        this.currentST = node.falseSt;
        var falseInstructions = this.scopedInstructions(node.falseSt.totalByteSize, SemanticUtil.visitNodeList(node.falseStatList, this));
    
        this.currentST = parentST;
        return [exprInstructions, cmpInstructions, trueInstructions, Instr.B(afterLabel), Instr.Label(falseLabel), falseInstructions, Instr.Label(afterLabel)];
    }

    visitArrayTypeNode(node: NodeType.ArrayTypeNode): any {

    }


    visitNewPairNode(node: NodeType.NewPairNode): any {
        var fstExprInstruction = node.fstExpr.visit(this);
        var sndExprInstruction = node.sndExpr.visit(this);

        var pairFooter = [Instr.Mov(Reg.R0, Instr.Const(8)),
                          Instr.Bl('malloc'),
                          this.popWithDecrement(Reg.R1, Reg.R2),
                          Instr.Str(Reg.R2, Instr.Mem(Reg.R0)),
                          Instr.Str(Reg.R1, Instr.Mem(Reg.R0, Instr.Const(4)))];
        return [fstExprInstruction,
                CodeGenUtil.funcDefs.allocPairElem(node.fstExpr.type), 
                sndExprInstruction, 
                CodeGenUtil.funcDefs.allocPairElem(node.sndExpr.type),
                pairFooter];
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
