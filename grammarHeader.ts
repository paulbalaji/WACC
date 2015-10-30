///<reference path="node.d.ts"/>
function generateListFromRecursiveRule(head : TreeNode, tail : TreeNode[]) {

    if (head !== null) {
        tail.unshift(head);
    }

    return tail;
}

function generateSingletonListFromRule(elem : TreeNode) {
    if (!elem) {
        return [];
    }
    return [elem];
}
