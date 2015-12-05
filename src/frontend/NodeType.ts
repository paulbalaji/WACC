///<reference path="../node.d.ts"/>

import Error = require('./WACCError');
import SemanticUtil = require('./SemanticUtil');

export interface Visitable {
    visit(v:Visitor):any;
}

export class TreeNode implements Visitable {
    public errorLocation: Error.ErrorLocation;

    visit(v: Visitor):any { throw 'TreeNode subclass visit method is not implemented.'; }
    setErrorLocation(errorLocation: Error.ErrorLocation) {
        this.errorLocation = errorLocation;
    }
}

export interface Visitor {
    visitProgramNode(node:ProgramNode): any;
    visitBinOpExprNode(node:BinOpExprNode): any;
    visitStrLiterNode(node:StrLiterNode): any;
    visitReturnNode(node:ReturnNode): any;
    visitAssignNode(node:AssignNode): any;
    visitBeginEndBlockNode(node:BeginEndBlockNode): any;
    visitWhileNode(node:WhileNode): any;
    visitPairTypeNode(node:PairTypeNode): any;
    visitArrayLiterNode(node:ArrayLiterNode): any;
    visitCharLiterNode(node:CharLiterNode): any;
    visitParamNode(node:ParamNode): any;
    visitFreeNode(node:FreeNode): any;
    visitPrintNode(node:PrintNode): any;
    visitDeclareNode(node:DeclareNode): any;
    visitArrayElemNode(node:ArrayElemNode): any;
    visitCallNode(node:CallNode): any;
    visitPairLiterNode(node:PairLiterNode): any;
    visitIntLiterNode(node:IntLiterNode): any;
    visitFuncNode(node:FuncNode): any;
    visitIdentNode(node:IdentNode): any;
    visitReadNode(node:ReadNode): any;
    visitPrintlnNode(node:PrintlnNode): any;
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
    visitEmptyArrayTypeNode(node:EmptyArrayTypeNode): any;
    visitNullTypeNode(node:NullTypeNode): any;
}

export interface Visitable {
    visit(v: Visitor): any;
}

export interface StatNode extends TreeNode {}

export interface ExprNode extends TreeNode {
    type: TypeNode;
}

export interface AssignLHSNode extends TreeNode {
    type: TypeNode;

}

export interface AssignRHSNode extends TreeNode {
    type: TypeNode;
}

export interface TypeNode extends TreeNode {}

export class ProgramNode extends TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];
    structList: [StructNode];
    st: SemanticUtil.SymbolTable;

    constructor(structList: [StructNode], functionList:[FuncNode], statList:[StatNode]) {
        super();
        this.structList = structList;
        this.functionList = functionList;
        this.statList = statList;
    }

    visit(v: Visitor): any {
        return v.visitProgramNode(this);
    }
}

export class FuncNode extends TreeNode {
    type:      TypeNode;
    ident:     IdentNode;
    paramList: [ParamNode];
    statList:  [StatNode];

    st: SemanticUtil.SymbolTable;

    constructor(type : TypeNode, ident : IdentNode, paramList : [ParamNode], statList: [StatNode]) {
        super();
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }

    visit(v: Visitor): any {
        return v.visitFuncNode(this);
    }
}

export class StructNode extends TreeNode {
    type: TypeNode;
    ident: IdentNode;
    fieldList: [FieldNode];
    constructor(ident: IdentNode, fieldList: [FieldNode]) {
        super()
        this.ident = ident;
        this.fieldList = fieldList;
    }


}

export class StructTypeNode extends TreeNode {
    type: TypeNode;
    ident: IdentNode;
    constructor(ident: IdentNode) {
        super()
        this.ident = ident;
    }

}



export class FieldNode extends TreeNode {
    type: TypeNode;
    ident: IdentNode;
    constructor(ident: IdentNode, type:TypeNode) {
        super()
        this.ident = ident;
        this.type = type;
    }



}

export class SkipNode extends TreeNode implements StatNode {
    constructor() {
        super();
    }

    visit(v: Visitor): any {
       return v.visitSkipNode(this);
   }
}


export class ReadNode extends TreeNode implements StatNode {
    readTarget: AssignLHSNode;
    constructor(lhsNode:AssignLHSNode) {
        super();
        this.readTarget = lhsNode;
    }

    visit(v: Visitor): any {
        return v.visitReadNode(this);
    }
}

export class PrintlnNode extends TreeNode implements StatNode {
    expr: ExprNode;
    constructor(expr : ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): any {
        return v.visitPrintlnNode(this);
    }
}

export interface BaseTypeNode extends TreeNode, TypeNode {}

export class IntTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }

    visit(v: Visitor): any {
        v.visitIntTypeNode(this);
    }

    toString(): string {
        return 'INT';
    }
}

export class CharTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }
    visit(v: Visitor): any {
        v.visitCharTypeNode(this);
    }

    toString(): string {
        return 'CHAR';
    }
}

export class BoolTypeNode extends TreeNode implements BaseTypeNode {
    constructor() { super(); }
    visit(v: Visitor): any {
        v.visitBoolTypeNode(this);
    }

