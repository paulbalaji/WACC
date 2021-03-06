import constants = require('./constants');
import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');
import Error = require("./WACCError");
import ReturnChecker = require('./ReturnChecker');
import OperatorInfo = require('./OperatorInfo');
var util = require('util')

var _ = require('underscore');

export class SemanticVisitor implements NodeType.Visitor {
    structST: SemanticUtil.SymbolTable;
    currentST: SemanticUtil.SymbolTable;
    functionST: SemanticUtil.SymbolTable;

    constructor() {

        // Creating structs symbol table
        this.structST = new SemanticUtil.SymbolTable(null);

        // Creating functions symbol table
        this.functionST = new SemanticUtil.SymbolTable(null);

        // Creating the root symbol table
        this.currentST = new SemanticUtil.SymbolTable(null);


    }

    setCurrentScope(newCurrentST: SemanticUtil.SymbolTable): void {
        this.currentST = newCurrentST;
    }
    
    enterNewScope(): void {
        this.setCurrentScope(new SemanticUtil.SymbolTable(this.currentST));
    }

    switchToParentScope(): void {
        this.setCurrentScope(this.currentST.parent);
    }

    visitProgramNode(node: NodeType.ProgramNode): any {
        node.st = this.currentST;
        node.structST = this.structST;
        node.functionST = this.functionST;
        var visitStructNodeCallbacks = SemanticUtil.visitNodeList(node.structList, this);

        // Finish the visiting of all the function nodes.
        _.map(visitStructNodeCallbacks, (f) => f());
        /* 
            Partially visit all the functionNodes inserting their idents into the symbol table,
            and returning the rest of the visit as callback functions.
        */
        var visitFuncNodeCallbacks = SemanticUtil.visitNodeList(node.functionList, this);

        // Finish the visiting of all the function nodes.
        _.map(visitFuncNodeCallbacks, (f) => f());

        // Visit all the statments in the global program scope.
        SemanticUtil.visitNodeList(node.statList, this);
        // Execute return visitor to check for valid (and invalid) returns.
        var returnVisitor : NodeType.Visitor = new ReturnChecker.ReturnVisitor();
        node.visit(returnVisitor);

    }

    visitFuncNode(node: NodeType.FuncNode): any {
        // Check for redefinition of the function.
        if (this.functionST.lookupAll(node.ident)) {
            var message = '';
            throw new Error.SemanticError('Illegally attempted to declare a previously declared function'
                                         +' "' + node.ident + '".'
                                         , node.ident.errorLocation);
        }

        // Insert function ident into the function lookup table.
        this.functionST.insert(node.ident, {type: node.type, node: node, offset: null});
        node.ident.type = node.type;

        /*
            Return the rest of visiting method as a function to be called once the rest of the functions
            have been inserted into the lookup table.
        */
        return () => {
            this.enterNewScope();
            node.st = this.currentST;
            _.forEach(node.paramList, (paramNode, paramNum) =>{ paramNode.ident.paramNum = paramNum; paramNode.visit(this);});
            SemanticUtil.visitNodeList(node.statList, this);
            this.switchToParentScope();
        };
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode): void {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);

        var opInfo = OperatorInfo.binOpMap[node.operator];
        if (!opInfo.isPermittedType(node.leftOperand.type)) {
            throw new Error.SemanticError('Left operand of "' + node.operator + '" must be of the correct type.'
                                         , node.leftOperand.errorLocation);
        }

        // MID: Left type is correct, check that the rhs type is the same
        if (!SemanticUtil.isType(node.leftOperand.type, node.rightOperand.type)) {
            throw new Error.SemanticError('Right operand of "' + node.operator + '" must be of the correct type.'
                                         , node.rightOperand.errorLocation);
        }

