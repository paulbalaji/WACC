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
		console.log(this.message);
		throw this.toString();
	}
	
}
