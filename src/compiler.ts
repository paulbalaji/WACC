import frontend = require("./frontend/frontend");
import NodeType = require("./frontend/NodeType");
var fs = require("fs");

var filename : string = process.argv[2];

export function compileStr(programStr) {
	var ast = frontend.parse(programStr);
	return frontend.semanticCheck(ast);
}

export function compile(filename) {
  fs.readFile(filename, "utf8", function (err, programStr) {
    if (err) { throw err; }
    compileStr(programStr);
  });
}

process.on("uncaughtException", function (err) {
  if (!err.code) {
    console.log(filename);
    console.log("Unknown exception occured.");
    throw err;
  }

  process.exit(err.code);
});