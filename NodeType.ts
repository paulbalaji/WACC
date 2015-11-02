///<reference path="node.d.ts"/>

import Const = require('./Constants');
export  var INT_TYPE = new BaseTypeNode('int');
export  var CHAR_TYPE = new BaseTypeNode('char');
export  var BOOL_TYPE = new BaseTypeNode('bool');
export var ANY_TYPE = null;
export interface TreeNode extends Visitable{
    visit(v:Visitor):void;
}
 
export interface Visitor {
    visitProgramNode(node:ProgramNode):void;
    visitBinOpExprNode(node:BinOpExprNode):void;
    visitStrLiterNode(node:StrLiterNode):void;
    visitReturnNode(node:ReturnNode):void;
    visitAssignNode(node:AssignNode):void;
    visitBeginEndBlockNode(node:BeginEndBlockNode):void;
    visitWhileNode(node:WhileNode):void;
    visitPairTypeNode(node:PairTypeNode):void;
    visitPairElemSndNode(node:PairElemSndNode):void;
    visitArrayLiterNode(node:ArrayLiterNode):void;
    visitCharLiterNode(node:CharLiterNode):void;
    visitParamNode(node:ParamNode):void;
    visitFreeNode(node:FreeNode):void;
    visitPrintNode(node:PrintNode):void;
    visitDeclareNode(node:DeclareNode):void;
    visitArrayElemNode(node:ArrayElemNode):void;
    visitCallNode(node:CallNode):void;
    visitPairLiterNode(node:PairLiterNode):void;
    visitIntLiterNode(node:IntLiterNode):void;
    visitFuncNode(node:FuncNode):void;
    visitIdentNode(node:IdentNode):void;
    visitSkipNode(node:SkipNode):void;
    visitReadNode(node:ReadNode):void;
    visitPrintlnNode(node:PrintlnNode):void;
    visitBaseTypeNode(node:BaseTypeNode):void;
    visitPairElemTypeNode(node:PairElemTypeNode):void;
    visitUnOpNode(node:UnOpNode): void;
    visitSkipNode(node:SkipNode): void;
    visitExitNode(node:ExitNode): void;
    visitIfNode(node:IfNode): void;
    visitArrayTypeNode(node:ArrayTypeNode): void;
    visitPairElemFstNode(node:PairElemFstNode): void;
    visitNewPairNode(node:NewPairNode): void;
    visitBoolLiterNode(node:BoolLiterNode): void;
    visitPairElemTypePAIRNode(node:PairElemTypePAIRNode): void;
}

export interface Visitable {
        visit(v:Visitor):void;
}

export interface StatNode extends TreeNode {

}

export interface ExprNode extends TreeNode {
    type : TypeNode;
}

export interface AssignLHSNode extends TreeNode {
    type:TypeNode;
}

export interface AssignRHSNode extends TreeNode {
    type : TypeNode;
}

export interface TypeNode extends TreeNode {}

export interface PairElemNode extends TreeNode {

}

export class ProgramNode implements TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
    
        this.functionList = functionList;
        this.statList = statList;
    }

    visit(v:Visitor):void {
        v.visitProgramNode(this);        
    }

}

export class FuncNode implements TreeNode {
    type : TypeNode;
    ident : IdentNode;
    paramList : [ParamNode];
    statList : [StatNode];
    constructor(type : TypeNode, ident : IdentNode, paramList : [ParamNode], statList: [StatNode]) {
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }
    visit(v:Visitor):void {
        v.visitFuncNode(this);
    }



}


export class SkipNode implements StatNode {
    constructor() {
    }
 
    visit(v:Visitor) {
         return v.visitSkipNode(this);
    }
}


export class ReadNode implements StatNode {
    readTarget : AssignLHSNode
    constructor(lhsNode:AssignLHSNode) {
        this.readTarget = lhsNode;
    }

    visit(v:Visitor):void {
        v.visitReadNode(this);
    }
 
}

export class PrintlnNode implements StatNode {
    expr : ExprNode;
    constructor(expr : ExprNode) {
        this.expr = expr;

    }

    visit(v:Visitor):void {
        v.visitPrintlnNode(this);
    }

}

