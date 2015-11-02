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
        this.errors.push({ msg: 'You fucked up function semantics' });
    }

    visitBinOpExprNode(node: NodeType.BinOpExprNode):void {
        node.leftOperand.visit(this);
        node.rightOperand.visit(this);
       
        // REMEMBER however the two express ions must be the SAME type aswell as a required one
        var INT_TYPE = new NodeType.BaseTypeNode('int');
        var CHAR_TYPE = new NodeType.BaseTypeNode('char');
        var BOOL_TYPE = new NodeType.BaseTypeNode('bool');
        var ANY_TYPE = undefined;

        
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
        opMap['<=' ] = new OperatorInfo([INT_TYPE, CHAR_TYPE], BOOL_TYPE);

        opMap['=='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);
        opMap['!='] = new OperatorInfo([ANY_TYPE], BOOL_TYPE);

        opMap['&&'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);
        opMap['!!'] = new OperatorInfo([BOOL_TYPE], BOOL_TYPE);

        // First check that lhs of the binop is a required type for the operator
        var allowedTypes = opMap[node.operator].possibleTypes; // The allowed types for the opera tor
        
        // Attempt to match the left operands type with an allowed type
        
        var matchedLeftType = _.filter(allowedTypes,  (t) =>  this.checkSameType(node.leftOperand.type, t));
        
        if (!matchedLeftType) {
               throw ('Oh my, your type on lhs is  not v alid for the operator');
        } 
        
        // MID: Left type is  correct, check that the rhs type is the same
        
 if (!this.checkSameType(node.leftOperand.type, node.rightOperand.type)) {
            throw 'Fuck sake, its a binary operator and you should know by now that the types on lhs and rhs should be the same...';
        }
        
        
        

          

    }
    visitStrLiterNode(node: NodeType.StrLiterNode):void {
        node.type = new NodeType.BaseTypeNode('string');
    }

    visitReturnNode(node: NodeType.ReturnNode):void {}
    visitAssignNode(node: NodeType.AssignNode):void {
        node.lhs.visit(this);
        node.rhs.visit(this);

        if (!this.checkSameType(node.lhs.type, node.rhs.type)) {
            this.errors.push('AssignNode error lhs and rhs are not the same fucking type.  lhs type is ' + this.getType(node.lhs) + ' . rhs type is ' + this.getType(node.rhs));
        }

    }
    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode):void {}
    visitWhileNode(node: NodeType.WhileNode):void {}
    visitPairTypeNode(node: NodeType.PairTypeNode):void {}
    visitPairElemSndNode(node: NodeType.PairElemSndNode):void {}
    visitArrayLiterNode(node: NodeType.ArrayLiterNode):void {
        // Visit all expressions
        _.map(node.list, (expr: NodeType.Visitable) => expr.visit(this));

        // All expressions must be the same type
        // Some code here to check that...

        // Now fill in the type
        // TODO - fix below line. Assumes there is an elem in the list, returns null if there is not. ArrayDepth assumed to be 1
        node.type = node.list[0] ? new NodeType.ArrayTypeNode(node.list[0].type, 1): new NodeType.BaseTypeNode('lol');


    }
    visitCharLiterNode(node: NodeType.CharLiterNode):void {}
    visitParamNode(node: NodeType.ParamNode):void {}
    visitFreeNode(node: NodeType.FreeNode):void {}
    visitPrintNode(node: NodeType.PrintNode):void {}
    visitDeclareNode(node: NodeType.DeclareNode):void {
        node.type.visit(this);
        node.ident.visit(this);
        node.rhs.visit(this);
       
        var res = this.ST.lookupAll(node.ident);
        if (res) {
            this.errors.push("you fucked it - redeclaration")
            return;
        }
        
        if (!this.checkSameType(node.type, node.rhs.type)) {
            this.errors.push("Absolute nightmare.  Declare node: type of rhs does not match given type");
        }

       // console.log('inserting ' + node.ident + ' into ST with type ');
        // console.log(node.type);
        this.ST.insert(node.ident, node.type);


    }

    visitArrayElemNode(node: NodeType.ArrayElemNode):void {}
    visitCallNode(node: NodeType.CallNode):void {}
    visitPairLiterNode(node: NodeType.PairLiterNode):void {}
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
                this.errors.push("you fucker, ident named " + res.ident + " is no pair !!!")
            } 

        } else { 
            this.errors.push('bullshit');
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