///<reference path="node.d.ts"/>
import Nodes = require('./NodeTypes');
var printTree = require('printTree');
var parser = require('./grammar');
var util   = require('util');

var fs = require('fs'),
    filename = process.argv[2],
    tracerFlag = false,
    errorFlag = process.argv[3],
    verbose = process.argv[4];

var tracer = tracerFlag ? {} : {tracer: {trace: function() {}}};
fs.readFile(filename, 'utf8', function(err, data) {

        if (err) { throw err };
  
        try {

                var ast = parser.parse(data, tracer);

                if (errorFlag === 'success') {  
                  	console.log(filename); 
                }
              	console.log(ast);
                printTree(ast, 'Root');

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