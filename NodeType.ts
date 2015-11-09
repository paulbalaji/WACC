///<reference path="node.d.ts"/>

import Const = require('./Constants');
import Error = require('./WACCError');
export interface Visitable {
        visit(v:Visitor):void;
}

export class TreeNode implements Visitable {
    public errorLocation: Error.ErrorLocation;

    visit(v: Visitor): void { throw 'TreeNode subclass visit method is not implemented.';}
    setErrorLocation(errorLocation: Error.ErrorLocation) {
        this.errorLocation = errorLocation;
    }
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
    // visitBaseTypeNode(node:BaseTypeNode):void;
    visitPairElemTypeNode(node:PairElemTypeNode):void;
    visitUnOpNode(node:UnOpNode): void;
    visitSkipNode(node:SkipNode): void;
    visitExitNode(node:ExitNode): void;
    visitIfNode(node:IfNode): void;
    visitArrayTypeNode(node:ArrayTypeNode): void;

    visitNewPairNode(node:NewPairNode): void;
    visitBoolLiterNode(node:BoolLiterNode): void;
    visitPairElemTypePAIRNode(node:PairElemTypePAIRNode): void;
    visitPairElemNode(node:PairElemNode): void;
    visitIntTypeNode(node:IntTypeNode): void;
    visitBoolTypeNode(node:BoolTypeNode): void;
    visitCharTypeNode(node:CharTypeNode): void;
    visitStringTypeNode(node:StringTypeNode): void;

    visitEmptyArrayTypeNode(node:EmptyArrayTypeNode);
    visitNullTypeNode(node:NullTypeNode): void;
}

export interface StatNode extends TreeNode {

}

export interface ExprNode extends TreeNode {
    type: TypeNode;
}

export interface AssignLHSNode extends TreeNode {
    type:TypeNode;

}

export interface AssignRHSNode extends TreeNode {
    type : TypeNode;
}

export interface TypeNode extends TreeNode {}


export class ProgramNode extends TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
        super();
        this.functionList = functionList;
        this.statList = statList;
    }

    visit(v:Visitor):void {
        v.visitProgramNode(this);        
    }

}

export class FuncNode extends TreeNode {
    type : TypeNode;
    ident : IdentNode;
    paramList : [ParamNode];
    statList : [StatNode];
    constructor(type : TypeNode, ident : IdentNode, paramList : [ParamNode], statList: [StatNode]) {
        super();
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }
    visit(v:Visitor):void {
        v.visitFuncNode(this);
    }



}


export class SkipNode extends TreeNode implements StatNode {
    constructor() {
        super();
    }
 
    visit(v:Visitor) {
         return v.visitSkipNode(this);
    }
}


export class ReadNode extends TreeNode implements StatNode {
    readTarget: AssignLHSNode;
    constructor(lhsNode:AssignLHSNode) {
        super();
        this.readTarget = lhsNode;
    }

    visit(v:Visitor):void {
        v.visitReadNode(this);
    }
 
}

export class PrintlnNode extends TreeNode implements StatNode {
    expr: ExprNode;
    constructor(expr : ExprNode) {
        super();
        this.expr = expr;

    }

    visit(v:Visitor):void {
        v.visitPrintlnNode(this);
    }

}

export class PairElemTypePAIRNode extends TreeNode implements TypeNode {
    // This is supposed to be empty, dont you worry child
    constructor() { super(); }
    visit(v:Visitor):void {
        v.visitPairElemTypePAIRNode(this);
    }

}

/*export class BaseTypeNode implements TypeNode {
    typeName: String;

    constructor(typeName:String) {
        this.typeName = typeName;
    }

     visit(v:Visitor):void {
        v.visitBaseTypeNode(this);
    }
}*/

export interface BaseTypeNode extends TreeNode, TypeNode {
}

export class IntTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }
    visit(v:Visitor) : void {
        v.visitIntTypeNode(this);
    }
}

export class CharTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }
    visit(v:Visitor) : void {
        v.visitCharTypeNode(this);
    }
}

export class BoolTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }
    visit(v:Visitor) : void {
        v.visitBoolTypeNode(this);
    }
}

export class StringTypeNode extends TreeNode implements BaseTypeNode {
     constructor() { super(); }
     visit(v:Visitor) : void {
        v.visitStringTypeNode(this);
    }
}

export class PairElemTypeNode extends TreeNode implements StatNode {
    type : TypeNode;

    constructor(type:TypeNode) {
        super();
        this.type = type;
    }

     visit(v:Visitor):void {
        v.visitPairElemTypeNode(this);
    }

}