        node.type = opInfo.returnType;
    }

    visitStrLiterNode(node: NodeType.StrLiterNode): void {
        node.type = NodeType.STRING_TYPE;
    }

    visitReturnNode(node: NodeType.ReturnNode): void {
        node.returnExpr.visit(this);
    }

    visitAssignNode(node: NodeType.AssignNode): void {
        node.lhs.visit(this);
        node.rhs.visit(this);

        if (!SemanticUtil.isType(node.lhs.type, node.rhs.type)) {
            throw new Error.SemanticError('Assignment must be of correct type.  '
                                         +'Expecting: ' + node.lhs.type + ', '
                                         +'Actual: '    + node.rhs.type + '.'
                                         , node.rhs.errorLocation);
        }
    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode): void {
        this.enterNewScope();
        node.st = this.currentST;
        SemanticUtil.visitNodeList(node.statList, this);
        this.switchToParentScope();
    }

    visitWhileNode(node: NodeType.WhileNode): void {
        node.predicateExpr.visit(this);
        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw new Error.SemanticError('Invalid while loop condition.  '
                                         +'Expecting: ' + 'BOOL'                   + ', '
                                         +'Actual: '    +  node.predicateExpr.type + '.'
                                         , node.predicateExpr.errorLocation);
        }

        this.enterNewScope();
        node.st = this.currentST;
        SemanticUtil.visitNodeList(node.loopBody, this);
        this.switchToParentScope();
    }

    visitArrayLiterNode(node: NodeType.ArrayLiterNode): void {
        // Visit all expressions
        SemanticUtil.visitNodeList(node.exprList, this);

        if (_.isEmpty(node.exprList)) {
            // The case that the list is empty            
            node.type = NodeType.EMPTY_ARRAY_TYPE;
        } else {
            // The case that the list is not empty
            // Check that all expressions are of the same type
            var type = node.exprList[0].type;

            // mismatchedTypes is a list of types which do not match the first one in the list
            var mismatchedTypes = _.filter(node.exprList, (expr) => !SemanticUtil.isType(type, expr.type));

            // check if all are same type
            if (!_.isEmpty(mismatchedTypes)) {
                throw new Error.SemanticError('Array Literal types must all be the same.'
                                             , node.errorLocation);
            }

            if (node.exprList[0].type instanceof NodeType.ArrayTypeNode) {
                // consider if it's a nested array
                var n: any = node.exprList[0].type;
                node.type = new NodeType.ArrayTypeNode(n.type, n.depth + 1);
            } else {
                // not nested array
                node.type = new NodeType.ArrayTypeNode(node.exprList[0].type, 1);
            }
        }
    }

    visitCharLiterNode(node: NodeType.CharLiterNode): void {
        node.type = NodeType.CHAR_TYPE;
    }

    visitParamNode(node: NodeType.ParamNode): void {

        if (node.type instanceof NodeType.StructTypeNode) {
            var structType = <NodeType.StructTypeNode>node.type;
            var structInfo = this.structST.lookupAll(structType.ident);
            if (!structInfo) {
                        throw new Error.SemanticError('Undefined  struct:'
                    + ' "' + structType.ident + '".'
                                            , node.ident.errorLocation);            
                }
            node.type = structInfo.type;
        }

        this.currentST.insert(node.ident, { type: node.type, node: node, offset: null });
        node.ident.visit(this);
    }

    visitFreeNode(node: NodeType.FreeNode): void {
        node.expr.visit(this);

        if (node.expr instanceof NodeType.IdentNode) {
            var exprType = this.currentST.lookupAll(<NodeType.IdentNode> node.expr).type;

            if (!(exprType instanceof NodeType.ArrayTypeNode || exprType instanceof NodeType.PairTypeNode || exprType instanceof NodeType.StructTypeNode)) {
                throw new Error.SemanticError('Free statement must be given an array type, pair type or struct type.'
                                             , node.expr.errorLocation);
            }
        } else {
            throw new Error.SemanticError('Free statement must be given a variable.'
                                         , node.expr.errorLocation);
        }
    }

    visitDeclareNode(node: NodeType.DeclareNode): void {

        node.type.visit(this);
        node.rhs.visit(this);
        var res = this.currentST.lookup(node.ident);
        if (res && !(res.node instanceof NodeType.ParamNode)) {
            throw new Error.SemanticError('Redeclaration of variable "' + node.ident + '".'
                                         , node.ident.errorLocation);
        }

        /*
         In the case that rhs is an array liter node, we must consider the case that is empty ([]).
         If it is a list of empty expressions, then it is the responsibility of declare node to fill
         in the type. 
         This is because an ArrayLiterNode, [] cannot know its type and so cannot fill it in.
        */
        if(node.rhs instanceof NodeType.ArrayLiterNode) {
            if (!(node.type instanceof NodeType.ArrayTypeNode)) {
                 throw new Error.SemanticError('Declaration expression must be of correct type.  '
                                         +'Expecting: ' + node.type     + ', '
                                         +'Actual: []'
                                         , node.rhs.errorLocation);
            }

            var arrayLiter:NodeType.ArrayLiterNode = <NodeType.ArrayLiterNode>node.rhs;
            if(_.isEmpty(arrayLiter.exprList)) {
               
                arrayLiter.type = node.type;
            }
        }
        if (!SemanticUtil.isType(node.type, node.rhs.type)) {
            throw new Error.SemanticError('Declaration expression must be of correct type.  '
                                         +'Expecting: ' + node.type     + ', '
                                         +'Actual: '    + node.rhs.type + '.'
                                         , node.rhs.errorLocation);
        }
        if (node.type instanceof NodeType.ArrayTypeNode) {


            if (node.rhs instanceof NodeType.ArrayLiterNode) {
                 var exprDepths = _.map((<NodeType.ArrayLiterNode> node.rhs).exprList, function (expr) {
                if (expr instanceof NodeType.IdentNode) {
                    var t = this.currentST.lookupAll(expr).type;
                    return t instanceof NodeType.ArrayTypeNode ? t.depth: 0;
                } else if (expr instanceof NodeType.StrLiterNode) {
                    // Special case - depth of string liter is
                    return (<NodeType.ArrayTypeNode>expr.type).depth;
                }  else {
                    return 0;
                }

                }.bind(this));
                if (_.some(exprDepths, ((depth) => (depth + 1) !== (<NodeType.ArrayTypeNode> node.type).depth) )) {
                    throw new Error.SemanticError('Declaration expression must be of correct type.' + 
                                                  '  Array depths of lhs and rhs expressions do not match.',
                                                  node.rhs.errorLocation);
                }

            } else if (node.rhs instanceof NodeType.GetFrameBufferNode) {
                if (!((<NodeType.ArrayTypeNode>(node.type)).depth === (<NodeType.ArrayTypeNode> node.rhs.type).depth)) {
                    throw new Error.SemanticError('Declaration expression must be of correct type.' + 
                                                  '  get_frame_buffer returns an array of type INT[].',
                                                  node.rhs.errorLocation);
                }
            }
        }

        if (node.type instanceof NodeType.StructTypeNode) {
            var structType = <NodeType.StructTypeNode>node.type;
            var structInfo = this.structST.lookupAll(structType.ident);
            if (!structInfo) {
                        throw new Error.SemanticError('Undefined  struct:'
                    + ' "' + structType.ident + '".'
                                            , node.ident.errorLocation);            
                }
            node.type = structInfo.type;
        }
       

        this.currentST.insert(node.ident, {type: node.type, node: node, offset : 0});
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode): void {
        SemanticUtil.visitNodeList(node.exprList, this);
        node.ident.visit(this);

        // Check if every index is an integer
        if (!_.every(node.exprList, (exprNode: NodeType.ExprNode) => SemanticUtil.isType(exprNode.type, NodeType.INT_TYPE))) {
            throw new Error.SemanticError('Array index must be of type INT.'
                                         , node.exprList[0].errorLocation);
        }

        var res = this.currentST.lookupAll(node.ident);
        
        if (!(res.type instanceof NodeType.ArrayTypeNode)) {
            throw new Error.SemanticError('Cannot access index of a non array type variable "' + node.ident + '".'
                                         , node.type.errorLocation);
        }

        // if giving too many indexes than array is capable of handling
        if (res.type.depth < node.exprList.length) {
            throw new Error.SemanticError('Giving incorrect dimension for array.'
                                         , node.exprList[0].errorLocation);
        }

        /*
            Can be considered as:
                res.type.depth - node.exprList.length > 0

            The case when we are not accessing the full depth of the array
            
            e.g.
                int[][][] y = ....;
                y[0] = ....; 

                here y[0] will have same base type as y's base type (ie int)
                but y[0]'s type's depth will be the (depth of y's type) - (the #indices referred)
                ie. depth(y) = 3, #indices = 1 (since y[0] only looks at the first nested array)
                hence y[0]'s type's depth will be 2, as expected
        */

        if (res.type.depth > node.exprList.length) {
            node.type = new NodeType.ArrayTypeNode(res.type.type, res.type.depth - node.exprList.length);
        } else {
            node.type = res.type.type;
        }

    }

    visitCallNode(node: NodeType.CallNode): void {
        SemanticUtil.visitNodeList(node.argList, this);

        var res = this.functionST.lookupAll(node.ident);

        if (!res) {
            var suggestion = SemanticUtil.getIdentSpellingSuggestion(node.ident, this.functionST);
            suggestion = suggestion ? 'Perhaps you meant \'' + suggestion + '\'' : '';
            throw new Error.SemanticError('Attempted to call undeclared function named "' + node.ident + '".\n'
                                         + suggestion
                                         , node.ident.errorLocation);
        }

        var funcNode = res.node;

        // Compare arguments
        if (node.argList.length === funcNode.paramList.length) {
            _.forEach(_.zip(node.argList, funcNode.paramList), function (nodes, i) {
                if (!SemanticUtil.isType(nodes[0].type, nodes[1].type)) {
                    throw new Error.SemanticError('Provided function arguments do not match the function declaration.'
                                                 , node.argList[i].errorLocation);
                }
            });
        } else {
            throw new Error.SemanticError('Invalid argument count when calling function named ' + node.ident + '. '
                                         +'Expecting ' + funcNode.paramList.length + ' arguments ' + ', '
                                         +'given '     + node.argList.length       + ' arguments.'
                                         , node.argList[0].errorLocation);
        }

        // Type of call node is return type of the function being called
        node.type = res.type;
    }

    visitPairLiterNode(node: NodeType.PairLiterNode): void {
        node.type = NodeType.NULL_TYPE;
    }

    visitIntLiterNode(node: NodeType.IntLiterNode): void {
        node.type = NodeType.INT_TYPE;

        if (node.num > constants.WACC_MAX_INT) {
            throw new Error.SyntaxError('Int literal "' + node.num + '" exceeds max int.'
                                         , node.errorLocation);
        }

        if (node.num < constants.WACC_MIN_INT) {
            throw new Error.SyntaxError('Int literal "'+ node.num + '" is smaller than min int.'
                                         , node.errorLocation);
        }

    }

    visitIdentNode(node: NodeType.IdentNode): void {
        var res = this.currentST.lookupAll(node);
        if (!res) {
            var suggestion = SemanticUtil.getIdentSpellingSuggestion(node, this.currentST);
            // if suggestion is undefined, it will go to false part of ternary
            suggestion = suggestion ? 'Perhaps you meant \'' + suggestion + '\'' : '';
            throw new Error.SemanticError('Variable named "' + node + '" could not be found.\n'
                                         + suggestion
                                         , node.errorLocation);
        }

        node.type = res.type;
    }

    visitReadNode(node: NodeType.ReadNode): void {
        var target = node.readTarget;
        target.visit(this);

        // Check it is possible to record into target
        if (!SemanticUtil.isReadableType(target.type)) {
            throw new Error.SemanticError('Cannot read into expression of type ' + node.readTarget.type + '. '
                                         +'Expecting: INT, CHAR.'
                                         , node.readTarget.errorLocation);
        }
    }

    visitPrintlnNode(node: NodeType.PrintlnNode): void {
        node.expr.visit(this);
    }

    visitPrintNode(node: NodeType.PrintNode): void {
        node.expr.visit(this);
    }

    visitUnOpNode(node: NodeType.UnOpNode): void {
        node.expr.visit(this);

        // Attempt to match the left operands type with an allowed type
        if (!OperatorInfo.unOpMap[node.operator].isPermittedType(node.expr.type)) {
            throw new Error.SemanticError('Unary operator "'                  + node.operator  + '" '
                                         +'given invalid expression of type ' + node.expr.type + '.'
                                         , node.expr.errorLocation);
        }
        if (node.operator === 'gpio') { // The case that it is a gpio unary op
            // We know the expression must be an int literal in this case
            var intLiter: NodeType.IntLiterNode = <NodeType.IntLiterNode> node.expr;
            if (constants.validGPIOPins.indexOf(intLiter.num) === -1) { // The case that the pin number given is not valid
                throw new Error.SemanticError('Unary operator gpio must be given a valid pin number.  Expecting a pin number from the set {' + constants.validGPIOPins.join(',') + '}.', node.expr.errorLocation);
            } 
        }
        node.type = OperatorInfo.unOpMap[node.operator].returnType;
    }

    visitExitNode(node: NodeType.ExitNode): void {
        node.expr.visit(this);

        if (!SemanticUtil.isType(node.expr.type, NodeType.INT_TYPE)) {
            throw new Error.SemanticError('Exit statement given expression of incorrect type. '
                                         +'Expecting: ' + 'INT'           + ', '
                                         +'Actual: '    +  node.expr.type + '.'
                                         , node.expr.errorLocation);
        }
    }

    visitIfNode(node: NodeType.IfNode): void {
        node.predicateExpr.visit(this);

        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw new Error.SemanticError('Invalid if statement condition.  '
                                         +'Expecting: ' + 'BOOL'                   + ', '
                                         +'Actual: '    +  node.predicateExpr.type + '.'
                                         , node.predicateExpr.errorLocation);
        }

        // scope for the true branch
        this.enterNewScope();
        node.trueSt = this.currentST;
        SemanticUtil.visitNodeList(node.trueStatList, this);
        this.switchToParentScope();

        // same parent but different scope for the false branch
        this.enterNewScope();
        node.falseSt = this.currentST;
        SemanticUtil.visitNodeList(node.falseStatList, this);
        this.switchToParentScope();
    }



    visitPairElemNode(node: NodeType.PairElemNode): void {
        node.ident.visit(this);
        var res = this.currentST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                throw new Error.SemanticError('Given variable must be of type pair. '
                                             +'Expecting: '+ 'PAIR'    + ', '
                                             +'Actual: '   +  res.type + '.'
                                             , node.type.errorLocation);
            }
        }

        if (node.index === 0) {
            // pair.fst
            node.type = res.type.type1;
        } else {
            // pair.snd
            node.type = res.type.type2;
        }
    }

    visitNewPairNode(node: NodeType.NewPairNode): void {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);

        // The type of the node is the type of the pair
        node.type = new NodeType.PairTypeNode(node.fstExpr.type, node.sndExpr.type);
    }

    visitBoolLiterNode(node: NodeType.BoolLiterNode): void {
        node.type = NodeType.BOOL_TYPE;
    }

    visitGetFrameBufferNode(node: NodeType.GetFrameBufferNode): any {
        node.type = new NodeType.ArrayTypeNode(NodeType.INT_TYPE, 1);
    }

    visitSkipNode(node: NodeType.SkipNode): void {}
    visitPairTypeNode(node: NodeType.PairTypeNode): void {}
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): void {}
    visitIntTypeNode(node: NodeType.IntTypeNode): void {}
    visitBoolTypeNode(node: NodeType.BoolTypeNode): void {}
    visitCharTypeNode(node: NodeType.CharTypeNode): void {}
    visitEmptyArrayTypeNode(node: NodeType.EmptyArrayTypeNode): void {}
    visitNullTypeNode(node: NodeType.NullTypeNode): void {}

    visitStructElemNode(node:NodeType.StructElemNode):void {
        node.structIdent.visit(this);


        var currentType = this.currentST.lookupAll(node.structIdent).type;
        for (var i = 0; i < node.fieldIdents.length; i++) {
            if (!(currentType instanceof NodeType.StructTypeNode)) {
                throw new Error.SemanticError('Accesing property of something which is not a struct', node.fieldIdents[i].errorLocation);
            }
            

            var current = currentType.st.lookupAll(node.fieldIdents[i]);
            if (!current) {
                throw new Error.SemanticError('Accessing field that does not exist.', node.fieldIdents[i].errorLocation);
            }
            currentType = current.type;

        }

        node.type = currentType;

    };
    visitFieldNode(node:NodeType.FieldNode):void {
        // Not visiting ident node because it is not 
        // necessary for it to be defined in current scope

        node.type.visit(this);
    };
    visitStructNode(node: NodeType.StructNode): any {
        // Check for redefinition of the function.
        
        if (this.structST.lookupAll(node.ident)) {
            var message = '';
            throw new Error.SemanticError('Redefined  struct:'
                + ' "' + node.ident + '".'
                , node.ident.errorLocation);
        }
        
        var type = new NodeType.StructTypeNode(node.ident);
        type.st = new SemanticUtil.SymbolTable(null);
        node.type = type;
        

        this.structST.insert(node.ident, {type: type, node: node, offset: null});
        node.ident.type = type;


        return () => {
            SemanticUtil.visitNodeList(node.fieldList, this);

            _.map(node.fieldList, function (field) {
                if (type.st.lookupAll(field.ident)) {
                    throw new Error.SemanticError('Redefiend field'
                                         +' "' + field.ident + '" in struct'
                                         +' "' + node.ident + '".' 
                                         , node.ident.errorLocation);

                }
                if (field.type instanceof NodeType.StructTypeNode) {

                    var fieldType = this.structST.lookupAll(field.type.ident).type;

                } else {
                    var fieldType = field.type;
                }
                type.st.insert(field.ident, { type: fieldType, node: field, offset: null });
                
            }.bind(this))


        };

    };

    visitStructTypeNode(node:NodeType.StructTypeNode):void {

        if (!this.structST.lookupAll(node.ident)) {

            throw new Error.SemanticError('Undefined  struct:'
                                         +' "' + node.ident + '".'
                                         , node.ident.errorLocation);
            }
        
    };

    visitNewStructNode(node:NodeType.NewStructNode):void {
        var structInfo = this.structST.lookupAll(node.structIdent);
        if (!structInfo) {
                    throw new Error.SemanticError('Undefined  struct:'
                                         +' "' + node.structIdent + '".'
                                        , node.structIdent.errorLocation);            
            }
        node.type = structInfo.type;


    };

    visitNewArrayNode(node:NodeType.NewArrayNode):void { 
        node.lengthExpr.visit(this);

        if (!SemanticUtil.isType(node.lengthExpr.type, NodeType.INT_TYPE)) {
             throw new Error.SemanticError('New array length must be an int.'
                                         +'Expecting: ' + NodeType.INT_TYPE + ', '
                                         +'Actual: '    + node.lengthExpr.type + '.'
                                         , node.errorLocation);
        }
        var type = node.arrayType;
        var depth = 1;

        if (type instanceof NodeType.ArrayTypeNode) {
            var arrayType = (<NodeType.ArrayTypeNode> node.arrayType);
            depth += arrayType.depth;
            type = arrayType.type;
        }
        node.type = new NodeType.ArrayTypeNode(type, depth);
    }


}
