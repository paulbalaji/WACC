///<reference path="Constants.ts"/>
var parser = require('./grammar/grammar');
var _ = require('underscore');
var printTree = require('./node_modules/printTree');
var SemanticChecker = require('./SemanticChecker');
var fs = require('fs');
var filename = process.argv[2];
var errorFlag = process.argv[3];
var verbose = process.argv[4];
fs.readFile(filename, 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    ;
    try {
        var ast = parser.parse(data);
        // console.log('TEST SUCCEEDED ON FILE NAME ' + filename);
        var semanticVisitor = new SemanticChecker.SemanticVisitor();
        // ast.visit(semanticVisitor);
        // Print errors out from semanticVisitor
        _.map(semanticVisitor.errors, function (e) { return console.log(e); });
        if (errorFlag === 'success') {
            console.log(filename);
        }
    }
    catch (e) {
        if (errorFlag === 'error') {
            console.log(filename);
        }
        if (verbose) {
            console.log(e);
        }
    }
});
