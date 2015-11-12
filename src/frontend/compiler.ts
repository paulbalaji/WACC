import frontend = require('./frontend/frontend.ts');
var fs = require('fs');

function compile(programStr) {
	return frontend.semanticCheck(frontend.parse(programStr));
}

fs.readFile(filename, 'utf8', function (err, programStr) {
	if (err) { throw err; }

	compile(programStr);
});