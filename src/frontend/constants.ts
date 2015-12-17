export var WACC_MAX_INT:number = Math.pow(2, 31) - 1;
export var WACC_MIN_INT:number = -Math.pow(2, 31);

export var SYNTAX_ERROR_CODE   = 100;
export var SEMANTIC_ERROR_CODE = 200;

export var startOfStack = 0x8000;

export var startOfHeap = 0xffff0;

export var flags = {};
export var barebones = false;

export var validGPIOPins = [11, 21, 22, 23, 24, 25, 27];