var _ = require('underscore');

var fileInfo:{filename:String, errorFlag: String};

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

	getLine():number {
		return this.line;
	}

	getColumn():number {
		return this.column;
	}

	getOffset():number {
		return this.offset;
	}
}

export class SyntaxError extends Error{
	e;
	code;

	constructor(e) {
		super();
		this.name = 'Syntax Error';
		this.message = e.location.start.line + ":" 
					 + e.location.end.line   + " --mismatched input '"
                     + e.found 		         + "' expecting one of {"
                     + _.pluck(e.expected, 'description').join(', ') + "}";
		this.e = e;
		this.code = 100;
	}
}

export class SemanticError extends Error{
	public message: string;
	public location: ErrorLocation;
	code: number

	constructor(message: string, location: ErrorLocation) {
		super();
		this.name = 'Semantic Error';
		this.message = '(line: ' + location.getLine() +
			', column: ' + location.getColumn() +
			') ' + message;
		this.location = location;
		this.code = 200;
	}
} 