export class PairElemTypePAIRNode implements TypeNode {
    // This is supposed to be empty, dont you worry child

    visit(v:Visitor):void {
        v.visitPairElemTypePAIRNode(this);
    }

}

export class BaseTypeNode implements TypeNode {
    typeName: String;

    constructor(typeName:String) {
        this.typeName = typeName;
    }

     visit(v:Visitor):void {
        v.visitBaseTypeNode(this);
    }
}

export class PairElemTypeNode implements StatNode {
    type : TypeNode;

    constructor(type:TypeNode) {
        this.type = type;
    }

     visit(v:Visitor):void {
        v.visitPairElemTypeNode(this);
    }

}

export class IdentNode implements ExprNode, AssignLHSNode {
    identStr : string;
    type : TypeNode; // Filled by semantic visitor

    constructor(identStr : string) {
        this.identStr = identStr;
    }
     visit(v:Visitor) : void {
        v.visitIdentNode(this);
    }
    toString() : string {
        return this.identStr;
    }
}

export class BinOpExprNode implements ExprNode {
    leftOperand : ExprNode;
    rightOperand : ExprNode;
    operator : string;

    type : TypeNode; // Filled by semantic visitor

    constructor(leftOperand : ExprNode, rightOperand : ExprNode, operator : string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    visit(v:Visitor):void {
        v.visitBinOpExprNode(this);
    }


}

export class StrLiterNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor

    str : string;

    constructor(str : string) {
        this.str = str;
    }

    visit(v:Visitor):void {
        v.visitStrLiterNode(this);
    }
}

export class AssignNode implements StatNode {
    lhs : AssignLHSNode;
    rhs : AssignRHSNode;
    constructor(lhs : AssignLHSNode, rhs : AssignRHSNode) {
        this.lhs = lhs;
        this.rhs = rhs;
    }

    visit(v:Visitor):void {
        v.visitAssignNode(this);
    }
}

// check lhs ident is declared previously in any of the parent scopes
// check lhs is the same type as rhs, or can be cast

export class BeginEndBlockNode implements StatNode {
    statList:[StatNode]

    constructor(statList:[StatNode]) {
            this.statList = statList;
    }

    visit(v:Visitor): void {
        v.visitBeginEndBlockNode(this);
    }
}

export class ReturnNode implements StatNode {
    returnExpr: ExprNode

    constructor(returnExpr:ExprNode) {
            this.returnExpr = returnExpr;
    }

    visit(v:Visitor): void {
        v.visitReturnNode(this);
    }
}

export class WhileNode implements StatNode {
    predicateExpr: ExprNode
    loopBody: [StatNode]

    constructor(predicateExpr:ExprNode, loopBody:[StatNode]) {
            this.predicateExpr = predicateExpr;
            this.loopBody = loopBody;
    }

    visit(v:Visitor): void {
        v.visitWhileNode(this);
    }
}

export class PairTypeNode implements TypeNode {
    type1: TypeNode;
    type2: TypeNode;

    constructor(type1:TypeNode, type2:TypeNode) {
            this.type1 = type1;
            this.type2 = type2;
    }

    visit(v:Visitor): void {
        v.visitPairTypeNode(this);
    }
}

export class PairElemSndNode implements PairElemNode {
    expr: ExprNode

    constructor(expr:ExprNode) {
            this.expr = expr;
    }

    visit(v:Visitor):void {
        v.visitPairElemSndNode(this);
    }
}

export class ArrayLiterNode implements AssignRHSNode {
     type : TypeNode; // Filled by semantic visitor

     list: [ExprNode];

     constructor(list:[ExprNode]) {
            this.list = list;
     }

     visit(v:Visitor):void {
         v.visitArrayLiterNode(this);
     }
}

export class CharLiterNode implements ExprNode {
    ch: string;
    type : TypeNode; // Filled by semantic visitor

    constructor(ch:string) {
            this.ch = ch;
    }

    visit(v:Visitor):void {
        v.visitCharLiterNode(this);
    }
}

export class ExitNode implements StatNode {
    expr: ExprNode;
    constructor(expr: ExprNode) {
        this.expr = expr;
    }
 
