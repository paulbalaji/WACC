import Const = require('./Constants');
import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');
import ReturnChecker = require('./ReturnChecker')
var _ = require('underscore');


export class SemanticVisitor implements NodeType.Visitor {
    errors: any[];

    currentST: SemanticUtil.SymbolTable;
    functionST: SemanticUtil.SymbolTable;

    constructor() {
        this.errors = [];
        this.currentST = new SemanticUtil.SymbolTable(null); // Creating the root symbol table;
        this.functionST = new SemanticUtil.SymbolTable(null);
    }

    setCurrentScope(newCurrentST: SemanticUtil.SymbolTable): void {
        this.currentST = newCurrentST;
    }
    
    enterNewScope():void {
        this.setCurrentScope(new SemanticUtil.SymbolTable(this.currentST));
    }

    switchToParentScope() {
        this.setCurrentScope(this.currentST.parent);
    }

    visitProgramNode(node:NodeType.ProgramNode):void {
        // Partially visit all the functionNodes inserting their idents into the symbol table,
        // and returning the rest of the visit as callback functions.
        var visitFuncNodeCallbacks = SemanticUtil.visitNodeList(node.functionList, this);
        // Finish the visiting of all the function nodes.
        _.map(visitFuncNodeCallbacks, (f) => f());

        // Visit all the statments in the global program scope.
        SemanticUtil.visitNodeList(node.statList, this);
        
        // Execute return visitor to check for valid (and invalid) returns.
        var returnVisitor : NodeType.Visitor = new ReturnChecker.ReturnVisitor();
        node.visit(returnVisitor);
    }

