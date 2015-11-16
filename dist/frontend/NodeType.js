///<reference path="node.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TreeNode = (function () {
    function TreeNode() {
    }
    TreeNode.prototype.visit = function (v) { throw 'TreeNode subclass visit method is not implemented.'; };
    TreeNode.prototype.setErrorLocation = function (errorLocation) {
        this.errorLocation = errorLocation;
    };
    return TreeNode;
})();
exports.TreeNode = TreeNode;
var ProgramNode = (function (_super) {
    __extends(ProgramNode, _super);
    function ProgramNode(functionList, statList) {
        _super.call(this);
        this.functionList = functionList;
        this.statList = statList;
    }
    ProgramNode.prototype.visit = function (v) {
        return v.visitProgramNode(this);
    };
    return ProgramNode;
})(TreeNode);
exports.ProgramNode = ProgramNode;
var FuncNode = (function (_super) {
    __extends(FuncNode, _super);
    function FuncNode(type, ident, paramList, statList) {
        _super.call(this);
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }
    FuncNode.prototype.visit = function (v) {
        return v.visitFuncNode(this);
    };
    return FuncNode;
})(TreeNode);
exports.FuncNode = FuncNode;
var SkipNode = (function (_super) {
    __extends(SkipNode, _super);
    function SkipNode() {
        _super.call(this);
    }
    SkipNode.prototype.visit = function (v) {
        return v.visitSkipNode(this);
    };
    return SkipNode;
})(TreeNode);
exports.SkipNode = SkipNode;
var ReadNode = (function (_super) {
    __extends(ReadNode, _super);
    function ReadNode(lhsNode) {
        _super.call(this);
        this.readTarget = lhsNode;
    }
    ReadNode.prototype.visit = function (v) {
        return v.visitReadNode(this);
    };
    return ReadNode;
})(TreeNode);
exports.ReadNode = ReadNode;
var PrintlnNode = (function (_super) {
    __extends(PrintlnNode, _super);
    function PrintlnNode(expr) {
        _super.call(this);
        this.expr = expr;
    }
    PrintlnNode.prototype.visit = function (v) {
        return v.visitPrintlnNode(this);
    };
    return PrintlnNode;
})(TreeNode);
exports.PrintlnNode = PrintlnNode;
var IntTypeNode = (function (_super) {
    __extends(IntTypeNode, _super);
    function IntTypeNode() {
        _super.call(this);
    }
    IntTypeNode.prototype.visit = function (v) {
        v.visitIntTypeNode(this);
    };
    IntTypeNode.prototype.toString = function () {
        return 'INT';
    };
    return IntTypeNode;
})(TreeNode);
exports.IntTypeNode = IntTypeNode;
var CharTypeNode = (function (_super) {
    __extends(CharTypeNode, _super);
    function CharTypeNode() {
        _super.call(this);
    }
    CharTypeNode.prototype.visit = function (v) {
        v.visitCharTypeNode(this);
    };
    CharTypeNode.prototype.toString = function () {
        return 'CHAR';
    };
    return CharTypeNode;
})(TreeNode);
exports.CharTypeNode = CharTypeNode;
var BoolTypeNode = (function (_super) {
    __extends(BoolTypeNode, _super);
    function BoolTypeNode() {
        _super.call(this);
    }
    BoolTypeNode.prototype.visit = function (v) {
        v.visitBoolTypeNode(this);
    };
    BoolTypeNode.prototype.toString = function () {
        return 'BOOL';
    };
    return BoolTypeNode;
})(TreeNode);
exports.BoolTypeNode = BoolTypeNode;
var IdentNode = (function (_super) {
    __extends(IdentNode, _super);
    function IdentNode(identStr) {
        _super.call(this);
        this.identStr = identStr;
    }
    IdentNode.prototype.visit = function (v) {
        return v.visitIdentNode(this);
    };
    IdentNode.prototype.toString = function () {
        return this.identStr;
    };
    return IdentNode;
})(TreeNode);
exports.IdentNode = IdentNode;
var BinOpExprNode = (function (_super) {
    __extends(BinOpExprNode, _super);
    function BinOpExprNode(leftOperand, rightOperand, operator) {
        _super.call(this);
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
    BinOpExprNode.prototype.visit = function (v) {
        return v.visitBinOpExprNode(this);
    };
    return BinOpExprNode;
})(TreeNode);
exports.BinOpExprNode = BinOpExprNode;
var StrLiterNode = (function (_super) {
    __extends(StrLiterNode, _super);
    function StrLiterNode(str) {
        _super.call(this);
        this.str = str;
    }
    StrLiterNode.prototype.visit = function (v) {
        return v.visitStrLiterNode(this);
    };
    return StrLiterNode;
})(TreeNode);
exports.StrLiterNode = StrLiterNode;
var AssignNode = (function (_super) {
    __extends(AssignNode, _super);
    function AssignNode(lhs, rhs) {
        _super.call(this);
        this.lhs = lhs;
        this.rhs = rhs;
    }
    AssignNode.prototype.visit = function (v) {
        return v.visitAssignNode(this);
    };
    return AssignNode;
})(TreeNode);
exports.AssignNode = AssignNode;
/*
    Check lhs ident is declared previously in any of the parent scopes
    check lhs is the same type as rhs, or can be cast
*/
var BeginEndBlockNode = (function (_super) {
    __extends(BeginEndBlockNode, _super);
    function BeginEndBlockNode(statList) {
        _super.call(this);
        this.statList = statList;
    }
    BeginEndBlockNode.prototype.visit = function (v) {
        return v.visitBeginEndBlockNode(this);
    };
    return BeginEndBlockNode;
})(TreeNode);
exports.BeginEndBlockNode = BeginEndBlockNode;
var ReturnNode = (function (_super) {
    __extends(ReturnNode, _super);
    function ReturnNode(returnExpr) {
        _super.call(this);
        this.returnExpr = returnExpr;
    }
    ReturnNode.prototype.visit = function (v) {
        return v.visitReturnNode(this);
    };
    return ReturnNode;
})(TreeNode);
exports.ReturnNode = ReturnNode;
var WhileNode = (function (_super) {
    __extends(WhileNode, _super);
    function WhileNode(predicateExpr, loopBody) {
        _super.call(this);
        this.predicateExpr = predicateExpr;
        this.loopBody = loopBody;
    }
    WhileNode.prototype.visit = function (v) {
        return v.visitWhileNode(this);
    };
    return WhileNode;
})(TreeNode);
exports.WhileNode = WhileNode;
var PairTypeNode = (function (_super) {
    __extends(PairTypeNode, _super);
    function PairTypeNode(type1, type2) {
        _super.call(this);
        this.type1 = type1;
        this.type2 = type2;
    }
    PairTypeNode.prototype.visit = function (v) {
        return v.visitPairTypeNode(this);
    };
    PairTypeNode.prototype.toString = function () {
        return 'pair(' + this.type1 + ', ' + this.type2 + ')';
    };
    return PairTypeNode;
})(TreeNode);
exports.PairTypeNode = PairTypeNode;
var ArrayLiterNode = (function (_super) {
    __extends(ArrayLiterNode, _super);
    function ArrayLiterNode(exprList) {
        _super.call(this);
        this.exprList = exprList;
    }
    ArrayLiterNode.prototype.visit = function (v) {
        return v.visitArrayLiterNode(this);
    };
    return ArrayLiterNode;
})(TreeNode);
exports.ArrayLiterNode = ArrayLiterNode;
var CharLiterNode = (function (_super) {
    __extends(CharLiterNode, _super);
    function CharLiterNode(ch) {
        _super.call(this);
        this.ch = ch;
    }
    CharLiterNode.prototype.visit = function (v) {
        return v.visitCharLiterNode(this);
    };
    return CharLiterNode;
})(TreeNode);
exports.CharLiterNode = CharLiterNode;
var ExitNode = (function (_super) {
    __extends(ExitNode, _super);
    function ExitNode(expr) {
        _super.call(this);
        this.expr = expr;
    }
    ExitNode.prototype.visit = function (v) {
        return v.visitExitNode(this);
    };
    return ExitNode;
})(TreeNode);
exports.ExitNode = ExitNode;
var IfNode = (function (_super) {
    __extends(IfNode, _super);
    function IfNode(predicateExpr, trueStatList, falseStatList) {
        _super.call(this);
        this.predicateExpr = predicateExpr;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
    IfNode.prototype.visit = function (v) {
        return v.visitIfNode(this);
    };
    return IfNode;
})(TreeNode);
exports.IfNode = IfNode;
var ArrayTypeNode = (function (_super) {
    __extends(ArrayTypeNode, _super);
    function ArrayTypeNode(type, depth) {
        _super.call(this);
        this.type = type;
        this.depth = depth;
    }
    ArrayTypeNode.prototype.visit = function (v) {
        return v.visitArrayTypeNode(this);
    };
    ArrayTypeNode.prototype.toString = function () {
        if (this.type instanceof CharTypeNode && this.depth === 1) {
            // array of chars is a string
            return 'STRING';
        }
        else {
            // showing type + duplicating '[]'
            // to show user the full type of the array
            // if it's not a string
            return this.type + (new Array(this.depth + 1)).join('[]');
        }
    };
    return ArrayTypeNode;
})(TreeNode);
exports.ArrayTypeNode = ArrayTypeNode;
var PairElemNode = (function (_super) {
    __extends(PairElemNode, _super);
    function PairElemNode(ident, index) {
        _super.call(this);
        this.ident = ident;
        this.index = index;
    }
    PairElemNode.prototype.visit = function (v) {
        return v.visitPairElemNode(this);
    };
    return PairElemNode;
})(TreeNode);
exports.PairElemNode = PairElemNode;
var NewPairNode = (function (_super) {
    __extends(NewPairNode, _super);
    function NewPairNode(fstExpr, sndExpr) {
        _super.call(this);
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
    NewPairNode.prototype.visit = function (v) {
        return v.visitNewPairNode(this);
    };
    return NewPairNode;
})(TreeNode);
exports.NewPairNode = NewPairNode;
var BoolLiterNode = (function (_super) {
    __extends(BoolLiterNode, _super);
    function BoolLiterNode(bool) {
        _super.call(this);
        this.bool = bool;
    }
    BoolLiterNode.prototype.visit = function (v) {
        return v.visitBoolLiterNode(this);
    };
    return BoolLiterNode;
})(TreeNode);
exports.BoolLiterNode = BoolLiterNode;
var UnOpNode = (function (_super) {
    __extends(UnOpNode, _super);
    function UnOpNode(operator, expr) {
        _super.call(this);
        this.operator = operator;
        this.expr = expr;
    }
    UnOpNode.prototype.visit = function (v) {
        return v.visitUnOpNode(this);
    };
    return UnOpNode;
})(TreeNode);
exports.UnOpNode = UnOpNode;
var ParamNode = (function (_super) {
    __extends(ParamNode, _super);
    function ParamNode(type, ident) {
        _super.call(this);
        this.type = type;
        this.ident = ident;
    }
    ParamNode.prototype.visit = function (v) {
        return v.visitParamNode(this);
    };
    return ParamNode;
})(TreeNode);
exports.ParamNode = ParamNode;
var FreeNode = (function (_super) {
    __extends(FreeNode, _super);
    function FreeNode(expr) {
        _super.call(this);
        this.expr = expr;
    }
    FreeNode.prototype.visit = function (v) {
        return v.visitFreeNode(this);
    };
    return FreeNode;
})(TreeNode);
exports.FreeNode = FreeNode;
var PrintNode = (function (_super) {
    __extends(PrintNode, _super);
    function PrintNode(expr) {
        _super.call(this);
        this.expr = expr;
    }
    PrintNode.prototype.visit = function (v) {
        return v.visitPrintNode(this);
    };
    return PrintNode;
})(TreeNode);
exports.PrintNode = PrintNode;
var DeclareNode = (function (_super) {
    __extends(DeclareNode, _super);
    function DeclareNode(type, ident, rhs) {
        _super.call(this);
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }
    DeclareNode.prototype.visit = function (v) {
        return v.visitDeclareNode(this);
    };
    return DeclareNode;
})(TreeNode);
exports.DeclareNode = DeclareNode;
// check type is the type of rhs
var ArrayElemNode = (function (_super) {
    __extends(ArrayElemNode, _super);
    function ArrayElemNode(ident, exprList) {
        _super.call(this);
        this.ident = ident;
        this.exprList = exprList;
    }
    ArrayElemNode.prototype.visit = function (v) {
        return v.visitArrayElemNode(this);
    };
    return ArrayElemNode;
})(TreeNode);
exports.ArrayElemNode = ArrayElemNode;
var CallNode = (function (_super) {
    __extends(CallNode, _super);
    function CallNode(ident, argList) {
        _super.call(this);
        this.ident = ident;
        this.argList = argList;
    }
    CallNode.prototype.visit = function (v) {
        return v.visitCallNode(this);
    };
    return CallNode;
})(TreeNode);
exports.CallNode = CallNode;
var PairLiterNode = (function (_super) {
    __extends(PairLiterNode, _super);
    function PairLiterNode() {
        _super.call(this);
    }
    PairLiterNode.prototype.visit = function (v) {
        return v.visitPairLiterNode(this);
    };
    return PairLiterNode;
})(TreeNode);
exports.PairLiterNode = PairLiterNode;
var IntLiterNode = (function (_super) {
    __extends(IntLiterNode, _super);
    function IntLiterNode(num) {
        _super.call(this);
        this.num = num;
    }
    IntLiterNode.prototype.visit = function (v) {
        return v.visitIntLiterNode(this);
    };
    return IntLiterNode;
})(TreeNode);
exports.IntLiterNode = IntLiterNode;
var NullTypeNode = (function (_super) {
    __extends(NullTypeNode, _super);
    function NullTypeNode() {
        _super.call(this);
    }
    NullTypeNode.prototype.visit = function (v) {
        return v.visitNullTypeNode(this);
    };
    return NullTypeNode;
})(TreeNode);
exports.NullTypeNode = NullTypeNode;
var EmptyArrayTypeNode = (function (_super) {
    __extends(EmptyArrayTypeNode, _super);
    // This type is equal with any array type when compared
    function EmptyArrayTypeNode() {
        _super.call(this);
    }
    EmptyArrayTypeNode.prototype.visit = function (v) {
        return v.visitEmptyArrayTypeNode(this);
    };
    return EmptyArrayTypeNode;
})(TreeNode);
exports.EmptyArrayTypeNode = EmptyArrayTypeNode;
exports.INT_TYPE = new IntTypeNode();
exports.CHAR_TYPE = new CharTypeNode();
exports.BOOL_TYPE = new BoolTypeNode();
exports.STRING_TYPE = new ArrayTypeNode(exports.CHAR_TYPE, 1);
exports.EMPTY_ARRAY_TYPE = new EmptyArrayTypeNode();
exports.NULL_TYPE = new NullTypeNode();
