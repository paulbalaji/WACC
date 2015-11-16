var parser = require('./grammar/grammar');
var _ = require('underscore');
var SemanticChecker = require('./SemanticChecker');
var WACCError = require('./WACCError');
function parse(programStr) {
    // Parse the input and create ast.
    try {
        var ast = parser.parse(programStr);
    }
    catch (e) {
        throw new WACCError.ParserSyntaxError(e);
    }
    return ast;
}
exports.parse = parse;
;
function semanticCheck(ast) {
    /*
        Execute semantic check on the input (throws error in
        case of failure).
    */
    var semanticVisitor = new SemanticChecker.SemanticVisitor();
    ast.visit(semanticVisitor);
}
exports.semanticCheck = semanticCheck;
;
