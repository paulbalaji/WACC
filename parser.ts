///<reference path="Constants.ts"/>

var parser = require('./grammar/grammar');
var _ = require('underscore');

import util = require('util');
import NodeType = require('./NodeType');
import SemanticChecker = require('./SemanticChecker');


import fs = require('fs');

var filename : string = process.argv[2];
var errorFlag :  string = process.argv[3];
var verbose : string  = process.argv[4];

fs.readFile(filename, 'utf8', function(err : Error, data : string) {

        if (err) { throw err };
  
        try {
                // Parse the input and create ast.
                var ast : NodeType.Visitable = parser.parse(data);

                // Execute semantic check on the input (throws error in 
                // case of failure).
                var semanticVisitor = new SemanticChecker.SemanticVisitor();
                ast.visit(semanticVisitor);

                // If the file was not supposed to succeed, write the filename.
                // For testing purposes only.
                if (errorFlag === 'success') {  
                  console.log(filename); 
                }
                
        } catch (e) {
                // If the file was not supposed to throw an error, write the filename.
                // For testing purposes only.
                if (errorFlag === 'error') {
                    console.log(filename);
                }

                // If verbose flag is set, write details of the error.
                if (verbose) {
                  console.log(e);
                }
        }
});
