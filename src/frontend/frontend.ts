var parser = require('./grammar/grammar');
var _ = require('underscore');

import util = require('util');
import NodeType = require('./NodeType');
import SemanticChecker = require('./SemanticChecker');
import WACCError = require('./WACCError');

import fs = require('fs');

export function parse(programStr) {
    // Parse the input and create ast.
    try {
        var ast: NodeType.Visitable = parser.parse(programStr);
    } catch (e) { 
        throw new WACCError.ParserSyntaxError(e);
    }

    return ast;
};

export function semanticCheck(ast) {
    /* 
        Execute semantic check on the input (throws error in 
        case of failure).
    */
    
    var semanticVisitor = new SemanticChecker.SemanticVisitor();
    ast.visit(semanticVisitor);
};