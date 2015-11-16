var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var constants = require('./constants');
var _ = require('underscore');
var ErrorLocation = (function () {
    function ErrorLocation(location) {
        this.line = location.start.line;
        this.column = location.start.column;
        this.offset = location.start.offset;
    }
    ErrorLocation.prototype.getLine = function () {
        return this.line;
    };
    ErrorLocation.prototype.getColumn = function () {
        return this.column;
    };
    ErrorLocation.prototype.getOffset = function () {
        return this.offset;
    };
    return ErrorLocation;
})();
exports.ErrorLocation = ErrorLocation;
var SyntaxError = (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError(message, location) {
        _super.call(this);
        this.name = 'Syntax Error at';
        this.message = '('
            + location.getLine() + ', '
            + location.getColumn() + ') --'
            + message;
        this.code = constants.SYNTAX_ERROR_CODE;
    }
    return SyntaxError;
})(Error);
exports.SyntaxError = SyntaxError;
var ParserSyntaxError = (function (_super) {
    __extends(ParserSyntaxError, _super);
    function ParserSyntaxError(pegError) {
        _super.call(this);
        this.name = 'Syntax Error at';
        this.message = '('
            + pegError.location.start.line + ', '
            + pegError.location.end.line + ')';
        if (pegError.found === null) {
            this.message += 'Found nothing but';
        }
        else {
            this.message = '--mismatched input : found:"'
                + pegError.found + '" but';
        }
        this.message += ' expecting one of {'
            + _.pluck(pegError.expected, 'description').join(', ') + '}';
        this.code = constants.SYNTAX_ERROR_CODE;
    }
    return ParserSyntaxError;
})(Error);
exports.ParserSyntaxError = ParserSyntaxError;
var SemanticError = (function (_super) {
    __extends(SemanticError, _super);
    function SemanticError(message, location) {
        _super.call(this);
        this.name = 'Semantic Error at';
        this.message = '('
            + location.getLine() + ', '
            + location.getColumn() + ') --'
            + message;
        this.code = constants.SEMANTIC_ERROR_CODE;
    }
    return SemanticError;
})(Error);
exports.SemanticError = SemanticError;
