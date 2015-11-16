
import constants = require('./constants');

var _ = require('underscore');

export class ErrorLocation {
    private line: number;
    private column: number;
    private offset: number;

    constructor(location: any) {
        this.line = location.start.line;
        this.column = location.start.column;
        this.offset = location.start.offset;
    }

    getLine() :number {
        return this.line;
    }

    getColumn() :number {
        return this.column;
    }

    getOffset() :number {
        return this.offset;
    }
}

export class SyntaxError extends Error {
    code: number;
    constructor(message: string, location: ErrorLocation) {
        super();
        this.name = 'Syntax Error at';
            + '('
            + location.getLine() + ', '
            + location.getColumn() + ') --'
                     + message;
        this.code = constants.SYNTAX_ERROR_CODE;
    }
}

export class ParserSyntaxError extends Error {
    code: number;
    constructor(pegError) {
        super();
        this.name = 'Syntax Error at';
        this.message = '('
            + pegError.location.start.line + ', '
            + pegError.location.end.line + ')';
        if (pegError.found === null) {
            this.message += 'Found nothing but'
        } else {
            this.message += 'Mismatched input - found:"'
                + pegError.found + '" but';
        }
        this.message += ' expecting one of {'
            + _.pluck(pegError.expected, 'description').join(', ') + '}';
        this.code = constants.SYNTAX_ERROR_CODE;
    }
}

export class SemanticError extends Error {
    code: number;

    constructor(message: string, location: ErrorLocation) {
        super();
        this.name = 'Semantic Error at';
            + '('
            + location.getLine() + ', '
            + location.getColumn() + ') --'
                     + message;
        this.code = constants.SEMANTIC_ERROR_CODE;
    }
} 
 