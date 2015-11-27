import frontend = require('./frontend/frontend');
import backend = require('./backend/backend');
var colors = require('colors');

var fs = require('fs');

var filename: string = process.argv[2];
var silence: string = process.argv[3];

function compileStr(programStr) {
	var ast = frontend.parse(programStr);
	frontend.semanticCheck(ast);
    var code = backend.generateCode(ast);
    console.log(code);
}

/*
    Given a filename, it throws an error if the program can't be found, is semantically 
    or syntactically incorrect it throws an error object.
*/
export function compile(filename) {
    fs.readFile(filename, 'utf8', function (err, programStr) {
        if (err) { 
            err.code = 1;     
            err.name = 'IO error';
            err.location = filename;
            err.message = 'File not found.';
            throw err;
        }
        compileStr(programStr);
    });
}

process.on('uncaughtException', function (err) {
    if (!err.code) {
        console.log(filename);
        console.log('Unknown exception occured.');
        throw err;
    }
    if (!silence) {
        console.log(err.name.underline.bold.red 
            + ' ' + err.location.toString().magenta 
            + ': ' + err.message.cyan);
    }
    process.exit(err.code);
});