declare class ErrorLocation {
	public line:number;
	public column:number;
	public offset:number;

	constructor(line: number, column: number, offset: number) {
		this.line = line;
		this.column = column;
		this.offset = offset;
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

declare class SemanticError implements Error {
	public message: string;
	public location: ErrorLocation;

	constructor(message: string, location: ErrorLocation) {
		this.message = message;
		this.location = location;
	}

	toString():string {
		var line = parseInt(ErrorLocation.getLine()),
			column = ErrorLocation.getColumn();

		return "line: " + line + " position: " column + "; message: " + this.message;
	}; 
	}
}