export class IdentNode extends TreeNode implements ExprNode, AssignLHSNode {
    identStr : string;
    type : TypeNode; // Filled by semantic visitor

    constructor(identStr : string) {
        super();
        this.identStr = identStr;
    }
    visit(v:Visitor) : void {
        v.visitIdentNode(this);
    }
    toString() : string {
        return this.identStr;
    }
}

export class BinOpExprNode extends TreeNode implements ExprNode {
    leftOperand : ExprNode;
    rightOperand : ExprNode;
    operator : string;

    type : TypeNode; // Filled by semantic visitor

    constructor(leftOperand : ExprNode, rightOperand : ExprNode, operator : string) {
        super();
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    visit(v:Visitor):void {
        v.visitBinOpExprNode(this);
    }


}

export class StrLiterNode extends TreeNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor

    str : string;

    constructor(str : string) {
        super();
        this.str = str;
    }

    visit(v:Visitor):void {
        v.visitStrLiterNode(this);
    }
}

export class AssignNode extends TreeNode implements StatNode {
    lhs : AssignLHSNode;
    rhs : AssignRHSNode;
    constructor(lhs : AssignLHSNode, rhs : AssignRHSNode) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }

    visit(v:Visitor):void {
        v.visitAssignNode(this);
    }
}

// check lhs ident is declared previously in any of the parent scopes
// check lhs is the same type as rhs, or can be cast

export class BeginEndBlockNode extends TreeNode implements StatNode {
    statList:[StatNode]

    constructor(statList:[StatNode]) {
            super();
            this.statList = statList;
    }

    visit(v:Visitor): void {
        v.visitBeginEndBlockNode(this);
    }
}

export class ReturnNode extends TreeNode implements StatNode {
    returnExpr: ExprNode

    constructor(returnExpr:ExprNode) {
            super();
            this.returnExpr = returnExpr;
    }

    visit(v:Visitor): void {
        v.visitReturnNode(this);
    }
}

export class WhileNode extends TreeNode implements StatNode {
    predicateExpr: ExprNode
    loopBody: [StatNode]

    constructor(predicateExpr:ExprNode, loopBody:[StatNode]) {
            super();
            this.predicateExpr = predicateExpr;
            this.loopBody = loopBody;
    }

    visit(v:Visitor): void {
        v.visitWhileNode(this);
    }
}

export class PairTypeNode extends TreeNode implements TypeNode {
    type1: TypeNode;
    type2: TypeNode;

    constructor(type1:TypeNode, type2:TypeNode) {
        super();
        this.type1 = type1;
        this.type2 = type2;
    }

    visit(v:Visitor): void {
        v.visitPairTypeNode(this);
    }
}

export class ArrayLiterNode extends TreeNode implements AssignRHSNode {
     type : TypeNode; // Filled by semantic visitor

     exprList: [ExprNode];

     constructor(exprList:[ExprNode]) {
            super();
            this.exprList = exprList;
     }

     visit(v:Visitor):void {
         v.visitArrayLiterNode(this);
     }
}

export class CharLiterNode extends TreeNode implements ExprNode {
    ch: string;
    type : TypeNode; // Filled by semantic visitor

    constructor(ch:string) {
        super();
        this.ch = ch;
    }

    visit(v:Visitor):void {
        v.visitCharLiterNode(this);
    }
}

export class ExitNode extends TreeNode implements StatNode {
    expr: ExprNode;
    constructor(expr: ExprNode) {
        super();
        this.expr = expr;
    }
 
    visit(v:Visitor) {
        return v.visitExitNode(this);
    }
}
 
export class IfNode extends TreeNode implements StatNode {
    predicateExp: ExprNode;
    trueStatList: [StatNode];
    falseStatList: [StatNode];
 
    constructor(predicateExp: ExprNode,
                trueStatList: [StatNode],
                falseStatList: [StatNode]) {
        super();
        this.predicateExp = predicateExp;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
 
    visit(v:Visitor) {
        return v.visitIfNode(this);
    }
}
 
export class ArrayTypeNode extends TreeNode implements TypeNode {
    type: TypeNode;
    depth : number;
    constructor(type: TypeNode, depth: number) {
        super();
        this.type = type;
        this.depth = depth;
    }
 
    visit(v:Visitor) {
        return v.visitArrayTypeNode(this);
    }
}
 
export class PairElemNode extends TreeNode implements AssignLHSNode {
    type : TypeNode; // Filled by semantic visitor
    ident : IdentNode;
    index : number;
    
    constructor(ident : IdentNode, index : number) {
        super();
        this.ident = ident;
        this.index = index;
    }
 
