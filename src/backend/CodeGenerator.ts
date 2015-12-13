import NodeType = require('../frontend/NodeType');
import SemanticUtil = require('../frontend/SemanticUtil');

import Const = require('../frontend/constants');

import Instr = require('./Instruction');
import Reg = require('./Register');
import CodeGenUtil = require('./CodeGenUtil');
import Macros = require('./Macros');

var _ = require('underscore');
var util = require('util');

export class CodeGenerator implements NodeType.Visitor {

    userFuncs: any;
    identOffset: any;

    currentST: SemanticUtil.SymbolTable;
    structST: SemanticUtil.SymbolTable;
    functionST: SemanticUtil.SymbolTable;

    getNextLabelName: any; 
    printNodeLogic: any;

    startOfStack: number;
    startOfHeap: number;

    constructor() {
        this.userFuncs = [];
        this.identOffset = 0;
        this.getNextLabelName = CodeGenUtil.counterWithStrPrefix('L', 0);

        this.startOfStack = Const.startOfStack;
        this.startOfHeap = Const.startOfHeap;
    }

    pushWithIncrement(...pushArgs) { // Increments currentST stack offset and returns the push instruction
        this.currentST.stackOffset += pushArgs.length;
        return Instr.Push.apply(this, pushArgs);
    }

    popWithDecrement(...popArgs) { // Decrements currentST stack offset and returns the push instruction
        this.currentST.stackOffset -= popArgs.length;
        return Instr.Pop.apply(this, popArgs);
    }

    insertMallocInstruction() {
        Macros.insertMalloc();
        return [Instr.Bl('malloc')];
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        this.currentST = node.st;
        this.structST = node.structST;
        this.functionST = node.functionST;

        /* Visit the functions - does not insert any code in main,
           but will cause an insertion in this.userFuncs later.
           This is why we just need to visit the function nodes.
        */
        SemanticUtil.visitNodeList(node.functionList, this);

        var instructionList = [
            _.flatten(SemanticUtil.visitNodeList(node.statList, this)),
        ];

        var {dataSection: dataSection, sysFuncSection: sysFuncSection} = Macros.runClosingInsertions(); // Run closing insertions on sections.

        var barebonesStackInit;
        if (Const.barebones) {
            barebonesStackInit = [Instr.Ldr(Reg.SP, Instr.Liter(this.startOfStack)),
                                Instr.Ldr(Reg.R5, Instr.Liter(this.startOfHeap + 4)),
                                Instr.Ldr(Reg.R6, Instr.Liter(this.startOfHeap)),
                                Instr.Str(Reg.R5, Instr.Mem(Reg.R6))];
        } else {
            barebonesStackInit = [];

        }


        
        var mainStart = [Instr.Directive('text'),
            Instr.Directive('global', 'main')];
        var mainLabelInit = [Instr.Label('main'),
                             barebonesStackInit,
                             this.pushWithIncrement(Reg.LR)];
        var mainEnd = [Instr.Mov(Reg.R0, Instr.Const(0)),
            this.popWithDecrement(Reg.PC)];

        var byteSize = node.st.totalByteSize;

        return Instr.buildList(dataSection, mainStart, mainLabelInit,
               this.scopedInstructions(byteSize, instructionList), mainEnd, this.userFuncs, sysFuncSection);
    }

