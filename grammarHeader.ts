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



class AssignRHSNode {

}

class AssignLHSNode {

}

class PairElemNode {

}

class ParamNode {

}

interface StatNode extends TreeNode {

}

interface ExprNode extends TreeNode {

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

class PairElemTypeNode implements StatNode {
    type : TypeNode;

    constructor(type:TypeNode) {
        this.type = type;
    }
}

class IdentNode implements ExprNode, AssignLHSNode {
    ident : string;
    constructor(ident : string) {
        this.ident = ident;
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
    constructor(lhs : AssignRHSNode, rhs : AssignLHSNode) {
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

interface TypeNode extends TreeNode, AssignRHSNode {}

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
