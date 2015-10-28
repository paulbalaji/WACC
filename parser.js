var parser = require('./grammar');

var fs = require('fs')
  , filename = process.argv[2]
  , tracerFlag = false
  , errorFlag = process.argv[3];

var tracer = tracerFlag ? {} : {tracer: {trace: function() {}}};
fs.readFile(filename, 'utf8', function(err, data) {

        if (err) { throw err };
        
        // For ignoring all inputs where there is a function declaration
        /* if (data.indexOf(' is') !== -1) { 
             return;
        } */

        try {

                var ast = parser.parse(data, tracer);
                // console.log('TEST SUCCEEDED ON FILE NAME ' + filename);
                if (errorFlag) {  console.log(filename); }
        } catch (e) {
                if (!errorFlag) {
                    console.log(filename);
                }
                // console.log('---EXITING---');
                // process.exit();
        }

});