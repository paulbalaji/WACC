///<reference path="Constants.ts"/>

var parser = require('./grammar/grammar');
var _ = require('underscore');
var printTree = require('./node_modules/printTree');

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

                var ast : NodeType.Visitable = parser.parse(data);
                // console.log('TEST SUCCEEDED ON FILE NAME ' + filename);

                var semanticVisitor = new SemanticChecker.SemanticVisitor();
                ast.visit(semanticVisitor);

                // Print errors out from semanticVisitor
                _.map(semanticVisitor.errors, (e) => console.log(e));

                if (errorFlag === 'success') {  
                  console.log(filename); 
                }
                //printTree(ast, 'ROOT');
                // console.log(util.inspect(ast, false, null));
        } catch (e) {
                if (errorFlag === 'error') {
                    console.log(filename);
                }

                if (verbose) {
                  console.log(e);
                }
                // console.log('---EXITING---');
                // process.exit();
        }

});

