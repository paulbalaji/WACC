///<reference path="node.d.ts"/>
var Const = require('./Constants');
var ProgramNode = (function () {
    function ProgramNode(functionList, statList) {
        this.functionList = functionList;
        this.statList = statList;
    }
    ProgramNode.prototype.visit = function (v) {
        v.visitProgramNode(this);
    };
    return ProgramNode;
})();
exports.ProgramNode = ProgramNode;
var FuncNode = (function () {
    function FuncNode(type, ident, paramList, statList) {
        this.type = type;
        this.ident = ident;
        this.paramList = paramList;
        this.statList = statList;
    }
    FuncNode.prototype.visit = function (v) {
        v.visitFuncNode(this);
    };
    return FuncNode;
})();
exports.FuncNode = FuncNode;
var SkipNode = (function () {
    function SkipNode() {
    }
    SkipNode.prototype.visit = function (v) {
        return v.visitSkipNode(this);
    };
    return SkipNode;
})();
exports.SkipNode = SkipNode;
var ReadNode = (function () {
    function ReadNode(lhsnode) {
        this.readTarget = lhsNode;
    }
    ReadNode.prototype.visit = function (v) {
        v.visitReadNode(this);
    };
    return ReadNode;
})();
exports.ReadNode = ReadNode;
var PrintlnNode = (function () {
    function PrintlnNode(expr) {
        this.expr = expr;
    }
    PrintlnNode.prototype.visit = function (v) {
        v.visitPrintlnNode(this);
    };
    return PrintlnNode;
})();
exports.PrintlnNode = PrintlnNode;
var PairElemTypePAIRNode = (function () {
    function PairElemTypePAIRNode() {
    }
    // This is supposed to be empty, dont you worry child
    PairElemTypePAIRNode.prototype.visit = function (v) {
        v.visitPairElemTypePAIRNode(this);
    };
    return PairElemTypePAIRNode;
})();
exports.PairElemTypePAIRNode = PairElemTypePAIRNode;
var BaseTypeNode = (function () {
    function BaseTypeNode(typeName) {
        this.typeName = typeName;
    }
    BaseTypeNode.prototype.visit = function (v) {
        v.visitBaseTypeNode(this);
    };
    return BaseTypeNode;
})();
exports.BaseTypeNode = BaseTypeNode;
var PairElemTypeNode = (function () {
    function PairElemTypeNode(type) {
        this.type = type;
    }
    PairElemTypeNode.prototype.visit = function (v) {
        v.visitPairElemTypeNode(this);
    };
    return PairElemTypeNode;
})();
exports.PairElemTypeNode = PairElemTypeNode;
var IdentNode = (function () {
    function IdentNode(identStr) {
        this.identStr = identStr;
    }
    IdentNode.prototype.visit = function (v) {
        v.visitIdentNode(this);
    };
    return IdentNode;
})();
exports.IdentNode = IdentNode;
var BinOpExprNode = (function () {
    function BinOpExprNode(leftOperand, rightOperand, operator) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
    BinOpExprNode.prototype.visit = function (v) {
        v.visitBinOpExprNode(this);
    };
    return BinOpExprNode;
})();
exports.BinOpExprNode = BinOpExprNode;
var StrLiterNode = (function () {
    function StrLiterNode(str) {
        this.str = str;
    }
    StrLiterNode.prototype.visit = function (v) {
        v.visitStrLiterNode(this);
    };
    return StrLiterNode;
})();
exports.StrLiterNode = StrLiterNode;
var AssignNode = (function () {
    function AssignNode(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    AssignNode.prototype.visit = function (v) {
        v.visitAssignNode(this);
    };
    return AssignNode;
})();
exports.AssignNode = AssignNode;
// check lhs ident is declared previously in any of the parent scopes
// check lhs is the same type as rhs, or can be cast
var BeginEndBlockNode = (function () {
    function BeginEndBlockNode(statList) {
        this.statList = statList;
    }
    BeginEndBlockNode.prototype.visit = function (v) {
        v.visitBeginEndBlockNode(this);
    };
    return BeginEndBlockNode;
})();
exports.BeginEndBlockNode = BeginEndBlockNode;
var ReturnNode = (function () {
    function ReturnNode(returnExpr) {
        this.returnExpr = returnExpr;
    }
    ReturnNode.prototype.visit = function (v) {
        v.visitReturnNode(this);
    };
    return ReturnNode;
})();
exports.ReturnNode = ReturnNode;
var WhileNode = (function () {
    function WhileNode(predicateExpr, loopBody) {
        this.predicateExpr = predicateExpr;
        this.loopBody = loopBody;
    }
    WhileNode.prototype.visit = function (v) {
        v.visitWhileNode(this);
    };
    return WhileNode;
})();
exports.WhileNode = WhileNode;
var PairTypeNode = (function () {
    function PairTypeNode(type1, type2) {
        this.type1 = type1;
        this.type2 = type2;
    }
    PairTypeNode.prototype.visit = function (v) {
        v.visitPairTypeNode(this);
    };
    return PairTypeNode;
})();
exports.PairTypeNode = PairTypeNode;
var PairElemSndNode = (function () {
    function PairElemSndNode(expr) {
        this.expr = expr;
    }
    PairElemSndNode.prototype.visit = function (v) {
        v.visitPairElemSndNode(this);
    };
    return PairElemSndNode;
})();
exports.PairElemSndNode = PairElemSndNode;
var ArrayLiterNode = (function () {
    function ArrayLiterNode(list) {
        this.list = list;
    }
    ArrayLiterNode.prototype.visit = function (v) {
        v.visitArrayLiterNode(this);
    };
    return ArrayLiterNode;
})();
exports.ArrayLiterNode = ArrayLiterNode;
var CharLiterNode = (function () {
    function CharLiterNode(ch) {
        this.ch = ch;
    }
    CharLiterNode.prototype.visit = function (v) {
        v.visitCharLiterNode(this);
    };
    return CharLiterNode;
})();
exports.CharLiterNode = CharLiterNode;
var ExitNode = (function () {
    function ExitNode(expr) {
        this.expr = expr;
    }
    ExitNode.prototype.visit = function (v) {
        return v.visitExitNode(this);
    };
    return ExitNode;
})();
exports.ExitNode = ExitNode;
var IfNode = (function () {
    function IfNode(predicateExp, trueStatList, falseStatList) {
        this.predicateExp = predicateExp;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
    IfNode.prototype.visit = function (v) {
        return v.visitIfNode(this);
    };
    return IfNode;
})();
exports.IfNode = IfNode;
var ArrayTypeNode = (function () {
    function ArrayTypeNode(type, depth) {
        this.type = depth === 1 ? type : new ArrayTypeNode(type, depth - 1);
    }
    ArrayTypeNode.prototype.visit = function (v) {
        return v.visitArrayTypeNode(this);
    };
    return ArrayTypeNode;
})();
exports.ArrayTypeNode = ArrayTypeNode;
var PairElemFstNode = (function () {
    function PairElemFstNode(expr) {
        this.expr = expr;
    }
    PairElemFstNode.prototype.visit = function (v) {
        return v.visitPairElemFstNode(this);
    };
    return PairElemFstNode;
})();
exports.PairElemFstNode = PairElemFstNode;
var NewPairNode = (function () {
    function NewPairNode(fstExpr, sndExpr) {
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
    NewPairNode.prototype.visit = function (v) {
        return v.visitNewPairNode(this);
    };
    return NewPairNode;
})();
exports.NewPairNode = NewPairNode;
var BoolLiterNode = (function () {
    function BoolLiterNode(bool) {
        this.bool = bool;
    }
    BoolLiterNode.prototype.visit = function (v) {
        return v.visitBoolLiterNode(this);
    };
    return BoolLiterNode;
})();
exports.BoolLiterNode = BoolLiterNode;
var UnOpNode = (function () {
    function UnOpNode(unOp, expr) {
        this.unOp = unOp;
        this.expr = expr;
    }
    UnOpNode.prototype.visit = function (v) {
        return v.visitUnOpNode(this);
    };
    return UnOpNode;
})();
exports.UnOpNode = UnOpNode;
var ParamNode = (function () {
    function ParamNode(type, ident) {
        this.type = type;
        this.ident = ident;
    }
    ParamNode.prototype.visit = function (v) {
        v.visitParamNode(this);
    };
    return ParamNode;
})();
exports.ParamNode = ParamNode;
var FreeNode = (function () {
    function FreeNode(expr) {
        this.expr = expr;
    }
    FreeNode.prototype.visit = function (v) {
        v.visitFreeNode(this);
    };
    return FreeNode;
})();
exports.FreeNode = FreeNode;
var PrintNode = (function () {
    function PrintNode(expr) {
        this.expr = expr;
    }
    PrintNode.prototype.visit = function (v) {
        v.visitPrintNode(this);
    };
    return PrintNode;
})();
exports.PrintNode = PrintNode;
var DeclareNode = (function () {
    function DeclareNode(type, ident, rhs) {
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }
    DeclareNode.prototype.visit = function (v) {
        v.visitDeclareNode(this);
    };
    return DeclareNode;
})();
exports.DeclareNode = DeclareNode;
// check type is the type of rhs
var ArrayElemNode = (function () {
    function ArrayElemNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    ArrayElemNode.prototype.visit = function (v) {
        v.visitArrayElemNode(this);
    };
    return ArrayElemNode;
})();
exports.ArrayElemNode = ArrayElemNode;
var CallNode = (function () {
    function CallNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    CallNode.prototype.visit = function (v) {
        v.visitCallNode(this);
    };
    return CallNode;
})();
exports.CallNode = CallNode;
var PairLiterNode = (function () {
    function PairLiterNode() {
    }
    PairLiterNode.prototype.visit = function (v) {
        v.visitPairLiterNode(this);
    };
    return PairLiterNode;
})();
exports.PairLiterNode = PairLiterNode;
var IntLiterNode = (function () {
    function IntLiterNode(num) {
        this.num = num;
    }
    IntLiterNode.prototype.check = function () {
        if (this.num > Const.WACC_MAX_INT) {
            console.log('Error exceeds maxint');
        }
        if (this.num < Const.WACC_MIN_INT) {
            console.log('Error exceeds maxint');
        }
        return true;
    };
    IntLiterNode.prototype.visit = function (v) {
        v.visitIntLiterNode(this);
    };
    return IntLiterNode;
})();
exports.IntLiterNode = IntLiterNode;
