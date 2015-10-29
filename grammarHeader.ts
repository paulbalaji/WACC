///<reference path="node.d.ts"/>
class TreeNode implements Visitable{
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

class ProgramNode extends TreeNode {
    functionList: [FuncNode];
    statList:     [StatNode];

    constructor(functionList:[FuncNode], statList:[StatNode]) {
        super();
        this.functionList = functionList;
        this.statList = statList;
    }
}

class AssignRHSNode {

}

class PairElemNode {

}

class FuncNode {

}

interface StatNode extends TreeNode {

}

interface ExprNode extends TreeNode {

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