    visitFuncNode(node: NodeType.FuncNode): any {
        this.currentST = node.st;

        var statListInstructions = [_.flatten(SemanticUtil.visitNodeList(node.statList, this))];
        var labelInstruction = [Instr.Label('f_' + node.ident.toString()), this.pushWithIncrement(Reg.LR)];
        var funcInstructions = [statListInstructions];
        var endFuncInstructions = [Instr.Directive('ltorg')];

        var totalByteSize = this.currentST.totalByteSize;                       
        var scopeSub = totalByteSize === 0 ? [] : Instr.Sub(Reg.SP, Reg.SP, Instr.Const(totalByteSize));

        this.userFuncs.push([labelInstruction, scopeSub, funcInstructions, endFuncInstructions]);
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
                    instructions, Instr.Add(Reg.SP, Reg.SP, Instr.Const(byteSize))];
        }
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode): any {
        var binOpInstructions;
        var lhsInstructions = node.leftOperand.visit(this);

        switch (node.operator) {
            case '+':
                binOpInstructions = [Instr.Adds(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.Blvs('p_throw_overflow_error')];
                Macros.insertOverflowError();
                break;

            case '-':
                binOpInstructions = [Instr.Subs(Reg.R0, Reg.R0, Reg.R1),
                                     Instr.Blvs('p_throw_overflow_error')];
                Macros.insertOverflowError();
                break;

            case '*':
                binOpInstructions = [Instr.Smull(Reg.R0, Reg.R1, Reg.R0, Reg.R1),
                                     Instr.Cmp(Reg.R1, Reg.R0, Instr.Asr(31)),
                                     Instr.Blne('p_throw_overflow_error')];
                Macros.insertOverflowError();
                break;

            case '/':
                binOpInstructions = [Instr.Bl('p_check_divide_by_zero'),
                                     Instr.Bl('__aeabi_idiv')];
                Macros.insertCheckDivideByZero();
                break;

            case '%':
                binOpInstructions = [Instr.Bl('p_check_divide_by_zero'),
                                     Instr.Bl('__aeabi_idivmod'),
                                     Instr.Mov(Reg.R0, Reg.R1)];
                Macros.insertCheckDivideByZero();
                break;

            case '>':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Movgt(Reg.R0, Instr.Const(1)),
                                     Instr.Movle(Reg.R0, Instr.Const(0))];
                break;

            case '<':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Movlt(Reg.R0, Instr.Const(1)),
                                     Instr.Movge(Reg.R0, Instr.Const(0))];
                break;

            case '>=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Movge(Reg.R0, Instr.Const(1)),
                                     Instr.Movlt(Reg.R0, Instr.Const(0))];
                break;

            case '<=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Movle(Reg.R0, Instr.Const(1)),
                                     Instr.Movgt(Reg.R0, Instr.Const(0))];
                break;

            case '==':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Moveq(Reg.R0, Instr.Const(1)),
                                     Instr.Movne(Reg.R0, Instr.Const(0))];
                break;

            case '!=':
                binOpInstructions = [Instr.Cmp(Reg.R0, Reg.R1),
                                     Instr.Movne(Reg.R0, Instr.Const(1)),
                                     Instr.Moveq(Reg.R0, Instr.Const(0))];
                break;

            case '&&':
                var label = this.getNextLabelName();
                var rhsInstructions = node.rightOperand.visit(this);
                binOpInstructions = [lhsInstructions,
                                     Instr.Cmp(Reg.R0, Instr.Const(0)),
                                     Instr.Beq(label),
                                     rhsInstructions,
                                     Instr.Label(label)];
                return binOpInstructions;

            case '||':
                var label = this.getNextLabelName();
                var rhsInstructions = node.rightOperand.visit(this);
                binOpInstructions = [lhsInstructions,
                                     Instr.Cmp(Reg.R0, Instr.Const(1)),
                                     Instr.Beq(label),
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
        Macros.insertDataLabel();
        var {label: dataLabel, instructions: strDataInstructions} = 
                CodeGenUtil.genStrDataBlock(node.actualStrLength, node.str);
        Macros.sections.dataSection.push(strDataInstructions);
         
        return [Instr.Ldr(Reg.R0, Instr.Liter(dataLabel))];
    }

    visitReturnNode(node: NodeType.ReturnNode): any {
        var returnExprInstructions = node.returnExpr.visit(this);
        var cumByteSize = this.currentST.countTotalByteSizeUntilRoot();
        var scopeAdd = cumByteSize === 0 ? [] : Instr.Add(Reg.SP, Reg.SP, Instr.Const(cumByteSize));
        return [returnExprInstructions, scopeAdd, this.popWithDecrement(Reg.PC)]; 
    }

    visitAssignNode(node: NodeType.AssignNode): any {
        var rhsIns = node.rhs.visit(this);
        var strInstruction = Instr.selectStr(node.lhs.type)

        if (node.lhs instanceof NodeType.IdentNode) {
            return [rhsIns, strInstruction(Reg.R0, 
                    Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(<NodeType.IdentNode>node.lhs))))];

        } else if (node.lhs instanceof NodeType.ArrayElemNode) {
            var checkArrayBounds;
            if (!Const.barebones) {
                Macros.insertCheckArrayBounds();
                checkArrayBounds = Instr.Bl('p_check_array_bounds');
            } else {
                checkArrayBounds = [];
            }
            
            var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode(node.lhs.type);

            var findAddress = function(step) {
                return [
                    checkArrayBounds,
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

        } else if (node.lhs instanceof NodeType.PairElemNode) {
            var lhs = <NodeType.PairElemNode>node.lhs;
            var type1 = this.currentST.lookupAll(lhs.ident).type.type1;
            var type2 = this.currentST.lookupAll(lhs.ident).type.type2;
            var fetchType = lhs.index === 0 ? type1 : type2;            
            Macros.insertCheckNullPointer();
            Macros.insertFree();
            var fetchTypeSize = CodeGenUtil.getByteSizeFromTypeNode(fetchType);
            return [
                rhsIns,
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(lhs.ident)))),
                Instr.Bl("p_check_null_pointer"),
                Instr.Add(Reg.R0, Reg.R0, Instr.Const(lhs.index * 4)),
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
                Instr.Bl('free'),
                Instr.Mov(Reg.R0, Instr.Const(fetchTypeSize)),
                this.insertMallocInstruction(),
                this.popWithDecrement(Reg.R1),
                Instr.Str(Reg.R0, Instr.Mem(Reg.R1)),
                Instr.Mov(Reg.R1, Reg.R0),
                this.popWithDecrement(Reg.R0),
                Instr.selectStr(fetchType)(Reg.R0, Instr.Mem(Reg.R1))
            ];
        } else if (node.lhs instanceof NodeType.StructElemNode) {
            var structElemNode = <NodeType.StructElemNode> node.lhs;      

           /* var st = this.currentST.lookupAll(structElemNode.structIdent).type.st;
       
            return [
                rhsIns,
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(structElemNode.structIdent)))),
                Instr.Bl("p_check_null_pointer"),
                Instr.Add(Reg.R0, Reg.R0, Instr.Const(st.lookupAll(structElemNode.fieldIdents[0]).offset - 4)),
                this.popWithDecrement(Reg.R1),
                Instr.selectStr(node.rhs.type)(Reg.R1, Instr.Mem(Reg.R0))
            ];*/

            Macros.insertCheckNullPointer();
            var instructions = [ rhsIns,
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(structElemNode.structIdent)))),
                Instr.Bl("p_check_null_pointer")];

            var current = this.currentST.lookupAll(structElemNode.structIdent);
            for (var i = 0; i < structElemNode.fieldIdents.length - 1; i++) {
                current = current.type.st.lookupAll(structElemNode.fieldIdents[i]);
                instructions.push([
                    Instr.Add(Reg.R0, Reg.R0, Instr.Const(current.offset - 4)),
                    Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
                    Instr.Bl('p_check_null_pointer')]
                );
            }
            current = current.type.st.lookupAll(structElemNode.fieldIdents[i]);

            instructions.push(Instr.Add(Reg.R0, Reg.R0, Instr.Const(current.offset - 4)));
            instructions.push(this.popWithDecrement(Reg.R1));
            instructions.push(Instr.selectStr(structElemNode.type)(Reg.R1, Instr.Mem(Reg.R0)));
            return instructions;
        }
    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode): any {
        // Change to inner scope
        this.currentST = node.st;
        // Generate instructions corresponding to the block
        var instrs = SemanticUtil.visitNodeList(node.statList, this);
        this.currentST = node.st.parent;
        // Return the list of instructions in their scope (if necessary)
        return this.scopedInstructions(node.st.totalByteSize, instrs);
    }

    visitWhileNode(node: NodeType.WhileNode): any {
        var bodyLabel = this.getNextLabelName();
        var exprLabel = this.getNextLabelName();
        this.currentST = node.st;
        var body = this.scopedInstructions(node.st.totalByteSize,
                SemanticUtil.visitNodeList(node.loopBody, this));
        this.currentST = node.st.parent;
        var expr = node.predicateExpr.visit(this);
        return [Instr.B(exprLabel),
                Instr.Label(bodyLabel),
                body,
                Instr.Label(exprLabel),
                expr,
                Instr.Cmp(Reg.R0, Instr.Const(1)),
                Instr.Beq(bodyLabel)];
    }

    visitArrayLiterNode(node: NodeType.ArrayLiterNode): any {
        var instrList = [];
        var arrayLength = node.exprList ? node.exprList.length : 0;
        var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode((<NodeType.ArrayTypeNode>node.type).type);

        if ((<NodeType.ArrayTypeNode> node.type).depth > 1) {
            elemByteSize = 4;
        }

        // add 4 in front to store the array length
        var offset = 4;
        var size = offset + arrayLength * elemByteSize;
        instrList.push(Instr.Mov(Reg.R0, Instr.Const(size)),
                       this.insertMallocInstruction(),
                       Instr.Mov(Reg.R3, Reg.R0));

        if (elemByteSize === 4) {
            for (var i = 1; i <= arrayLength; i++) {
                instrList.push(node.exprList[i - 1].visit(this),
                               Instr.Str(Reg.R0, Instr.Mem(Reg.R3, Instr.Const(i * elemByteSize))));
            }
        } else {
            for (var i = 0; i < arrayLength; i++) {
                instrList.push(node.exprList[i].visit(this),
                               Instr.Strb(Reg.R0, Instr.Mem(Reg.R3, Instr.Const(offset + i))));
            }
        }

        instrList.push(Instr.Mov(Reg.R0, Instr.Const(arrayLength)),
                       Instr.Str(Reg.R0, Instr.Mem(Reg.R3)),
                       Instr.Mov(Reg.R0, Reg.R3));

        return instrList;
    }

    visitCharLiterNode(node: NodeType.CharLiterNode): any {
        var ch = node.ch;
        var constant;
        ch = ch.length > 1 ? ch.charAt(1) : ch;
        constant = Instr.Const('\'' + ch + '\''); 
        return [Instr.Mov(Reg.R0, constant)];
    }
 
    visitFreeNode(node: NodeType.FreeNode): any {
        var instrList = [node.expr.visit(this)];
        var freeText = 'free';
        Macros.insertFree();

        if (node.expr.type instanceof NodeType.PairTypeNode) {
            freeText = 'p_free_pair';
            Macros.insertFreePair();
        }
        var offset = this.currentST.lookUpOffset(<NodeType.IdentNode>node.expr);
        return [node.expr.visit(this), 
                Instr.Bl(freeText), 
                Instr.Mov(Reg.R0, Instr.Const(0)), 
                Instr.Str(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(offset)))];
    }

    visitPrintNode(node: NodeType.PrintNode): any {
        return CodeGenUtil.funcDefs.printNodeLogic(node, this);
    }

    visitPrintlnNode(node: NodeType.PrintlnNode): any {
        var printInstrs = CodeGenUtil.funcDefs.printNodeLogic(node, this);
        Macros.insertPrintLn();
        return [printInstrs, Instr.Bl('p_print_ln')];
    }

    visitDeclareNode(node: NodeType.DeclareNode): any {
        this.currentST.seenIdents.push(node.ident);
        // Leave result of evaluating rhs in r0
        var rhsInstructions = node.rhs.visit(this);
        // Pops from front of byte sizes
        var spOffset = this.currentST.totalByteSize - this.currentST.byteSizes.shift(); 
        // Decide whether to use a Strb instruction or just a str, depending on the type of the node
        var strInstruction = Instr.selectStr(node.type);
        return [rhsInstructions,
                strInstruction(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(spOffset)))];
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode): any {
        var instrList = [];
        instrList.push(node.ident.visit(this));

        if (!node.exprList) {
            // If asking for the entire array, just return what you get from visiting the ident.
            return instrList;
        }

        var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode(node.type);
        
        instrList.push(this.pushWithIncrement(Reg.R4),
                       Instr.Mov(Reg.R4, Reg.R0));

        _.forEach(node.exprList, function(expr) {
            Macros.insertCheckArrayBounds();
            var ldrInstruction = Instr.selectLdr(node.type);
            instrList.push(expr.visit(this),
                           Instr.Bl('p_check_array_bounds'),
                           Instr.Add(Reg.R4, Reg.R4, Instr.Const(4)),
                           (elemByteSize === 1 ? Instr.Add(Reg.R4, Reg.R4, Reg.R0)
                                               : Instr.Add(Reg.R4, Reg.R4, Reg.R0, Instr.Lsl(2))),
                           ldrInstruction(Reg.R4, Instr.Mem(Reg.R4)));

        }.bind(this));
       
        instrList.push(Instr.Mov(Reg.R0, Reg.R4),
                       this.popWithDecrement(Reg.R4));

        return instrList;
    }

    visitCallNode(node: NodeType.CallNode): any {
        var functionCall = Instr.Bl('f_' + node.ident.identStr)
        var argListSize = node.argList.length;
        /* If no parameters, simply just call Bl 'f_'+node.ident.identStr
           leaves result in R0. */
        if (argListSize === 0) {
            return [functionCall];
        }
        // Otherwise, push parameters on the stack
        var argByteSize = 0;
        var instrList = [];

        for (var i = argListSize - 1; i >= 0; i--) {
            var size = CodeGenUtil.getByteSizeFromTypeNode(node.argList[i].type);
            argByteSize += size;
            instrList.push(node.argList[i].visit(this));
            var strInstruction = Instr.selectStr(node.argList[i].type);
            instrList.push(strInstruction(Reg.R0,
                    Instr.MemBang(Reg.SP, Instr.Const(-(size)))));

            this.identOffset += size;
        }

        this.identOffset -= argByteSize;
        instrList.push(functionCall, Instr.Add(Reg.SP, Reg.SP, Instr.Const(argByteSize)));
        return instrList;
    }

    visitPairLiterNode(node: NodeType.PairLiterNode): any {
        return node.type.visit(this);   
    }

    visitIntLiterNode(node: NodeType.IntLiterNode): any {
        return [Instr.Ldr(Reg.R0, Instr.Liter(node.num))];
    }

    visitIdentNode(node: NodeType.IdentNode): any {
        var ldrInstruction = Instr.selectLdr(node.type);
        var constant =  Instr.Const(this.currentST.lookUpOffset(node) + this.identOffset)
        return [ldrInstruction(Reg.R0, Instr.Mem(Reg.SP, constant))]; 
    }

    visitReadNode(node: NodeType.ReadNode): any {
        var readInstruction;
        var getReadInstruction = function() {
            if (node.readTarget.type instanceof NodeType.IntTypeNode) {
                Macros.insertReadInt();
                return [Instr.Bl('p_read_int')];
            } else if (node.readTarget.type instanceof NodeType.CharTypeNode) {
                Macros.insertReadChar();
                return [Instr.Bl('p_read_char')];
            }
        }.bind(this);

        if (node.readTarget instanceof NodeType.IdentNode) {
            readInstruction = getReadInstruction();
            return [Instr.Add(Reg.R0, 
                              Reg.SP,
                              Instr.Const(this.currentST.lookUpOffset(<NodeType.IdentNode>node.readTarget))),
                    readInstruction];
        } else if (node.readTarget instanceof NodeType.ArrayElemNode) {
            Macros.insertCheckArrayBounds();
            readInstruction = getReadInstruction();
            var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode(node.readTarget.type);

            var findAddress = function(step) {
                return [
                    Instr.Bl('p_check_array_bounds'),
                    Instr.Add(Reg.R4, Reg.R4, Instr.Const(4)),
                    step == 4 ? Instr.Add(Reg.R4, Reg.R4, Reg.R0, Instr.Lsl(2))
                              : Instr.Add(Reg.R4, Reg.R4, Reg.R0)
                ];
            }
            var indexExprs = (<NodeType.ArrayElemNode>node.readTarget).exprList;
            var instructions = [
                this.pushWithIncrement(Reg.R0, Reg.R4),
                Instr.Ldr(Reg.R4,
                          Instr.Mem(Reg.SP,
                                    Instr.Const(this.currentST.lookUpOffset(
                                               (<NodeType.ArrayElemNode>node.readTarget).ident))))
            ];

            _.times(indexExprs.length - 1, function(i) {
                indexExprs[i].visit(this);
                instructions.push(findAddress(4));
                instructions.push(Instr.Ldr(Reg.R4, Instr.Mem(Reg.R4)))
            }.bind(this));

            instructions.push([
                indexExprs[indexExprs.length - 1].visit(this),
                findAddress(elemByteSize),
                Instr.Mov(Reg.R1, Reg.R4),
                this.popWithDecrement(Reg.R0, Reg.R4),
                Instr.Add(Reg.R0, Instr.Mem(Reg.R1), Instr.Const(0)),
                readInstruction,
            ]);

            return instructions;          
        }  else if (node.readTarget instanceof NodeType.PairElemNode) {
            var target = <NodeType.PairElemNode>node.readTarget;

            var type1 = this.currentST.lookupAll(target.ident).type.type1;
            var type2 = this.currentST.lookupAll(target.ident).type.type2;
            
            Macros.insertCheckNullPointer();
            Macros.insertReadInt();
            Macros.insertFree();
            
            var indexInstruction;
            var readType = target.index === 0 ? type1 : type2;
            var readTypeSize = CodeGenUtil.getByteSizeFromTypeNode(readType);
            
            return [
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(target.ident)))),
                Instr.Bl("p_check_null_pointer"),
                Instr.Add(Reg.R0, Reg.R0, Instr.Const(target.index * 4)),
                this.pushWithIncrement(Reg.R0),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
                Instr.Bl('free'),
                Instr.Mov(Reg.R0, Instr.Const(readTypeSize)),
                this.insertMallocInstruction(),
                this.popWithDecrement(Reg.R1),
                Instr.Str(Reg.R0, Instr.Mem(Reg.R1)),
                Instr.Mov(Reg.R1, Reg.R0),
                this.popWithDecrement(Reg.R0),
                Instr.Add(Reg.R0, Reg.R1, Instr.Const(0)),
                Instr.Bl('p_read_int')
            ];
        }

        return [];
    }

    visitUnOpNode(node: NodeType.UnOpNode): any {
        var unOpInstructions;

        switch (node.operator) {
            case '-':
                unOpInstructions = [Instr.Rsbs(Reg.R0, Reg.R0, Instr.Const(0)),
                                    Instr.Blvs('p_throw_overflow_error')];
                Macros.insertOverflowError();
                break;

            case '!':
                unOpInstructions = [Instr.Eor(Reg.R0, Reg.R0, Instr.Const(1))];
                break;

            case 'ord':
                unOpInstructions = [];
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
        var cmpInstructions = [Instr.Cmp(Reg.R0, Instr.Const(0)), Instr.Beq(falseLabel)];
        
        // Generate scope for instructions in true branch.
        this.currentST = node.trueSt;
        var trueInstructions = this.scopedInstructions(node.trueSt.totalByteSize,
                SemanticUtil.visitNodeList(node.trueStatList, this));
        
        // Generate scope for instructions in false branch.
        this.currentST = node.falseSt;
        var falseInstructions = this.scopedInstructions(node.falseSt.totalByteSize,
                SemanticUtil.visitNodeList(node.falseStatList, this));
        //Return to the parent scope.
        this.currentST = parentST;

        return [
            exprInstructions, 
            cmpInstructions,
            trueInstructions, 
            Instr.B(afterLabel),
            Instr.Label(falseLabel),
            falseInstructions, 
            Instr.Label(afterLabel)
        ];
    }

    visitNewPairNode(node: NodeType.NewPairNode): any {
        var allocPairElem = function(nodeType) {
            var str;
            var elemSize = CodeGenUtil.getByteSizeFromTypeNode(nodeType);

            str = Instr.selectStr(nodeType)(Reg.R1, Instr.Mem(Reg.R0));

            return [
                this.pushWithIncrement(Reg.R0),
                Instr.Mov(Reg.R0, Instr.Const(elemSize)),
                this.insert,
                this.popWithDecrement(Reg.R1),
                str,
                this.pushWithIncrement(Reg.R0)
            ];
        }.bind(this);

        return [
            node.fstExpr.visit(this),
            allocPairElem(node.fstExpr.type),
            node.sndExpr.visit(this),
            allocPairElem(node.sndExpr.type),
            Instr.Mov(Reg.R0, Instr.Const(8)),
            this.insertMallocInstruction(),
            this.popWithDecrement(Reg.R1, Reg.R2),
            Instr.Str(Reg.R2, Instr.Mem(Reg.R0)),
            Instr.Str(Reg.R1, Instr.Mem(Reg.R0, Instr.Const(4)))
        ];
    }

    visitBoolLiterNode(node: NodeType.BoolLiterNode): any {
        return [Instr.Mov(Reg.R0, node.bool ? Instr.Const(1) : Instr.Const(0))];
    }

    visitPairElemNode(node: NodeType.PairElemNode): any {
        var fetchType;
        var indexInstruction;
        var type1 = this.currentST.lookupAll(node.ident).type.type1;
        var type2 = this.currentST.lookupAll(node.ident).type.type2;
        Macros.insertCheckNullPointer();

        if (node.index == 0) {
            fetchType = type1;
            indexInstruction = [Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0))];
        } else {
            fetchType = type2;
            indexInstruction = [Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0, Instr.Const(4)))];
        }

        var ldrIns = Instr.selectLdr(fetchType);
        var pairElemInstruction = [Instr.Ldr(Reg.R0, Instr.Mem(Reg.SP, Instr.Const(this.currentST.lookUpOffset(node.ident)))),
                                   Instr.Bl('p_check_null_pointer'),
                                   indexInstruction,
                                   ldrIns(Reg.R0, Instr.Mem(Reg.R0))];
        return pairElemInstruction;
    }

    visitNullTypeNode(node: NodeType.NullTypeNode): any {
        return [Instr.Mov(Reg.R0, Instr.Const(0))];
    }

    visitGetFrameBufferNode(node: NodeType.GetFrameBufferNode): any {
        // width: 1024
        // height: 768
        // colour-depth: 32
        var instrList = [Instr.Mov(Reg.R0, Instr.Const(1024)),
            Instr.Mov(Reg.R1, Instr.Const(768)),
            Instr.Mov(Reg.R2, Instr.Const(32)),
            Instr.Bl('gx_get_frame_buffer'),
            Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0, Instr.Const(32)))];
        Macros.insertGetFrameBuffer();
        return instrList;
    }

    visitStructElemNode(node:NodeType.StructElemNode):any {
        Macros.insertCheckNullPointer();
    
        var identInstr = node.structIdent.visit(this);
        var instrs = [
            identInstr,
            Instr.Bl('p_check_null_pointer')];

        var current = this.currentST.lookupAll(node.structIdent);
        for (var i = 0; i < node.fieldIdents.length - 1; i++) {
            current = current.type.st.lookupAll(node.fieldIdents[i]);
            instrs.push([
                Instr.Add(Reg.R0, Reg.R0, Instr.Const(current.offset - 4)),
                Instr.Ldr(Reg.R0, Instr.Mem(Reg.R0)),
                Instr.Bl('p_check_null_pointer')]
            );
        }

        current = current.type.st.lookupAll(node.fieldIdents[i]);
        var ldrInstr = Instr.selectLdr(current.type);
        instrs.push([
            ldrInstr(Reg.R0, Instr.Mem(Reg.R0, Instr.Const(current.offset - 4)))]);

        return instrs;

    }

    visitFieldNode(node: NodeType.FieldNode): any {
        // Does not need to be visited
        return []
    }

    visitStructNode(node:NodeType.StructNode):any {
        // Does not need to be visited
        return []

    }

    visitStructTypeNode(node:NodeType.StructTypeNode):any {
        // Does not need to be visited
        return []      
    }
    
    visitNewStructNode(node:NodeType.NewStructNode):any {
        var st = (<NodeType.StructTypeNode> node.type).st
        Macros.insertMemset();
        return [
            Instr.Mov(Reg.R0, Instr.Const(st.totalByteSize)),
            this.insertMallocInstruction(),
            // Set the returned memory to zero to guarantee null safety
            Instr.Mov(Reg.R1, Instr.Const(st.totalByteSize)),
            Instr.Bl('memset')
        ];

    }

    visitNewArrayNode(node:NodeType.NewArrayNode):any { 
        Macros.insertMemset(); // For memset
        Macros.insertOverflowError(); // For overflow error

        var instrList = [];

        var elemByteSize = CodeGenUtil.getByteSizeFromTypeNode((<NodeType.ArrayTypeNode>node.type).type);

        // add 4 in front to store the array length
        var lengthExprInstructions = node.lengthExpr.visit(this); // Leaves length in r0
        instrList.push(
                       lengthExprInstructions,
                       Instr.Mov(Reg.R4, Reg.R0), // R4 = raw length of array
                       Instr.Mov(Reg.R1, Instr.Const(elemByteSize)),
                       Instr.Smull(Reg.R0, Reg.R1, Reg.R0, Reg.R1),
                       Instr.Cmp(Reg.R1, Reg.R0, Instr.Asr(31)),
                       Instr.Blne('p_throw_overflow_error'),
                       Instr.Mov(Reg.R1, Reg.R0),
                       Instr.Add(Reg.R1, Instr.Const(4)), // Add 4 for the size
                       Instr.Bl('malloc'),
                       // Array address is still in R0 and size is still in R1
                       Instr.Bl('memset'),
                       // R4 still contains raw length of array
                       // R0 contains address of array
                       Instr.Str(Reg.R4, Instr.Mem(Reg.R0))
                       );

        return instrList;
    }

    visitIntTypeNode(node: NodeType.IntTypeNode): any {}
    visitBoolTypeNode(node: NodeType.BoolTypeNode): any {}
    visitCharTypeNode(node: NodeType.CharTypeNode): any {}
    visitEmptyArrayTypeNode(node: NodeType.EmptyArrayTypeNode): any {}
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): any {}
    visitPairTypeNode(node: NodeType.PairTypeNode): any {}
    visitParamNode(node: NodeType.ParamNode): any {}
}
