///<reference path="node.d.ts"/>
///<reference path="Constants.ts"/>

import Const = require('./Constants');

interface TreeNode extends Visitable{
        /*visit(visitor:Visitor):number {
                console.error('Node():visit not overridden');
                return -1;
        }*/
}
 
interface Visitable {
        //visit(visitor:Visitor):number;
}
 
interface Visitor {
        
}

interface StatNode extends TreeNode {

}

interface ExprNode extends TreeNode {

}


interface AssignLHSNode extends TreeNode {

}

interface AssignRHSNode extends TreeNode {

}

interface TypeNode extends TreeNode, AssignRHSNode {}

interface PairElemNode extends TreeNode {

}

export class ProgramNode implements TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
    
        this.functionList = functionList;
        this.statList = statList;
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

}


export class SkipNode implements StatNode {
    constructor() {
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitSkipNode(this);
    // }
}


export class ReadNode implements StatNode {
    readTarget : AssignLHSNode
    constructor(lhsNode:AssignLHSNode) {
        this.readTarget = lhsNode;
    }
}

export class PrintlnNode implements StatNode {
    expr : ExprNode;
    constructor(expr : ExprNode) {
        this.expr = expr;

    }
}

export class PairElemTypePAIRNode implements TypeNode {
    // This is supposed to be empty, dont you worry child

}

export class BaseTypeNode implements TypeNode {
    typeName: String;

    constructor(typeName:String) {
        this.typeName = typeName;
    }
}

export class PairElemTypeNode implements StatNode {
    type : TypeNode;

    constructor(type:TypeNode) {
        this.type = type;
    }
}

export class IdentNode implements ExprNode, AssignLHSNode {
    identStr : string;
    constructor(identStr : string) {
        this.identStr = identStr;
    }
}

export class BinOpExprNode implements ExprNode {
    leftOperand : ExprNode;
    rightOperand : ExprNode;
    operator : string;
    constructor(leftOperand : ExprNode, rightOperand : ExprNode, operator : string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
}

export class StrLiterNode implements ExprNode {
    str : string;

    constructor(str : string) {
        this.str = str;
    }
}

export class AssignNode implements StatNode {
    lhs : AssignLHSNode;
    rhs : AssignRHSNode;
    constructor(lhs : AssignLHSNode, rhs : AssignRHSNode) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}

// check lhs ident is declared previously in any of the parent scopes
// check lhs is the same type as rhs, or can be cast

export class BeginEndBlockNode implements StatNode {
    statList:[StatNode]

    constructor(statList:[StatNode]) {
            this.statList = statList;
    }
}

export class ReturnNode implements StatNode {
    returnExpr: ExprNode

    constructor(returnExpr:ExprNode) {
            this.returnExpr = returnExpr;
    }
}

export class WhileNode implements StatNode {
    predicateExpr: ExprNode
    loopBody: [StatNode]

    constructor(predicateExpr:ExprNode, loopBody:[StatNode]) {
            this.predicateExpr = predicateExpr;
            this.loopBody = loopBody;
    }
}

export class PairTypeNode implements TypeNode {
    type1: TypeNode;
    type2: TypeNode;

    constructor(type1:TypeNode, type2:TypeNode) {
            this.type1 = type1;
            this.type2 = type2;
    }
}

export class PairElemSndNode implements PairElemNode {
    expr: ExprNode

    constructor(expr:ExprNode) {
            this.expr = expr;
    }
}

export class ArrayLiterNode implements AssignRHSNode {
     list: [ExprNode];

        constructor(list:[ExprNode]) {
                this.list = list;
        }
}

export class CharLiterNode implements ExprNode {
        ch: string;

        constructor(ch:string) {
                this.ch = ch;
        }
}

export class ExitNode implements StatNode {
    expr: ExprNode;
    constructor(expr: ExprNode) {
        this.expr = expr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitExitNode(this);
    // }
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
 
    // visit(visitor:Visitor) {
    //     return visitor.visitIfNode(this);
    // }
}
 
export class ArrayTypeNode implements TypeNode {
    type: TypeNode;
 
    constructor(type: TypeNode, depth: number) {
        this.type = depth === 1 ? type : new ArrayTypeNode(type, depth - 1);
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitArrayTypeNode(this);
    // }
}
 
export class PairElemFstNode implements PairElemNode {
    expr: ExprNode;
 
    constructor(expr: ExprNode) {
        this.expr = expr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitPairElemFstNode(this);
    // }
}
 
export class NewPairNode implements AssignRHSNode {
    fstExpr: ExprNode;
    sndExpr: ExprNode;
 
    constructor(fstExpr: ExprNode, sndExpr: ExprNode) {
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitNewPairNode(this);
    // }
}
 
export class BoolLiterNode implements ExprNode {
    bool: boolean;
 
    constructor(bool: boolean) {
        this.bool = bool;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitBoolLiterNode(this);
    // }
}
 
export class UnOpNode implements ExprNode {
    unOp: string;
    expr: ExprNode;
 
    constructor(unOp: string, expr: ExprNode) {
        this.unOp = unOp;
        this.expr = expr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitUnOpNode(this);
    // }
}

export class ParamNode {
    type: TypeNode;
    ident: IdentNode;

    constructor(type:TypeNode, ident:IdentNode) {
        this.type = type;
        this.ident = ident;
    }
    
}

export class FreeNode implements StatNode {
    expr : ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

}

export class PrintNode implements StatNode {
    expr: ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
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
}

// check type is the type of rhs

export class ArrayElemNode {
    ident: IdentNode;
    exprList: [ExprNode];

    constructor(ident: IdentNode, exprList: [ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }
}

export class CallNode implements AssignRHSNode {
    ident: IdentNode;
    exprList: [ExprNode];

    constructor(ident:IdentNode, exprList:[ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }
    
}

export class PairLiterNode implements ExprNode {

}

export class IntLiterNode implements ExprNode {
    num : number; 

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

}

// check overflow
