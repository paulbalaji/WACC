import NodeType = require('./NodeType');
import SemanticUtil = require('./SemanticUtil');
import Error = require("./WACCError");
var _ = require('underscore');

export class ReturnVisitor implements NodeType.Visitor {
    // When checking each function, this field is set to valid return type of that function.
    expectedReturnType:any = null;

    // Checks valid returns in all functions and then check for invalid return in global scope.
    visitProgramNode(node: NodeType.ProgramNode): boolean {
         SemanticUtil.visitNodeList(node.functionList, this)
         this.expectedReturnType = null;
         SemanticUtil.visitNodeList(node.statList, this)
         return true;
    }

    // Return node must be of the right type. If expectedReturnType is not set, we are
    // are in global scope and visitor throws an error. Otherwise it checks if the 
    // expected and actual types match.
    visitReturnNode(node: NodeType.ReturnNode): boolean { 
        if (this.expectedReturnType === null) {
            throw new Error.SemanticError('Attempted return from global scope.'
                                         , node.errorLocation);
        
        }
        if (!SemanticUtil.isType(node.returnExpr.type, this.expectedReturnType)) {
            throw new Error.SemanticError('Incorrect return type. '
                                         +'Expecting: ' + this.expectedReturnType + ', '
                                         +'Actual: '    + node.returnExpr.type    + '.'
                                         , node.returnExpr.errorLocation);
        }
        return true;
    }

    // BeginEnd block can be an ancestor of valid return statement, so we need to check
    // all its children.
    visitBeginEndBlockNode(node: NodeType.BeginEndBlockNode): boolean {
        return _.some(SemanticUtil.visitNodeList(node.statList, this));
    }

    // Every function needs to have a return statement with matching type.
    visitFuncNode(node: NodeType.FuncNode): boolean {
        this.expectedReturnType = node.type;
        if (!_.some(_.map(node.statList, (statNode: NodeType.Visitable) => statNode.visit(this)))) {
            throw new Error.SemanticError('Function missing return statement.'
                                         , node.ident.errorLocation);
        }
        return true;
    }

    // Visit node requires that both branches to contain a return statement. 
    visitIfNode(node: NodeType.IfNode): boolean {
        var branch1 : boolean = _.some(SemanticUtil.visitNodeList(node.trueStatList, this))
        var branch2 : boolean = _.some(SemanticUtil.visitNodeList(node.falseStatList, this))
        
        return branch1 && branch2;
    }

    // Exit node acts as return.
    visitExitNode(node: NodeType.ExitNode): boolean { return true; }    

    // Implementation of other Node visit functions that by nature of the node
    // do not return nor they can be an valid ancestor of a return node.
    visitBinOpExprNode(node: NodeType.BinOpExprNode): boolean { return false; }
    visitStrLiterNode(node: NodeType.StrLiterNode): boolean { return false; }
    visitAssignNode(node: NodeType.AssignNode): boolean { return false; }
    visitPairTypeNode(node: NodeType.PairTypeNode): boolean { return false; }
    visitArrayLiterNode(node: NodeType.ArrayLiterNode): boolean { return false; }
    visitCharLiterNode(node: NodeType.CharLiterNode): boolean { return false; }
    visitParamNode(node: NodeType.ParamNode): boolean { return false; }
    visitFreeNode(node: NodeType.FreeNode): boolean { return false; }
    visitPrintNode(node: NodeType.PrintNode): boolean { return false; }
    visitDeclareNode(node: NodeType.DeclareNode): boolean { return false; }
    visitArrayElemNode(node: NodeType.ArrayElemNode): boolean { return false; }
    visitCallNode(node: NodeType.CallNode): boolean { return false; }
    visitPairLiterNode(node: NodeType.PairLiterNode): boolean { return false; }
    visitIntLiterNode(node: NodeType.IntLiterNode): boolean { return false; }
    visitIdentNode(node: NodeType.IdentNode): boolean { return false; }
    visitReadNode(node: NodeType.ReadNode): boolean { return false; }
    visitPrintlnNode(node: NodeType.PrintlnNode): boolean { return false; }
    visitUnOpNode(node: NodeType.UnOpNode): boolean { return false; }
    visitSkipNode(node: NodeType.SkipNode): boolean { return false; }
    visitArrayTypeNode(node: NodeType.ArrayTypeNode): boolean { return false; }
    visitNewPairNode(node: NodeType.NewPairNode): boolean { return false; }
    visitBoolLiterNode(node: NodeType.BoolLiterNode): boolean { return false; }
    visitPairElemNode(node: NodeType.PairElemNode): boolean { return false; }

    // There is no general guarantee that while loop is entered at runtime,
    // so even if it contains a return statement, we do not consider it.
    visitWhileNode(node: NodeType.WhileNode): boolean { return false; }
    
    visitIntTypeNode(node: NodeType.IntTypeNode): boolean { return false; }
    visitBoolTypeNode(node: NodeType.BoolTypeNode): boolean { return false; }
    visitCharTypeNode(node: NodeType.CharTypeNode): boolean { return false; }
    visitEmptyArrayTypeNode(node: NodeType.EmptyArrayTypeNode) { return false; }
    visitNullTypeNode(node: NodeType.NullTypeNode): boolean { return false; }
    
}