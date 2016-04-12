/**
    Testing puer-connect middleware and programatically shutting down the http server.
*/

var start = require('./server');

//Start the server and remember it.
var server = start();

//Wait 5 seconds.
setTimeout(function() {

    //Close the server down.
    console.log('5 seconds later');
    server.close(function() {
        console.log('should be closed now');

        //NOTE active handles, one of these keep the process alive.
        //console.log(process._getActiveHandles());
    })
}, 5000)
