import frontend = require('./frontend/frontend');
import backend = require('./backend/backend');
import NodeType = require('./frontend/NodeType');
import Constants = require('./frontend/constants');
import Error = require('./frontend/WACCError');

var rootProcess = process;
var colors = require('colors');

var fs = require('fs');
var path = require('path');
var async = require('async');

var filename: string = process.argv[2];
var silence: string = ''; // TODO: Redo silence flag handling, considering header files

// Setup error handling for the process
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

function compileStr(programStr, filename) {
	var ast = frontend.parse(programStr, filename);
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
export function compile(mainFilename, headerFilenames, outputFilename, flags) {
    Constants.Globals.flags = flags;
    var headerFunctions = [];
    var headerStructs   = [];
    var processHeaderFilename = function(headerFilename, signalDone) {
         readFileWithErrorReport(headerFilename, function (headerStr) {
            var rootAST = frontend.parse(headerStr, headerFilename);
            if (!(rootAST instanceof NodeType.HeaderNode)) {
                // The case that the header file is not a valid header declaration.
                throw { code: 1,
                        name:'Invalid Header File',
                        location: headerFilename,
                        message: 'WACC header files must begin with header token.'
                     };
            }
            
            var headerAST: NodeType.HeaderNode = <NodeType.HeaderNode> rootAST;

            headerFunctions = headerFunctions.concat(headerAST.functionList);
            headerStructs   = headerStructs.concat(headerAST.structList);
            signalDone();
        });
    };

    var onAllHeadersResolved = function(err) {

         if (err) { console.log('Error reading header files', err);}

         readFileWithErrorReport(mainFilename, function (programStr) {
            var ast = <NodeType.ProgramNode> frontend.parse(programStr, mainFilename);
            headerFunctions.forEach(function(headerFunc) {
                ast.functionList.push(headerFunc);
            });
            headerStructs.forEach(function(headerStruct) {
                ast.structList.push(headerStruct);
            })
            frontend.semanticCheck(ast);
            fs.writeFile(outputFilename, backend.generateCode(ast));
         });
    };

    async.each(headerFilenames, processHeaderFilename, onAllHeadersResolved);
}