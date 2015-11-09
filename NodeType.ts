///<reference path="node.d.ts"/>

import Const = require('./Constants');

export interface TreeNode extends Visitable{
    visit(v:Visitor):any;
}
 
export interface Visitor {
    visitProgramNode(node:ProgramNode):any;
    visitBinOpExprNode(node:BinOpExprNode):any;
    visitStrLiterNode(node:StrLiterNode):any;
    visitReturnNode(node:ReturnNode):any;
    visitAssignNode(node:AssignNode):any;
    visitBeginEndBlockNode(node:BeginEndBlockNode):any;
    visitWhileNode(node:WhileNode):any;
    visitPairTypeNode(node:PairTypeNode):any;
    visitArrayLiterNode(node:ArrayLiterNode):any;
    visitCharLiterNode(node:CharLiterNode):any;
    visitParamNode(node:ParamNode):any;
    visitFreeNode(node:FreeNode):any;
    visitPrintNode(node:PrintNode):any;
    visitDeclareNode(node:DeclareNode):any;
    visitArrayElemNode(node:ArrayElemNode):any;
    visitCallNode(node:CallNode):any;
    visitPairLiterNode(node:PairLiterNode):any;
    visitIntLiterNode(node:IntLiterNode):any;
    visitFuncNode(node:FuncNode):any;
    visitIdentNode(node:IdentNode):any;
    visitSkipNode(node:SkipNode):any;
    visitReadNode(node:ReadNode):any;
    visitPrintlnNode(node:PrintlnNode):any;
    visitUnOpNode(node:UnOpNode): any;
    visitSkipNode(node:SkipNode): any;
    visitExitNode(node:ExitNode): any;
    visitIfNode(node:IfNode): any;
    visitArrayTypeNode(node:ArrayTypeNode): any;
    visitNewPairNode(node:NewPairNode): any;
    visitBoolLiterNode(node:BoolLiterNode): any;
    visitPairElemNode(node:PairElemNode): any;

    visitIntTypeNode(node:IntTypeNode): any;
    visitBoolTypeNode(node:BoolTypeNode): any;
    visitCharTypeNode(node:CharTypeNode): any;
    visitStringTypeNode(node:StringTypeNode): any;
    visitEmptyArrayTypeNode(node:EmptyArrayTypeNode);
    visitNullTypeNode(node:NullTypeNode): any;
}

export interface Visitable {
        visit(v:Visitor):any;
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


export class ProgramNode implements TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
    
        this.functionList = functionList;
        this.statList = statList;
    }

    visit(v:Visitor):void {
        return v.visitProgramNode(this);        
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
    visit(v:Visitor):any {
        return v.visitFuncNode(this);
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
        return v.visitReadNode(this);
    }
 
}

export class PrintlnNode implements StatNode {
    expr : ExprNode;
    constructor(expr : ExprNode) {
        this.expr = expr;

    }

    visit(v:Visitor):void {
        return v.visitPrintlnNode(this);
    }

}

export interface BaseTypeNode extends TypeNode {
}

export class IntTypeNode implements BaseTypeNode {
     visit(v:Visitor) : void {
        return v.visitIntTypeNode(this);
    }
}

export class CharTypeNode implements BaseTypeNode {
     visit(v:Visitor) : void {
        return v.visitCharTypeNode(this);
    }
}

export class BoolTypeNode implements BaseTypeNode {
     visit(v:Visitor) : void {
        return v.visitBoolTypeNode(this);
    }
}

export class StringTypeNode implements BaseTypeNode {
     visit(v:Visitor) : void {
        return v.visitStringTypeNode(this);
    }
}

export class IdentNode implements ExprNode, AssignLHSNode {
    identStr : string;
    type : TypeNode; // Filled by semantic visitor

    constructor(identStr : string) {
        this.identStr = identStr;
    }
    visit(v:Visitor) : void {
        return v.visitIdentNode(this);
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
        return v.visitBinOpExprNode(this);
    }


}

export class StrLiterNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor

    str : string;

    constructor(str : string) {
        this.str = str;
    }

    visit(v:Visitor):void {
        return v.visitStrLiterNode(this);
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
        return v.visitAssignNode(this);
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
        return v.visitBeginEndBlockNode(this);
    }
}

