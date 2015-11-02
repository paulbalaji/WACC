import NodeType = require('./NodeType');

var _ = require('underscore');

export class SemanticVisitor implements NodeType.Visitor {
    errors: any[];
    ST: any;

    getType(obj):string {
        return obj.constructor.name;
    }

    checkSameType(obj1, obj2):boolean {
        return this.getType(obj1) === this.getType(obj2) && _.isEqual(obj1, obj2);
    }

    constructor() {
        this.errors = [];
        this.ST = {};
        this.ST.table = {};
        this.ST.parent = null;
        this.ST.lookupAll = function (ident : string) : NodeType.DeclareNode {
            var result = this.table[ident];
            if (result) {
                return result;
            }
            if (this.parent) {
                return this.parent.lookupAll(ident);
            }
            return null;
        }

        this.ST.insert = function (ident : string, node: NodeType.DeclareNode):void {
            // PRE: the key is not already in the map
            this.table[ident] = node;
        }
    }

    visitProgramNode(node:NodeType.ProgramNode):void {
        //console.log('visiting a program node!');
        _.map(node.functionList, (functionNode:NodeType.Visitable) => functionNode.visit(this));
        _.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this));
    }

    visitFuncNode(node:NodeType.FuncNode) {
        //throw 'You fucked up function semantics';
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode):void {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);

        // REMEMBER however the two expressions must be the SAME type aswell as a required one
        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var ANY_TYPE = undefined;
        
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }

        opMap['+']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['-']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['*']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['/']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.INT_TYPE);
        opMap['%']  = new OperatorInfo([NodeType.INT_TYPE], NodeType.BOOL_TYPE);
        opMap['>']  = new OperatorInfo([NodeType.INT_TYPE,  NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['>='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<']  = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);
        opMap['<='] = new OperatorInfo([NodeType.INT_TYPE, NodeType.CHAR_TYPE], NodeType.BOOL_TYPE);

        opMap['=='] = new OperatorInfo([NodeType.ANY_TYPE], NodeType.BOOL_TYPE);
        opMap['!='] = new OperatorInfo([NodeType.ANY_TYPE], NodeType.BOOL_TYPE);

        opMap['&&'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);
        opMap['||'] = new OperatorInfo([NodeType.BOOL_TYPE], NodeType.BOOL_TYPE);

        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, (t) => this.checkSameType(node.leftOperand.type, t));
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type on lhs is not valid for the operator');
            }
        }
        // MID: Left type is  correct, check that the rhs type is the same
        
        if (!this.checkSameType(node.leftOperand.type, node.rightOperand.type)) {
            throw 'Fuck sake, its a binary operator and you should know by now that the types on lhs and rhs should be the same...';
        }

        node.type = opMap[node.operator].returnType;
    }

    visitStrLiterNode(node: NodeType.StrLiterNode):void {
        node.type = new NodeType.BaseTypeNode('string');
    }

    visitReturnNode(node: NodeType.ReturnNode):void {}
    visitAssignNode(node: NodeType.AssignNode):void {
        node.lhs.visit(this);
        node.rhs.visit(this);

        if (!this.checkSameType(node.lhs.type, node.rhs.type)) {
            throw 'AssignNode error lhs and rhs are not the same fucking type.  lhs type is ' + this.getType(node.lhs) + ' . rhs type is ' + this.getType(node.rhs);
        }

    }

    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode):void {}
    visitWhileNode(node: NodeType.WhileNode):void {}
    visitPairTypeNode(node: NodeType.PairTypeNode):void {}
    visitPairElemSndNode(node: NodeType.PairElemSndNode):void {}
    visitArrayLiterNode(node: NodeType.ArrayLiterNode):void {
        // Visit all expressions
        _.map(node.exprList, (expr: NodeType.Visitable) => expr.visit(this));

        if (_.isEmpty(node.exprList)) { // The case that the list is empty
            // Nothing more to check, just fill in the node type as null
            node.type = null;
            
        } else { // The case that the list is not empty
            // Check that all expressions are of the same type
            var type = node.exprList[0].type;
            // Check that all types are equal to type

            // mismatchedTypes is a list of types which do not match the first one in the list
            var mismatchedTypes = _.filter(node.exprList, (expr) => !this.checkSameType(type, expr.type));

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
        node.ident.visit(this);

    }

    visitFreeNode(node: NodeType.FreeNode):void {}
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {
        node.type.visit(this);
        
        node.rhs.visit(this);
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            throw 'you fucked it - redeclaration';
            return;
        }

        /*
         In the case that rhs is an array liter node, we must consider the case that is empty ([]).
         If it is a list of empty expressions, then it is the rspsonsibility of declare node to fill
         in the type. 
         This is because an ArrayLiterNode, [] cannot know its type and so cannot fill it in.

          If you have enjoyed my essay then please leave me a mark out of 10 in the fields below:
          Jan:
          Andrea:
          Paul:
        */
        
        if(node.rhs instanceof NodeType.ArrayLiterNode) {
            var arrayLiter:any = node.rhs;
            if(_.isEmpty(arrayLiter.exprList)) {
                arrayLiter.type = node.type;
            }
        }

        if (!this.checkSameType(node.type, node.rhs.type)) {
            throw 'Absolute nightmare.  Declare node: type of rhs does not match given type';
        }

        this.ST.insert(node.ident, node.type);
        node.ident.visit(this);
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode):void {
        _.map(node.exprList, (exprNode: NodeType.Visitable) => exprNode.visit(this));
        node.ident.visit(this);
        // Check if every index is an integer
        console.log("Hi")
        if (!_.every(node.exprList, (exprNode: NodeType.ExprNode) => this.checkSameType(exprNode.type, NodeType.INT_TYPE))) {
            throw "List indices must be integers mate. I know you are trying hard, but you should be more careful in the future.";
        }
        var res = this.ST.lookupAll(node.ident);
        if (!res) {
            throw 'Mate, fucking declare your arrays before you use them.';
        }
        console.log(res)
        if (!(res instanceof NodeType.ArrayTypeNode)) {
            throw "Mate, you are trying to index something which is not an array. have you been drinking?";
        }

        if (!(res.depth != node.exprList.length)) {
            throw "Mate, its hard imagining objects in many dimensions, you have probably failed."

        }
        node.type = res.type;



    }

    visitCallNode(node: NodeType.CallNode):void {
        node.ident.visit(this);
        node.argList = _.map(node.argList, (arg) => arg.visit(this));

        var funcNode = { argList : node.argList, ident : node.ident};
        //compare arguments
        if (node.argList.length === funcNode.argList.length) {
            for (var i = 0; i < node.argList.length; i++) {
                if(!this.checkSameType(node.argList[i], funcNode.argList[i])) {
                    throw 'Come on man, pass the correct arguments ffs'
                }
            }
        } else {
            throw 'Learn how to count, get the number of arguments right'
        }

        //compare return types
        if(!this.checkSameType(node.ident, funcNode.ident)) {
            throw 'Is it so hard to return the right fricking things?'
        }

        node.type = node.ident.type;
    }

    visitPairLiterNode(node: NodeType.PairLiterNode):void {


    }

    visitIntLiterNode(node: NodeType.IntLiterNode):void {
        node.type = new NodeType.BaseTypeNode('int');
    }

    visitIdentNode(node: NodeType.IdentNode):void {
        var res = this.ST.lookupAll(node.identStr);
        
        if (!res) {
            throw 'Ident Node semantic error - the ident of ' + node + ' could not be found';
        }

        node.type = res;
    }

    visitReadNode(node: NodeType.ReadNode):void {}
    visitPrintlnNode(node: NodeType.PrintlnNode):void {}
    visitBaseTypeNode(node: NodeType.BaseTypeNode):void {}
    visitPairElemTypeNode(node: NodeType.PairElemTypeNode):void {}
    
    visitUnOpNode(node: NodeType.UnOpNode): void {
        node.expr.visit(this);

        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var STRING_TYPE = new NodeType.BaseTypeNode('string');
        var ANY_TYPE = undefined;

        if (node.expr.type instanceof NodeType.ArrayTypeNode) {
            var ARRAY_TYPE = node.expr.type;
        }

        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }

        opMap['!'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        opMap['-'] = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['len'] = new OperatorInfo([STRING_TYPE, ARRAY_TYPE], INT_TYPE);
        opMap['ord'] = new OperatorInfo([CHAR_TYPE], INT_TYPE);
        opMap['chr'] = new OperatorInfo([INT_TYPE], CHAR_TYPE);

        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, (t) => this.checkSameType(node.expr.type, t));
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type is not valid for this unary operator');
            }
        }

        node.type = opMap[node.operator].returnType;

    }
    
    visitSkipNode(node: NodeType.SkipNode): void {}
    visitExitNode(node: NodeType.ExitNode): void {}
    visitIfNode(node: NodeType.IfNode): void {}
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): void {}
    visitPairElemFstNode(node: NodeType.PairElemFstNode): void {
        var res : NodeType.DeclareNode = this.ST.lookupAll(node.ident);
        if (res) {
            if (!(res.type instanceof NodeType.PairTypeNode)) {
                throw 'you fucker, ident named ' + res.ident + ' is no pair !!!';
            }

        } else {
            throw 'bullshit';
        }
    }
    visitNewPairNode(node: NodeType.NewPairNode): void {
        node.fstExpr.visit(this);
        node.sndExpr.visit(this);

        // The type of the node is the type of the pair
        node.type = new NodeType.PairTypeNode(node.fstExpr.type, node.sndExpr.type);
    }
    visitBoolLiterNode(node: NodeType.BoolLiterNode): void {
        node.type = new NodeType.BaseTypeNode('bool');
        // There is nothing to check here
    }

    visitPairElemTypePAIRNode(node: NodeType.PairElemTypePAIRNode): void {
        //TODO
    }
}