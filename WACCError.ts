var _ = require('underscore');

var fileInfo:{filename:String, errorFlag: String};

function _throw(e) {
	if (fileInfo.errorFlag === 'error') { 
		console.log(fileInfo.filename);
	}		throw e;
	

}

export function setFileInfo(_fileInfo) {
	fileInfo = _fileInfo;
}

export class ErrorLocation {
	private line: number;
	private column: number;
	private offset: number;

	constructor(location: any) {
		this.line = location.start.line;
		this.column = location.start.column;
		this.offset = location.start.offset;
	}

	getLine() {
		return this.line;
	}

	getColumn() {
		return this.column;
	}

	getOffset() {
		return this.offset;
	}
}

export class SyntaxError extends Error{
	e;

	constructor(e) {
		super();
		this.name = 'Syntax Error';
		this.e = e;
	}

	toString() {
		var e = this.e;
		return "Syntactic error at " + e.location.start.line +
                        ":" + e.location.end.line + " --mismatched input '"
                        + e.found + "' expecting one of {" +
                        _.pluck(e.expected, 'description').join(', ') + "}";

	}; 

	throw() {
		_throw(this);
		process.exit(1);
	}
}

/*function _SemanticError(message, location) {
	this.name = 'Semantic Error';	
	this.message = '(line: ' + location.getLine() +
			', column: ' + location.getColumn() +
			') ' + message;
	
};

_SemanticError.prototype.throw = function() { throw this; }
_SemanticError.prototype = Object.create(Error.prototype);
export var SemanticError = _SemanticError;*/

export class SemanticError extends Error{
	public message: string;
	public location: ErrorLocation;

	constructor(message: string, location: ErrorLocation) {
		super();
		this.name = 'Semantic Error';
		this.message = message;
		this.location = location;
	}

	toString() {
		return "(line: " + this.location.getLine() +
			", column: " + this.location.getColumn() +
			") " + this.message;
	}; 

	throw() {
		_throw(this);
		process.exit(1);
	}
	
} 


/*

export class SemanticError {
	public message: string;
	public location: ErrorLocation;

	constructor(message: string, location: ErrorLocation) {
		this.message = message;
		this.location = location;
	}

	toString() {
		return "(line: " + this.location.getLine() +
			", column: " + this.location.getColumn() +
			") " + this.message;
	}; 

	throw() {
		_throw(this.toString());
	}
	
} 
*/