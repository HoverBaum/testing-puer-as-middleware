var express = require("express")
var path = require("path")
var http = require("http")
var puer = require("puer")

//Export a function to start a server so this can be used and tested as a module.
module.exports = function startServer(){

    //Create a server.
    var app = express();
    var server = http.createServer(app);

    //Configure options for puer (as in demo on github repo).
    var options = {
        dir: "D:\\connect-test",
        ignored: /node_modules/
    };

    //NOTE without this it works.
    //Use puer-connect middleware
    app.use(puer.connect(app, server , options));

    //Serve static files.
    app.use("/", express.static(__dirname));

    //Start the server.
    server.listen(8001, function(){
        console.log("listen on 8001 port");
    });

    //Function to close the server, should shut down everything.
    function stopServer(call) {
        console.log('closing http server');
        server.close(function() {
            console.log('htttp server closed');
            call();
        });
    }

    //Return an object with a function to close the server down.
    return {
        close: stopServer
    }

}
