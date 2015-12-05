import frontend = require('./frontend/frontend');
import backend = require('./backend/backend');
import NodeType = require('./frontend/NodeType');

var rootProcess = process;

var colors = require('colors');

var fs = require('fs');
var path = require('path');
var async = require('async');

var filename: string = process.argv[2];
var silence: string = ''; // TODO: Redo silence flag handling, considering header files

function compileStr(programStr) {
	var ast = frontend.parse(programStr);
	frontend.semanticCheck(ast);
    return backend.generateCode(ast);   
}

function readFileWithErrorReport(filename, cb) {
    fs.readFile(filename, 'utf8', function(err, str) {
        if (err) { 
            err.code = 1;     
            err.name = 'IO error';
            err.location = filename;
            err.message = 'File not found.';
            throw err;
        }
        cb(str);
    });
}

/*
    Given a filename, it throws an error if the program can't be found, is semantically 
    or syntactically incorrect it throws an error object.
*/
export function compile(mainFilename, headerFilenames, outputFilename) {
    var headerFunctions = [];
    var processHeaderFilename = function(headerFilename, signalDone) {
         readFileWithErrorReport(headerFilename, function (headerStr) {
            var headerAST = <NodeType.HeaderNode> frontend.parse(headerStr);

            headerFunctions = headerFunctions.concat(headerAST.functionList);
            signalDone();
        });
    };

    var onAllHeadersResolved = function(err) {

         if (err) { console.log(' Man async js fucked it.', err);}

         readFileWithErrorReport(mainFilename, function (programStr) {
            var ast = <NodeType.ProgramNode> frontend.parse(programStr);
            headerFunctions.forEach(function(headerFunc) {
                ast.functionList.push(headerFunc);
            });
            frontend.semanticCheck(ast);
            fs.writeFile(outputFilename, backend.generateCode(ast));
         });
    };

    async.each(headerFilenames, processHeaderFilename, onAllHeadersResolved);
}


process.on('uncaughtException', function (err) {
    if (!err.code) {
        console.log(err);
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