    visitFuncNode(node:NodeType.FuncNode):any {
        // Check for redefinition of the function.
        if (this.functionST.lookupAll(node.ident)) {
            throw 'Error.  You tried to redeclare a function.  its just not good enough.  I expect better.';
        }
        // Insert function ident into the function lookup table.
        this.functionST.insert(node.ident, {type: node.type, node: node});
        node.ident.type = node.type;

        // Return the rest of visiting method as a function to be called once the rest of the functions
        // have been inserted into the lookup table.
        return () => {
            this.enterNewScope();
            SemanticUtil.visitNodeList(node.paramList, this);
            SemanticUtil.visitNodeList(node.statList, this);
            this.switchToParentScope();
        };
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode):void {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);
        
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }

        opMap['+']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['-']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['*']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['/']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['%']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['>']  = new OperatorInfo([NodeType.INT_TYPE,  NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['>='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<']  = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);

        opMap['=='] = new OperatorInfo([null], NodeType.BOOL_TYPE);
        opMap['!='] = new OperatorInfo([null], NodeType.BOOL_TYPE);

        opMap['&&'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
        opMap['||'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
        
        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, (t) => SemanticUtil.isType(node.leftOperand.type, t));
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type on lhs is not valid for the operator');
            }
        }
        // MID: Left type is correct, check that the rhs type is the same
        
        if (!SemanticUtil.isType(node.leftOperand.type, node.rightOperand.type)) {
            throw 'Fuck sake, its a binary operator and you should know by now that the types on lhs and rhs should be the same...';
        }

        node.type = opMap[node.operator].returnType;
        
    }

    visitStrLiterNode(node: NodeType.StrLiterNode):void {
        node.type = NodeType.STRING_TYPE;
    }

    visitReturnNode(node: NodeType.ReturnNode):void {
        node.returnExpr.visit(this);
    }

    visitAssignNode(node: NodeType.AssignNode):void {
        node.lhs.visit(this);
        node.rhs.visit(this);
        if (!SemanticUtil.isType(node.lhs.type, node.rhs.type)) {
            throw 'AssignNode error lhs and rhs are not the same fucking'
                + ' type.  lhs type is ' + SemanticUtil.getType(node.lhs)
                + ' . rhs type is ' + SemanticUtil.getType(node.rhs);
        }

    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode):void {
        this.enterNewScope();
        SemanticUtil.visitNodeList(node.statList, this);
        this.switchToParentScope();
    }

    visitWhileNode(node: NodeType.WhileNode):void {
        node.predicateExpr.visit(this);
        
        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw 'WoW, I assuming you got 3/6 for while loop spec, because you ' +
                  'can not even put in a boolean predicate.';
        }

        this.enterNewScope();
        SemanticUtil.visitNodeList(node.loopBody, this);
        this.switchToParentScope();
    }


    visitArrayLiterNode(node: NodeType.ArrayLiterNode):void {
        // Visit all expressions
        SemanticUtil.visitNodeList(node.exprList, this);


        if (_.isEmpty(node.exprList)) { // The case that the list is empty
            // Nothing more to check, just fill in the node type as null
            node.type = NodeType.EMPTY_ARRAY_TYPE;        
        } else { // The case that the list is not empty
            // Check that all expressions are of the same type
            var type = node.exprList[0].type;
            // Check that all types are equal to type

            // mismatchedTypes is a list of types which do not match the first one in the list
            var mismatchedTypes = _.filter(node.exprList, (expr) => !SemanticUtil.isType(type, expr.type));

            if (!_.isEmpty(mismatchedTypes)) {
                throw 'Deary deary me.  In an array literal all expressions must be of the same type';
            }

            if (node.exprList[0].type instanceof NodeType.ArrayTypeNode) {
                var n: any = node.exprList[0].type;
                node.type = new NodeType.ArrayTypeNode(n.type, n.depth + 1);

            } else {
                node.type = new NodeType.ArrayTypeNode(node.exprList[0].type, 1);
            }

        }

    }

    visitCharLiterNode(node: NodeType.CharLiterNode):void {
        node.type = NodeType.CHAR_TYPE;
    }

    visitParamNode(node: NodeType.ParamNode):void {
        node.type.visit(this);
        this.currentST.insert(node.ident, { type: node.type, node: node });
        node.ident.visit(this);
    }

    visitFreeNode(node: NodeType.FreeNode):void {
        node.expr.visit(this);

        if (node.expr instanceof NodeType.IdentNode) {
            var exprType = this.currentST.lookupAll(<NodeType.IdentNode> node.expr).type;

            if (!(exprType instanceof NodeType.ArrayTypeNode || exprType instanceof NodeType.PairTypeNode)) {
                throw 'Fuck sake. You have done it again!  A free statements expression must be an ident referencing an array type or pair type.';
            }

        } else {
            throw 'You absolute dumb shit you need to free on an ident'
        }

    }
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {

        node.type.visit(this);
        node.rhs.visit(this);

        var res = this.currentST.lookup(node.ident);
        if (res && !(res.node instanceof NodeType.ParamNode)) {
            throw 'you fucked it - redeclaration';
        }

        /*
         In the case that rhs is an array liter node, we must consider the case that is empty ([]).
         If it is a list of empty expressions, then it is the responsibility of declare node to fill
         in the type. 
         This is because an ArrayLiterNode, [] cannot know its type and so cannot fill it in.

          If you have enjoyed my essay then please leave me a mark out of 10 in the fields below:
          Jan:
          Andrea:
          Paul: MAX_INT + 1 ;)
        */
        
        if(node.rhs instanceof NodeType.ArrayLiterNode) {
            var arrayLiter:NodeType.ArrayLiterNode = <NodeType.ArrayLiterNode>node.rhs;
            if(_.isEmpty(arrayLiter.exprList)) {
                arrayLiter.type = node.type;
            }
        }

        if (!SemanticUtil.isType(node.type, node.rhs.type)) {
            throw 'Absolute nightmare.  Declare node: type of rhs does not match given type';
        }


        this.currentST.insert(node.ident, {type: node.type, node: node});

        node.ident.visit(this);

    }

    visitArrayElemNode(node: NodeType.ArrayElemNode):void {
        SemanticUtil.visitNodeList(node.exprList, this);
        node.ident.visit(this);
        // Check if every index is an integer

        if (!_.every(node.exprList, (exprNode: NodeType.ExprNode) => SemanticUtil.isType(exprNode.type, NodeType.INT_TYPE))) {
            throw "List indices must be integers mate. I know you are trying hard, but you should be more careful in the future.";
        }

        var res = this.currentST.lookupAll(node.ident);

        if (!res) {
            throw 'Mate, fucking declare your arrays before you use them.';
        }
        if (!(res.type instanceof NodeType.ArrayTypeNode)) {
            throw "Mate, you are trying to index something which is not an array. have you been drinking?";
        }

        // N.B sw6614 revision, the below condition for the if statement used to be !(res.depth != node.exprList.length).  Removed negation
   /*     if (res.type.depth !== node.exprList.length) {
            console.log(res.type);
            console.log(node.exprList);
            throw "Mate, its hard imagining objects in many dimensions, you have probably failed."

        }*/

        if (res.type.depth > node.exprList.length) {
            node.type = new NodeType.ArrayTypeNode(res.type.type, res.type.depth - node.exprList.length);
        } else {
            node.type = res.type.type;
        }


    }

    visitCallNode(node: NodeType.CallNode):void {
        // node.ident.visit(this); NO LONGER NEEDED AS node.ident is a function ident, not stored in main symbol table
        SemanticUtil.visitNodeList(node.argList, this);

        var res = this.functionST.lookupAll(node.ident);

        if (!res) {
            throw 'Mate, you cannot just call a function which hasnt been defined - get a grip.';
        }

        var funcNode = res.node;
        //compare arguments
        if (node.argList.length === funcNode.paramList.length) {
            for (var i = 0; i < node.argList.length; i++) {
                if(!SemanticUtil.isType(node.argList[i].type, funcNode.paramList[i].type)) {
                    throw 'Come on man, pass the correct arguments ffs'
                }
            }
        } else {
            throw 'Learn how to count, get the number of arguments right'
        }

        node.type = res.type; // type of call node is return type of the function being called
    }

    visitPairLiterNode(node: NodeType.PairLiterNode):void {
        node.type = NodeType.NULL_TYPE;
    }

    visitIntLiterNode(node: NodeType.IntLiterNode):void {
        node.type = NodeType.INT_TYPE;

        if (node.num > Const.WACC_MAX_INT) {
            throw 'IntLiter number is too big';
        }

        if (node.num < Const.WACC_MIN_INT) {
            throw 'IntLiter number is smaller than the lowest possible WACC number'
        }
    }

    visitIdentNode(node: NodeType.IdentNode):void {
        var res = this.currentST.lookupAll(node);
        
        if (!res) {
            throw 'Ident Node semantic error - the ident of ' + node + ' could not be found';
        }

        node.type = res.type;
    }

    visitReadNode(node: NodeType.ReadNode):void {
        var target = node.readTarget;
        target.visit(this);
        if (!SemanticUtil.isReadableType(target.type)) {
           
                throw 'Mate, you can only read into the basic types.'
     
        } else {
            return;
        }

        if (SemanticUtil.isType(target.type, NodeType.ArrayElemNode)) {


            var name = this.currentST.lookupAll((<NodeType.ArrayElemNode>target).ident).node;

            if (!name) {
                throw 'Mate, you should declare the things you read to...'
            }
        }
        else if (SemanticUtil.isType(target.type, NodeType.PairElemNode)) {

            var name = this.currentST.lookupAll((<NodeType.PairElemNode>target).ident).node;
            if (!name) {
                throw 'Mate, you should declare the things you read to...'
            }
        }
        else {
            throw "Buddy, know your types... You can only read to "
        }
    }

    visitPrintlnNode(node: NodeType.PrintlnNode):void {
        node.expr.visit(this);
    }
    
    visitUnOpNode(node: NodeType.UnOpNode): void {
        node.expr.visit(this);
        if (node.expr.type instanceof NodeType.ArrayTypeNode) {
            var ARRAY_TYPE = node.expr.type;
        }

        var opMap = {};
        function OperatorInfo(isPermittedType, returnType) {
            this.isPermittedType = isPermittedType;
            this.returnType = returnType;
        }

        var isType = SemanticUtil.isType;

        opMap['-'] = new OperatorInfo((t) => isType(t, NodeType.INT_TYPE), NodeType.INT_TYPE);
        opMap['!'] = new OperatorInfo((t)=> isType(t, NodeType.BOOL_TYPE), NodeType.BOOL_TYPE);
        opMap['ord'] = new OperatorInfo((t) => isType(t, NodeType.CHAR_TYPE), NodeType.INT_TYPE);
        opMap['chr'] = new OperatorInfo((t) => isType(t, NodeType.INT_TYPE), NodeType.CHAR_TYPE);
        opMap['len'] = new OperatorInfo((t) => isType(t, [NodeType.STRING_TYPE, ARRAY_TYPE]), NodeType.INT_TYPE);

        
        // Attempt to match the left operands type with an allowed type
        if (!opMap[node.operator].isPermittedType(node.expr.type)) {
            throw ('Oh my, your type is not valid for this unary operator');
        }

        node.type = opMap[node.operator].returnType;

    }

    visitExitNode(node: NodeType.ExitNode): void {
        node.expr.visit(this);

        if (!SemanticUtil.isType(node.expr.type, NodeType.INT_TYPE)) {
            throw "WHERE'S THE EXIT NUMBERS MAAAAAN"
        }
    }

    visitIfNode(node: NodeType.IfNode): void {
        node.predicateExpr.visit(this);

        if (!SemanticUtil.isType(node.predicateExpr.type, NodeType.BOOL_TYPE)) {
            throw "IF you're not a fucking dumbass, THEN get the type right"
        }

        this.enterNewScope(); //scope for the true branch
        SemanticUtil.visitNodeList(node.trueStatList, this);
        this.switchToParentScope(); //same parent but
        this.enterNewScope();       //different scope for the false branch
        SemanticUtil.visitNodeList(node.falseStatList, this);
        this.switchToParentScope();
    }



    visitPairElemNode(node: NodeType.PairElemNode):void {
        node.ident.visit(this);
        var res = this.currentST.lookupAll(node.ident);
        if (res) {

            if (!(res.type instanceof NodeType.PairTypeNode)) {
                throw 'you fucker, ident named ' + node.ident + ' is no pair !!!';
            }

        } else {
            throw 'bullshit';
        }
        if (node.index === 0) {
            node.type = res.type.type1;
        } else {
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
        // There is nothing to check here
    }


    visitSkipNode(node: NodeType.SkipNode): void { }
    visitPairTypeNode(node: NodeType.PairTypeNode):void { }
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): void { }
    
    visitIntTypeNode(node:NodeType.IntTypeNode): void { }
    visitBoolTypeNode(node:NodeType.BoolTypeNode): void { }
    visitCharTypeNode(node:NodeType.CharTypeNode): void { }
    visitStringTypeNode(node:NodeType.StringTypeNode): void { }
    visitEmptyArrayTypeNode(node: NodeType.EmptyArrayTypeNode) :void { }
    visitNullTypeNode(node: NodeType.NullTypeNode):void { }
}