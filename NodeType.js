///<reference path="node.d.ts"/>
///<reference path="Constants.ts"/>
var Const = require('./Constants');
var ProgramNode = (function () {
    function ProgramNode(functionList, statList) {
        this.functionList = functionList;
        this.statList = statList;
    }
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
    return FuncNode;
})();
exports.FuncNode = FuncNode;
var SkipNode = (function () {
    function SkipNode() {
    }
    return SkipNode;
})();
exports.SkipNode = SkipNode;
var ReadNode = (function () {
    function ReadNode(lhsNode) {
        this.readTarget = lhsNode;
    }
    return ReadNode;
})();
exports.ReadNode = ReadNode;
var PrintlnNode = (function () {
    function PrintlnNode(expr) {
        this.expr = expr;
    }
    return PrintlnNode;
})();
exports.PrintlnNode = PrintlnNode;
var PairElemTypePAIRNode = (function () {
    function PairElemTypePAIRNode() {
    }
    return PairElemTypePAIRNode;
})();
exports.PairElemTypePAIRNode = PairElemTypePAIRNode;
var BaseTypeNode = (function () {
    function BaseTypeNode(typeName) {
        this.typeName = typeName;
    }
    return BaseTypeNode;
})();
exports.BaseTypeNode = BaseTypeNode;
var PairElemTypeNode = (function () {
    function PairElemTypeNode(type) {
        this.type = type;
    }
    return PairElemTypeNode;
})();
exports.PairElemTypeNode = PairElemTypeNode;
var IdentNode = (function () {
    function IdentNode(identStr) {
        this.identStr = identStr;
    }
    return IdentNode;
})();
exports.IdentNode = IdentNode;
var BinOpExprNode = (function () {
    function BinOpExprNode(leftOperand, rightOperand, operator) {
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operator = operator;
    }
    return BinOpExprNode;
})();
exports.BinOpExprNode = BinOpExprNode;
var StrLiterNode = (function () {
    function StrLiterNode(str) {
        this.str = str;
    }
    return StrLiterNode;
})();
exports.StrLiterNode = StrLiterNode;
var AssignNode = (function () {
    function AssignNode(lhs, rhs) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    return AssignNode;
})();
exports.AssignNode = AssignNode;
// check lhs ident is declared previously in any of the parent scopes
// check lhs is the same type as rhs, or can be cast
var BeginEndBlockNode = (function () {
    function BeginEndBlockNode(statList) {
        this.statList = statList;
    }
    return BeginEndBlockNode;
})();
exports.BeginEndBlockNode = BeginEndBlockNode;
var ReturnNode = (function () {
    function ReturnNode(returnExpr) {
        this.returnExpr = returnExpr;
    }
    return ReturnNode;
})();
exports.ReturnNode = ReturnNode;
var WhileNode = (function () {
    function WhileNode(predicateExpr, loopBody) {
        this.predicateExpr = predicateExpr;
        this.loopBody = loopBody;
    }
    return WhileNode;
})();
exports.WhileNode = WhileNode;
var PairTypeNode = (function () {
    function PairTypeNode(type1, type2) {
        this.type1 = type1;
        this.type2 = type2;
    }
    return PairTypeNode;
})();
exports.PairTypeNode = PairTypeNode;
var PairElemSndNode = (function () {
    function PairElemSndNode(expr) {
        this.expr = expr;
    }
    return PairElemSndNode;
})();
exports.PairElemSndNode = PairElemSndNode;
var ArrayLiterNode = (function () {
    function ArrayLiterNode(list) {
        this.list = list;
    }
    return ArrayLiterNode;
})();
exports.ArrayLiterNode = ArrayLiterNode;
var CharLiterNode = (function () {
    function CharLiterNode(ch) {
        this.ch = ch;
    }
    return CharLiterNode;
})();
exports.CharLiterNode = CharLiterNode;
var ExitNode = (function () {
    function ExitNode(expr) {
        this.expr = expr;
    }
    return ExitNode;
})();
exports.ExitNode = ExitNode;
var IfNode = (function () {
    function IfNode(predicateExp, trueStatList, falseStatList) {
        this.predicateExp = predicateExp;
        this.trueStatList = trueStatList;
        this.falseStatList = falseStatList;
    }
    return IfNode;
})();
exports.IfNode = IfNode;
var ArrayTypeNode = (function () {
    function ArrayTypeNode(type, depth) {
        this.type = depth === 1 ? type : new ArrayTypeNode(type, depth - 1);
    }
    return ArrayTypeNode;
})();
exports.ArrayTypeNode = ArrayTypeNode;
var PairElemFstNode = (function () {
    function PairElemFstNode(expr) {
        this.expr = expr;
    }
    return PairElemFstNode;
})();
exports.PairElemFstNode = PairElemFstNode;
var NewPairNode = (function () {
    function NewPairNode(fstExpr, sndExpr) {
        this.fstExpr = fstExpr;
        this.sndExpr = sndExpr;
    }
    return NewPairNode;
})();
exports.NewPairNode = NewPairNode;
var BoolLiterNode = (function () {
    function BoolLiterNode(bool) {
        this.bool = bool;
    }
    return BoolLiterNode;
})();
exports.BoolLiterNode = BoolLiterNode;
var UnOpNode = (function () {
    function UnOpNode(unOp, expr) {
        this.unOp = unOp;
        this.expr = expr;
    }
    return UnOpNode;
})();
exports.UnOpNode = UnOpNode;
var ParamNode = (function () {
    function ParamNode(type, ident) {
        this.type = type;
        this.ident = ident;
    }
    return ParamNode;
})();
exports.ParamNode = ParamNode;
var FreeNode = (function () {
    function FreeNode(expr) {
        this.expr = expr;
    }
    return FreeNode;
})();
exports.FreeNode = FreeNode;
var PrintNode = (function () {
    function PrintNode(expr) {
        this.expr = expr;
    }
    return PrintNode;
})();
exports.PrintNode = PrintNode;
var DeclareNode = (function () {
    function DeclareNode(type, ident, rhs) {
        this.type = type;
        this.ident = ident;
        this.rhs = rhs;
    }
    return DeclareNode;
})();
exports.DeclareNode = DeclareNode;
// check type is the type of rhs
var ArrayElemNode = (function () {
    function ArrayElemNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    return ArrayElemNode;
})();
exports.ArrayElemNode = ArrayElemNode;
var CallNode = (function () {
    function CallNode(ident, exprList) {
        this.ident = ident;
        this.exprList = exprList;
    }
    return CallNode;
})();
exports.CallNode = CallNode;
var PairLiterNode = (function () {
    function PairLiterNode() {
    }
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
    return IntLiterNode;
})();
exports.IntLiterNode = IntLiterNode;
// check overflow
