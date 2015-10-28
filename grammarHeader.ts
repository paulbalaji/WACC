///<reference path="node.d.ts"/>
 class TreeNode implements Visitable{
        visit(visitor:Visitor):number {
                console.error('Node():visit not overridden');
                return -1;
        }
}
 
interface Visitable {
        visit(visitor:Visitor):number;
}
 
interface Visitor {
        visitPlusNode(node:PlusNode):number;
        visitMultNode(node:MultNode):number;
        visitNumNode(node:NumNode):number;
}

class BinNode extends TreeNode{
        op: string;
        left: TreeNode;
        right: TreeNode;
        constructor(op:string, left: TreeNode, right: TreeNode) {
                super();
                this.op = op;
                this.left = left;
                this.right = right;
        }
       
}
 
class PlusNode extends BinNode {
        constructor(left: TreeNode, right: TreeNode) {
                super('+', left, right)
        }
 
        visit(visitor:Visitor):number {
                return visitor.visitPlusNode(this);
        }
 
}
 
class MultNode extends BinNode {
        constructor(left: TreeNode, right: TreeNode) {
                super('*', left, right)
        }
 
        visit(visitor:Visitor):number {
                return visitor.visitMultNode(this);
        }
 
}
 
class NumNode extends TreeNode {
        num:number;
        constructor(n:number) {
                super();
                this.num = n;
        }
 
        visit(visitor:Visitor):number {
                return visitor.visitNumNode(this);
        }
}