    toString(): string {
        return 'BOOL';
    }
}
export class IdentNode extends TreeNode implements ExprNode, AssignLHSNode {
    identStr: string;
    type:     TypeNode; // Filled by semantic visitor
    paramNum: number // -1 when not a param, >= 0 when is a param

    constructor(identStr: string) {
        super();
        this.identStr = identStr;
        this.paramNum = -1;
    }

    isParam(): boolean {
        return this.paramNum >= 0;
    }

    visit(v: Visitor): any {
        return v.visitIdentNode(this);
    }

    toString(): string {
        return this.identStr;
    }
}

export class BinOpExprNode extends TreeNode implements ExprNode {
    leftOperand:  ExprNode;
    rightOperand: ExprNode;
    operator:     string;

    type : TypeNode; // Filled by semantic visitor

    constructor(leftOperand: ExprNode, rightOperand: ExprNode, operator: string) {
        super();
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }

    visit(v: Visitor): any {
        return v.visitBinOpExprNode(this);
    }
}

export class StrLiterNode extends TreeNode implements ExprNode {
    type: TypeNode; // Filled by semantic visitor
    str:  string;
    actualStrLength:number;
    
    constructor(str: string) {
        super();
        this.str = str;
    }

    visit(v: Visitor): any {
        return v.visitStrLiterNode(this);
    }
}

export class AssignNode extends TreeNode implements StatNode {
    lhs : AssignLHSNode;
    rhs : AssignRHSNode;
    constructor(lhs: AssignLHSNode, rhs: AssignRHSNode) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
    }

    visit(v: Visitor): any {
        return v.visitAssignNode(this);
    }
}

/* 
    Check lhs ident is declared previously in any of the parent scopes
    check lhs is the same type as rhs, or can be cast
*/
export class BeginEndBlockNode extends TreeNode implements StatNode {
    statList: [StatNode];

    st: SemanticUtil.SymbolTable;

    constructor(statList: [StatNode]) {
        super();
        this.statList = statList;
    }

    visit(v: Visitor): any {
        return v.visitBeginEndBlockNode(this);
    }
}

export class ReturnNode extends TreeNode implements StatNode {
    returnExpr: ExprNode;

    constructor(returnExpr: ExprNode) {
        super();
        this.returnExpr = returnExpr;
    }

    visit(v: Visitor): any {
        return v.visitReturnNode(this);
    }
}

export class WhileNode extends TreeNode implements StatNode {
    predicateExpr: ExprNode;
    loopBody:      [StatNode];

    st: SemanticUtil.SymbolTable;

    constructor(predicateExpr: ExprNode, loopBody: [StatNode]) {
        super();
        this.predicateExpr = predicateExpr;
        this.loopBody = loopBody;
    }

    visit(v: Visitor): any {
        return v.visitWhileNode(this);
    }
}

export class PairTypeNode extends TreeNode implements TypeNode {
    type1: TypeNode;
    type2: TypeNode;

    constructor(type1: TypeNode, type2: TypeNode) {
        super();
        this.type1 = type1;
        this.type2 = type2;
    }

    visit(v: Visitor): any {
        return v.visitPairTypeNode(this);
    }

    toString(): string {
        return 'pair(' + this.type1 + ', ' + this.type2 + ')';
    }
}

export class ArrayLiterNode extends TreeNode implements AssignRHSNode {
     type:    TypeNode; // Filled by semantic visitor
     exprList: [ExprNode];

     constructor(exprList: [ExprNode]) {
        super();
        this.exprList = exprList;
    }

     visit(v: Visitor): any {
       return v.visitArrayLiterNode(this);
   }
}

export class CharLiterNode extends TreeNode implements ExprNode {
    ch:   string;
    type: TypeNode; // Filled by semantic visitor

    constructor(ch: string) {
        super();
        this.ch = ch;
    }

    visit(v: Visitor): any {
        return v.visitCharLiterNode(this);
    }
}

export class ExitNode extends TreeNode implements StatNode {
    expr: ExprNode;

    constructor(expr: ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): any {
        return v.visitExitNode(this);
    }
}

export class IfNode extends TreeNode implements StatNode {
    predicateExpr: ExprNode;
    trueStatList:  [StatNode];
    falseStatList: [StatNode];

    trueSt: SemanticUtil.SymbolTable;
    falseSt: SemanticUtil.SymbolTable;

    constructor(predicateExpr: ExprNode,
                trueStatList:  [StatNode],
                falseStatList: [StatNode]) {
        super();
        this.predicateExpr = predicateExpr;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }

    visit(v: Visitor): any {
        return v.visitIfNode(this);
    }
}

export class ArrayTypeNode extends TreeNode implements TypeNode {
    type:  TypeNode;
    depth: number;
    constructor(type: TypeNode, depth: number) {
        super();
        this.type = type;
        this.depth = depth;
    }

    visit(v: Visitor): any {
        return v.visitArrayTypeNode(this);
    }