    visit(v:Visitor) {
        return v.visitExitNode(this);
    }
}
 
export class IfNode implements StatNode {
    predicateExp: ExprNode;
    trueStatList: [StatNode];
    falseStatList: [StatNode];
 
    constructor(predicateExp: ExprNode,
                trueStatList: [StatNode],
                falseStatList: [StatNode]) {
 
        this.predicateExp = predicateExp;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
 
    visit(v:Visitor) {
        return v.visitIfNode(this);
    }
}
 
export class ArrayTypeNode implements TypeNode {
    type: TypeNode;
    depth : number;
    constructor(type: TypeNode, depth: number) {
        this.type = type;
        this.depth = depth;
    }
 
    visit(v:Visitor) {
        return v.visitArrayTypeNode(this);
    }
}
 
export class PairElemFstNode implements PairElemNode {
    ident : IdentNode;
 
    constructor(ident: IdentNode) {
        this.ident = ident;
    }
 
    visit(v:Visitor) {
        return v.visitPairElemFstNode(this);
    }
}
 
export class NewPairNode implements AssignRHSNode {
    type : TypeNode; // Filled by semantic visitor

    fstExpr: ExprNode;
    sndExpr: ExprNode;
 
    constructor(fstExpr: ExprNode, sndExpr: ExprNode) {
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
 
    visit(v:Visitor) {
        return v.visitNewPairNode(this);
    }
}
 
export class BoolLiterNode implements ExprNode {
    bool: boolean;
    type : TypeNode; // Filled by semantic visitor

 
    constructor(bool: boolean) {
        this.bool = bool;
    }
 
    visit(v:Visitor) {
        return v.visitBoolLiterNode(this);
    }
}
 
export class UnOpNode implements ExprNode {
    unOp: string;
    expr: ExprNode;
    type : TypeNode; // Filled by semantic visitor

 
    constructor(unOp: string, expr: ExprNode) {
        this.unOp = unOp;
        this.expr = expr;
    }
 
    visit(v:Visitor) {
        return v.visitUnOpNode(this);
    }
}

export class ParamNode {
    type: TypeNode;
    ident: IdentNode;

    constructor(type:TypeNode, ident:IdentNode) {
        this.type = type;
        this.ident = ident;
    }
    
    visit(v: Visitor): void {
        v.visitParamNode(this);
    }
}

export class FreeNode implements StatNode {
    expr : ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

    visit(v: Visitor): void {
        v.visitFreeNode(this);
    }

}

export class PrintNode implements StatNode {
    expr: ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

    visit(v: Visitor): void {
        v.visitPrintNode(this);
    }
}

export class DeclareNode implements StatNode {
    type: TypeNode;
    ident: IdentNode;
    rhs: AssignRHSNode;

    constructor(type:TypeNode, ident:IdentNode, rhs:AssignRHSNode) {
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }

    visit(v: Visitor): void {
        v.visitDeclareNode(this);
    }
}

// check type is the type of rhs

export class ArrayElemNode implements AssignLHSNode, ExprNode{
    ident: IdentNode;
    exprList: [ExprNode];
    type : TypeNode; // Filled by semantic visitor


    constructor(ident: IdentNode, exprList: [ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }

    visit(v: Visitor): void {
        v.visitArrayElemNode(this);
    }
}

export class CallNode implements AssignRHSNode {
    ident: IdentNode;
    exprList: [ExprNode];
    type : TypeNode; // Filled by semantic visitor


    constructor(ident:IdentNode, exprList:[ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }

    visit(v: Visitor): void {
        v.visitCallNode(this);
    }
    
}

export class PairLiterNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor


    visit(v: Visitor): void {
        v.visitPairLiterNode(this);
    }
}

export class IntLiterNode implements ExprNode {
    num : number; 
    type : TypeNode; // Filled by semantic visitor


    constructor(num:number) {
        this.num = num;
    }

    check():boolean {
        if (this.num > Const.WACC_MAX_INT) {
            console.log('Error exceeds maxint');
        }

        if (this.num < Const.WACC_MIN_INT) {
            console.log('Error exceeds maxint');
        }


        return true;
    }

    visit(v: Visitor): void {
        v.visitIntLiterNode(this);
    }

}