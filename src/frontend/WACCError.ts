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

    getLine(): number {
        return this.line;
    }

    getColumn(): number {
        return this.column;
    }

    getOffset(): number {
        return this.offset;
    }

    toString(): string {
        return '(' + this.line + ', ' + this.column + ')';
    }
}

export class SyntaxError extends Error {
    location: ErrorLocation;
    code: number;

    constructor(message: string, location: ErrorLocation) {
        super();
        this.name = 'Syntax Error';
        this.location = location;
        this.message = message;
        this.code = constants.SYNTAX_ERROR_CODE;
    }
}

export class ParserSyntaxError extends Error {
    code: number;

    constructor(pegError) {
        super();
        this.name = 'Syntax Error';
        this.message = '('
            + pegError.location.start.line + ', '
            + pegError.location.end.line + ') ';
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
    location: ErrorLocation
    code: number;

    constructor(message: string, location: ErrorLocation) {
        super();
        this.name = 'Semantic Error';
        this.location = location;
        this.message = message;
        this.code = constants.SEMANTIC_ERROR_CODE;
    }
} 
 