export class ReturnNode implements StatNode {
    returnExpr: ExprNode

    constructor(returnExpr:ExprNode) {
            this.returnExpr = returnExpr;
    }

    visit(v:Visitor): void {
        return v.visitReturnNode(this);
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
        return v.visitWhileNode(this);
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
        return v.visitPairTypeNode(this);
    }
}

export class ArrayLiterNode implements AssignRHSNode {
     type : TypeNode; // Filled by semantic visitor

     exprList: [ExprNode];

     constructor(exprList:[ExprNode]) {
            this.exprList = exprList;
     }

     visit(v:Visitor):void {
         return v.visitArrayLiterNode(this);
     }
}

export class CharLiterNode implements ExprNode {
    ch: string;
    type : TypeNode; // Filled by semantic visitor

    constructor(ch:string) {
            this.ch = ch;
    }

    visit(v:Visitor):void {
        return v.visitCharLiterNode(this);
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
    predicateExpr: ExprNode;
    trueStatList: [StatNode];
    falseStatList: [StatNode];
 
    constructor(predicateExpr: ExprNode,
                trueStatList: [StatNode],
                falseStatList: [StatNode]) {
 
        this.predicateExpr = predicateExpr;
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
 
export class PairElemNode implements AssignLHSNode {
    type : TypeNode; // Filled by semantic visitor
    ident : IdentNode;
    index : number;
    
    constructor(ident : IdentNode, index : number) {
        this.ident = ident;
        this.index = index;
    }
 
    visit(v:Visitor) {
        return v.visitPairElemNode(this);
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
    operator: string;
    expr: ExprNode;
    type : TypeNode; // Filled by semantic visitor

 
    constructor(operator: string, expr: ExprNode) {
        this.operator = operator;
        this.expr = expr;
    }
 
    visit(v:Visitor) {
        return v.visitUnOpNode(this);
    }
}

export class ParamNode implements TreeNode {
    type: TypeNode; // temporarily set to 'any' from TypeNode
    ident: IdentNode;

    constructor(type:TypeNode, ident:IdentNode) {
        this.type = type;
        this.ident = ident;
    }
    
    visit(v: Visitor): void {
        return v.visitParamNode(this);
    }
}

export class FreeNode implements StatNode {
    expr : ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

    visit(v: Visitor): void {
        return v.visitFreeNode(this);
    }

}

export class PrintNode implements StatNode {
    expr: ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

    visit(v: Visitor): void {
        return v.visitPrintNode(this);
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
        return v.visitDeclareNode(this);
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
        return v.visitArrayElemNode(this);
    }
}

export class CallNode implements AssignRHSNode {
    ident: IdentNode;
    argList: [ExprNode];
    type : TypeNode; // Filled by semantic visitor


    constructor(ident:IdentNode, argList:[ExprNode]) {
        this.ident = ident;
        this.argList = argList;
    }

    visit(v: Visitor): void {
        return v.visitCallNode(this);
    }
    
}

export class PairLiterNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor


    visit(v: Visitor): void {
        return v.visitPairLiterNode(this);
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
        return v.visitIntLiterNode(this);
    }

}

export class NullTypeNode implements TypeNode{
    visit(v: Visitor): void {
        return v.visitNullTypeNode(this);
    }
}

export class EmptyArrayTypeNode implements TypeNode{
    // This type is equal with any array type when compared
    visit(v: Visitor): void {
        return v.visitEmptyArrayTypeNode(this);
    }
}

export var INT_TYPE:IntTypeNode = new IntTypeNode();
export var CHAR_TYPE:CharTypeNode = new CharTypeNode();
export var BOOL_TYPE:BoolTypeNode = new BoolTypeNode();
export var STRING_TYPE:StringTypeNode = new ArrayTypeNode(CHAR_TYPE, 1);
export var EMPTY_ARRAY_TYPE:EmptyArrayTypeNode = new EmptyArrayTypeNode();
export var NULL_TYPE:NullTypeNode = new NullTypeNode();