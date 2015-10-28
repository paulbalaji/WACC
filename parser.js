var parser = require('./grammar');

var fs = require('fs')
  , filename = process.argv[2]
  , tracerFlag = false
  , errorFlag = process.argv[3]
  , verbose = process.argv[4];

var tracer = tracerFlag ? {} : {tracer: {trace: function() {}}};
fs.readFile(filename, 'utf8', function(err, data) {

        if (err) { throw err };
  
        try {

                var ast = parser.parse(data, tracer);
                // console.log('TEST SUCCEEDED ON FILE NAME ' + filename);

                if (errorFlag === 'success') {  
                  console.log(filename); 
                }


                // console.log(ast);
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