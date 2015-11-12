///<reference path="Constants.ts"/>
var parser = require('./grammar/grammar');
var _ = require('underscore');

import util = require('util');
import NodeType = require('./NodeType');
import SemanticChecker = require('./SemanticChecker');
import WACCError = require('./WACCError');

import fs = require('fs');

var filename : string = process.argv[2];
var errorFlag :  string = process.argv[3];
var verbose : string  = process.argv[4];

WACCError.setFileInfo({filename: filename, errorFlag: errorFlag});
function checkSyntaxAndSemantics(filename) {
fs.readFile(filename, 'utf8', function(err : Error, data : string) {
        if (err) { throw err };
  
            // Parse the input and create ast.
            try {
                var ast: NodeType.Visitable = parser.parse(data);
            } catch (e) { 
                throw new WACCError.SyntaxError(e);
            }
            
            // Execute semantic check on the input (throws error in 
            // case of failure).
            var semanticVisitor = new SemanticChecker.SemanticVisitor();
            ast.visit(semanticVisitor);

            // If the file was not supposed to throw an error, write the filename.
            // For testing purposes only.
         

            // If verbose flag is set, write details of the error.
            if (verbose) {
                //console.log(e)
            }

});

process.on('uncaughtException', function (err) {
  if (!err.code) { 
    console.log(filename);
    console.log('Unknown exception occured.');
    throw err;
    process.exit(1);
  }

  if (verbose) {
      console.log(err.name + ': ' + err.message);
  }

  process.exit(err.code);
})
}
module.exports = checkSyntaxAndSemantics;