    toString(): string {
        if (this.type instanceof CharTypeNode && this.depth === 1) {
            // array of chars is a string
            return 'STRING';
        } else {
            // showing type + duplicating '[]'
            // to show user the full type of the array
            // if it's not a string
            return this.type + (new Array(this.depth + 1)).join('[]');
        }
    }
}

export class PairElemNode extends TreeNode implements AssignLHSNode {
    type:  TypeNode; // Filled by semantic visitor
    ident: IdentNode;
    index: number;
    constructor(ident: IdentNode, index: number) {
        super();
        this.ident = ident;
        this.index = index;
    }

    visit(v: Visitor): any {
        return v.visitPairElemNode(this);
    }
}

export class NewPairNode extends TreeNode implements AssignRHSNode {
    type :   TypeNode; // Filled by semantic visitor
    fstExpr: ExprNode;
    sndExpr: ExprNode;

    constructor(fstExpr: ExprNode, sndExpr: ExprNode) {
        super();
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }

    visit(v: Visitor): any {
        return v.visitNewPairNode(this);
    }
}

export class BoolLiterNode extends TreeNode implements ExprNode {
    bool: boolean;
    type: TypeNode; // Filled by semantic visitor

    constructor(bool: boolean) {
        super();
        this.bool = bool;
    }

    visit(v: Visitor): any {
        return v.visitBoolLiterNode(this);
    }
}

export class UnOpNode extends TreeNode implements ExprNode {
    operator: string;
    expr:     ExprNode;
    type:     TypeNode; // Filled by semantic visitor

    constructor(operator: string, expr: ExprNode) {
        super();
        this.operator = operator;
        this.expr = expr;
    }

    visit(v: Visitor): any {
        return v.visitUnOpNode(this);
    }
}

export class ParamNode extends TreeNode {
    type:  any; // temporarily set to 'any' from TypeNode
    ident: IdentNode;

    constructor(type: TypeNode, ident: IdentNode) {
        super();
        this.type = type;
        this.ident = ident;
    }

    visit(v: Visitor): any {
        return v.visitParamNode(this);
    }
}

export class FreeNode extends TreeNode implements StatNode {
    expr: ExprNode;

    constructor(expr: ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): any {
        return v.visitFreeNode(this);
    }
}

export class PrintNode extends TreeNode implements StatNode {
    expr: ExprNode;

    constructor(expr: ExprNode) {
        super();
        this.expr = expr;
    }

    visit(v: Visitor): any {
        return v.visitPrintNode(this);
    }
}

export class DeclareNode extends TreeNode implements StatNode {
    type:  TypeNode;
    ident: IdentNode;
    rhs:   AssignRHSNode;

    constructor(type: TypeNode, ident: IdentNode, rhs: AssignRHSNode) {
        super();
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }

    visit(v: Visitor): any {
        return v.visitDeclareNode(this);
    }
}

// check type is the type of rhs

export class ArrayElemNode extends TreeNode implements AssignLHSNode, ExprNode{
    ident:     IdentNode;
    exprList:  [ExprNode];
    type:      TypeNode; // Filled by semantic visitor


    constructor(ident: IdentNode, exprList: [ExprNode]) {
        super();
        this.ident = ident;
        this.exprList = exprList;
    }

    visit(v: Visitor): any {
        return v.visitArrayElemNode(this);
    }
}

export class CallNode extends TreeNode implements AssignRHSNode {
    ident:   IdentNode;
    argList: [ExprNode];
    type :   TypeNode; // Filled by semantic visitor


    constructor(ident: IdentNode, argList: [ExprNode]) {
        super();
        this.ident = ident;
        this.argList = argList;
    }

    visit(v: Visitor): any {
        return v.visitCallNode(this);
    }
}

export class PairLiterNode extends TreeNode implements ExprNode {
    type: TypeNode; // Filled by semantic visitor

    constructor() { super(); }
    visit(v: Visitor): any {
        return v.visitPairLiterNode(this);
    }
}

export class IntLiterNode extends TreeNode implements ExprNode {
    num: number;
    type: TypeNode; // Filled by semantic visitor

    constructor(num: number) {
        super();
        this.num = num;
    }

    visit(v: Visitor): any {
        return v.visitIntLiterNode(this);
    }

}

export class NullTypeNode extends TreeNode implements TypeNode {
    constructor() { super(); }
    visit(v: Visitor): any {
        return v.visitNullTypeNode(this);
    }
}

export class EmptyArrayTypeNode extends TreeNode implements TypeNode {
    // This type is equal with any array type when compared
    constructor() { super(); }
    visit(v: Visitor): any {
        return v.visitEmptyArrayTypeNode(this);
    }
}

export var INT_TYPE: IntTypeNode = new IntTypeNode();
export var CHAR_TYPE: CharTypeNode = new CharTypeNode();
export var BOOL_TYPE: BoolTypeNode = new BoolTypeNode();
export var STRING_TYPE: ArrayTypeNode = new ArrayTypeNode(CHAR_TYPE, 1);
export var EMPTY_ARRAY_TYPE: EmptyArrayTypeNode = new EmptyArrayTypeNode();
export var NULL_TYPE: NullTypeNode = new NullTypeNode();