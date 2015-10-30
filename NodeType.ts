///<reference path="node.d.ts"/>
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

class ProgramNode implements TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
    
        this.functionList = functionList;
        this.statList = statList;
    }
}

class FuncNode implements TreeNode {
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


class SkipNode implements StatNode {
    constructor() {
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitSkipNode(this);
    // }
}


class ReadNode implements StatNode {
    readTarget : AssignLHSNode
    constructor(lhsNode:AssignLHSNode) {
        this.readTarget = lhsNode;
    }
}

class PrintlnNode implements StatNode {
    expr : ExprNode;
    constructor(expr : ExprNode) {
        this.expr = expr;

    }
}

class PairElemTypePAIRNode implements TypeNode {
    // This is supposed to be empty, dont you worry child

}

class BaseTypeNode implements TypeNode {
    typeName: String;

    constructor(typeName:String) {
        this.typeName = typeName;
    }
}

class PairElemTypeNode implements StatNode {
    type : TypeNode;

    constructor(type:TypeNode) {
        this.type = type;
    }
}

class IdentNode implements ExprNode, AssignLHSNode {
    identStr : string;
    constructor(identStr : string) {
        this.identStr = identStr;
    }
}

class BinOpExprNode implements ExprNode {
    leftOperand : ExprNode;
    rightOperand : ExprNode;
    operator : string;
    constructor(leftOperand : ExprNode, rightOperand : ExprNode, operator : string) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
}

class StrLiterNode implements ExprNode {
    str : string;

    constructor(str : string) {
        this.str = str;
    }
}

class AssignNode implements StatNode {
    lhs : AssignLHSNode;
    rhs : AssignRHSNode;
    constructor(lhs : AssignLHSNode, rhs : AssignRHSNode) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}

class BeginEndBlockNode implements StatNode {
    statList:[StatNode]

    constructor(statList:[StatNode]) {
            this.statList = statList;
    }
}

class ReturnNode implements StatNode {
    returnExpr: ExprNode

    constructor(returnExpr:ExprNode) {
            this.returnExpr = returnExpr;
    }
}

class WhileNode implements StatNode {
    predicateExpr: ExprNode
    loopBody: [StatNode]

    constructor(predicateExpr:ExprNode, loopBody:[StatNode]) {
            this.predicateExpr = predicateExpr;
            this.loopBody = loopBody;
    }
}

class PairTypeNode implements TypeNode {
    type1: TypeNode;
    type2: TypeNode;

    constructor(type1:TypeNode, type2:TypeNode) {
            this.type1 = type1;
            this.type2 = type2;
    }
}

class PairElemSndNode implements PairElemNode {
    expr: ExprNode

    constructor(expr:ExprNode) {
            this.expr = expr;
    }
}

class ArrayLiterNode implements AssignRHSNode {
     list: [ExprNode];

        constructor(list:[ExprNode]) {
                this.list = list;
        }
}

class CharLiterNode implements ExprNode {
        ch: string;

        constructor(ch:string) {
                this.ch = ch;
        }
}

class ExitNode implements StatNode {
    expr: ExprNode;
    constructor(expr: ExprNode) {
        this.expr = expr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitExitNode(this);
    // }
}
 
class IfNode implements StatNode {
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
 
class ArrayTypeNode implements TypeNode {
    type: TypeNode;
 
    constructor(type: TypeNode, depth: number) {
        this.type = depth === 1 ? type : new ArrayTypeNode(type, depth - 1);
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitArrayTypeNode(this);
    // }
}
 
class PairElemFstNode implements PairElemNode {
    expr: ExprNode;
 
    constructor(expr: ExprNode) {
        this.expr = expr;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitPairElemFstNode(this);
    // }
}
 
class NewPairNode implements AssignRHSNode {
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
 
class BoolLiterNode implements ExprNode {
    bool: boolean;
 
    constructor(bool: boolean) {
        this.bool = bool;
    }
 
    // visit(visitor:Visitor) {
    //     return visitor.visitBoolLiterNode(this);
    // }
}
 
class UnOpNode implements ExprNode {
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

class ParamNode {
    type: TypeNode;
    ident: IdentNode;

    constructor(type:TypeNode, ident:IdentNode) {
        this.type = type;
        this.ident = ident;
    }
    
}

class FreeNode implements StatNode {
    expr : ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }

}

class PrintNode implements StatNode {
    expr: ExprNode;

    constructor(expr:ExprNode) {
        this.expr = expr;
    }
}

class DeclareNode implements StatNode {
    type: TypeNode;
    ident: IdentNode;
    rhs: AssignRHSNode;

    constructor(type:TypeNode, ident:IdentNode, rhs:AssignRHSNode) {
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }
}

class ArrayElemNode {
    ident: IdentNode;
    exprList: [ExprNode];

    constructor(ident: IdentNode, exprList: [ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }
}

class CallNode implements AssignRHSNode {
    ident: IdentNode;
    exprList: [ExprNode];

    constructor(ident:IdentNode, exprList:[ExprNode]) {
        this.ident = ident;
        this.exprList = exprList;
    }
    
}

class PairLiterNode implements ExprNode {

}

class IntLiterNode implements ExprNode {
    num : number; 

    constructor(num:number) {
        this.num = num;
    }

}
