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
        console.log('visiting a program node!');
        _.map(node.functionList, (functionNode:NodeType.Visitable) => functionNode.visit(this));
        _.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this));
    }

    visitFuncNode(node:NodeType.FuncNode) {
        throw 'You fucked up function semantics';
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode):void {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);

        // REMEMBER however the two express ions must be the SAME type aswell as a required one
        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var ANY_TYPE = null;

        
        var opMap = {};
        function OperatorInfo(possibleTypes, returnType) {
            this.possibleTypes = possibleTypes;
            this.returnType = returnType;
        }

        opMap['+']  = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['-']  = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['*']  = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['/']  = new OperatorInfo([INT_TYPE], INT_TYPE);
        opMap['%']  = new OperatorInfo([INT_TYPE], BOOL_TYPE);
        opMap['>']  = new OperatorInfo([INT_TYPE,  CHAR_TYPE], BOOL_TYPE);
        opMap['>='] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['<']  = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);
        opMap['<='] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);

        opMap['=='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);
        opMap['!='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);

        opMap['&&'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        opMap['||'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);

        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        
        // If any type is allowed, we do not need to check
        if (allowedTypes[0]) {
            // Attempt to match the left operands type with an allowed type
            var matchedLeftType = _.filter(allowedTypes, (t) => this.checkSameType(node.leftOperand.type, t));
            if (matchedLeftType.length === 0) {
                throw ('Oh my, your type on lhs is not v alid for the operator');
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
        _.map(node.list, (expr: NodeType.Visitable) => expr.visit(this));

        if (node.list.length === 0) { // The case that the list is empty
            // Nothing more to check, just fill in the node type as null
            node.type = null;
        } else { // The case that the list is not empty

            // Check that all expressions are of the same type
            var type = node.list[0].type;

            // Check that all types are equal to type
            if (!_.isEmpty(_.filter(node.list, (expr) => this.checkSameType(type, expr)))) {
                throw 'Deary deary me.  In an array liter node all expressions must be of the same type';
            }

            node.type = new NodeType.ArrayTypeNode(node.list[0].type, 1);

        }

        // Now fill in the type
        // If the list is not empty, set its type to corresponding array type, otherwise set type null§

    }

    visitCharLiterNode(node: NodeType.CharLiterNode):void {

    }

    visitParamNode(node: NodeType.ParamNode):void {}
    visitFreeNode(node: NodeType.FreeNode):void {}
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {
        node.type.visit(this);
        node.ident.visit(this);
        node.rhs.visit(this);

        var res = this.ST.lookupAll(node.ident);
        if (res) {
            throw 'you fucked it - redeclaration';
            return;
        }

        if (!this.checkSameType(node.type, node.rhs.type)) {
            throw 'Absolute nightmare.  Declare node: type of rhs does not match given type';
        }

        this.ST.insert(node.ident, node.type);
    }

    visitArrayElemNode(node: NodeType.ArrayElemNode):void {}
    visitCallNode(node: NodeType.CallNode):void {}
    visitPairLiterNode(node: NodeType.PairLiterNode):void {


    }

    visitIntLiterNode(node: NodeType.IntLiterNode):void {
        node.type = new NodeType.BaseTypeNode('int');
    }

    visitIdentNode(node: NodeType.IdentNode):void {
        node.type = this.ST.lookupAll(node.identStr);
    }

    visitReadNode(node: NodeType.ReadNode):void {}
    visitPrintlnNode(node: NodeType.PrintlnNode):void {}
    visitBaseTypeNode(node: NodeType.BaseTypeNode):void {}
    visitPairElemTypeNode(node: NodeType.PairElemTypeNode):void {}
    visitUnOpNode(node: NodeType.UnOpNode): void {}
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