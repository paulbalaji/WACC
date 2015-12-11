var parser = require('./grammar/grammar');

import NodeType = require('./NodeType');
import SemanticChecker = require('./SemanticChecker');
import WACCError = require('./WACCError');

export function parse(programStr, filename) {
    // Parse the input and create ast.
    try {
        var ast: NodeType.Visitable = parser.parse(programStr);
    } catch (err) {
        throw new WACCError.ParserSyntaxError(err, filename);
    }

    return ast;
};

export function semanticCheck(ast) {
    /* 
        Execute semantic check on the ast (throws error in 
        case of failure).
    */
    var semanticVisitor = new SemanticChecker.SemanticVisitor();
    var programInfo = ast.visit(semanticVisitor);
    return programInfo;
};