    visit(v:Visitor) {
        return v.visitPairElemNode(this);
    }
}
 
export class NewPairNode extends TreeNode implements AssignRHSNode {
    type : TypeNode; // Filled by semantic visitor

    fstExpr: ExprNode;
    sndExpr: ExprNode;
 
    constructor(fstExpr: ExprNode, sndExpr: ExprNode) {
        super();
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
 
    visit(v:Visitor) {
        return v.visitNewPairNode(this);
    }
}
 
export class BoolLiterNode extends TreeNode implements ExprNode {
    bool: boolean;
    type : TypeNode; // Filled by semantic visitor

 
    constructor(bool: boolean) {
        super();
        this.bool = bool;
    }
 
    visit(v:Visitor) {
        return v.visitBoolLiterNode(this);
    }
}
 
export class UnOpNode extends TreeNode implements ExprNode {
    operator: string;
    expr: ExprNode;
    type : TypeNode; // Filled by semantic visitor

 
    constructor(operator: string, expr: ExprNode) {
        super();
        this.operator = operator;
        this.expr = expr;
    }
 
    visit(v:Visitor) {
        return v.visitUnOpNode(this);
    }
}

export class ParamNode extends TreeNode {
    type: any; // temporarily set to 'any' from TypeNode
    ident: IdentNode;

    constructor(type:TypeNode, ident:IdentNode) {
        super();
        this.type = type;
        this.ident = ident;
    }
    
    visit(v: Visitor): void {
        v.visitParamNode(this);
    }
}

export class FreeNode extends TreeNode implements StatNode {
    expr : ExprNode;

    constructor(expr:ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): void {
        v.visitFreeNode(this);
    }

}

export class PrintNode extends TreeNode implements StatNode {
    expr: ExprNode;

    constructor(expr:ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): void {
        v.visitPrintNode(this);
    }
}

export class DeclareNode extends TreeNode implements StatNode {
    type: TypeNode;
    ident: IdentNode;
    rhs: AssignRHSNode;

    constructor(type:TypeNode, ident:IdentNode, rhs:AssignRHSNode) {
        super();
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }

    visit(v: Visitor): void {
        v.visitDeclareNode(this);
    }
}

// check type is the type of rhs

export class ArrayElemNode extends TreeNode implements AssignLHSNode, ExprNode{
    ident: IdentNode;
    exprList: [ExprNode];
    type : TypeNode; // Filled by semantic visitor


    constructor(ident: IdentNode, exprList: [ExprNode]) {
        super();
        this.ident = ident;
        this.exprList = exprList;
    }

    visit(v: Visitor): void {
        v.visitArrayElemNode(this);
    }
}

export class CallNode extends TreeNode implements AssignRHSNode {
    ident: IdentNode;
    argList: [ExprNode];
    type : TypeNode; // Filled by semantic visitor


    constructor(ident:IdentNode, argList:[ExprNode]) {
        super();
        this.ident = ident;
        this.argList = argList;
    }

    visit(v: Visitor): void {
        v.visitCallNode(this);
    }
    
}

export class PairLiterNode extends TreeNode implements ExprNode {
    type : TypeNode; // Filled by semantic visitor

    constructor() { super(); }
    visit(v: Visitor): void {
        v.visitPairLiterNode(this);
    }
}

export class IntLiterNode extends TreeNode implements ExprNode {
    num : number; 
    type : TypeNode; // Filled by semantic visitor


    constructor(num:number) {
        super(); 
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

export class NullTypeNode extends TreeNode implements TypeNode{
    constructor() { super(); }
    visit(v: Visitor): void {
        v.visitNullTypeNode(this);
    }
}

export class EmptyArrayTypeNode extends TreeNode implements TypeNode{
    // This type is equal with any array type when compared
    constructor() { super(); }
    visit(v: Visitor): void {
        v.visitEmptyArrayTypeNode(this);
    }
}

export var INT_TYPE:IntTypeNode = new IntTypeNode();
export var CHAR_TYPE:CharTypeNode = new CharTypeNode();
export var BOOL_TYPE:BoolTypeNode = new BoolTypeNode();
export var STRING_TYPE:StringTypeNode = new ArrayTypeNode(CHAR_TYPE, 1);
export var EMPTY_ARRAY_TYPE:EmptyArrayTypeNode = new EmptyArrayTypeNode();
export var PAIR_ELEM_TYPE_PAIR:PairElemTypePAIRNode = new PairElemTypePAIRNode();
export var NULL_TYPE:NullTypeNode = new NullTypeNode();