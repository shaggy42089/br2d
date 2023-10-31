const WebSocketServer = require('websocket').server;
const http = require('http');
const { constTab, isJson, hasProps } = require('./consts');

let server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(9696, function() {
    console.log((new Date()) + ' Server is listening on port 9696');
});

let wServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
})

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

let connections = []

wServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        if (!message.type === 'utf8') {
            connection.send('wrong encoding : not utf8');
            return;
        }

        console.log(message.utf8Data);
        if (!isJson(message.utf8Data)) {
            connection.send('command is not valid json')
            return;
        }

        let obj = JSON.parse(message.utf8Data);

        if (!obj.hasOwnProperty('type')) {
            connection.send('missing type property')
            return;
        }

        switch (obj.type) {
            case 'init':
                if (! (obj && obj.data && obj.data.name && typeof obj.data.name === 'string')) {
                    connection.send('missing or invalid \'data.name\' property');
                    return;
                }

                connection.data = {}
                connection.data.name = obj.data.name;
                connection.send('initialization successful, welcome, '+obj.data.name);
                break;
            case 'command':
                if (!obj.data || typeof obj.data !== 'object' || !(hasProps(['name', 'args'], obj.data))) {
                    connection.send('missing or invalid \'data\' field');
                    return;
                }

                switch (obj.data.name) {
                    case 'move':
                        if (! Array.isArray(obj.data.args)) {
                            connection.send('invalid command args : expected 2 numbers');
                            return;
                        }

                        let direction = obj.data.args;
                        if (direction.length !== 2 || (! [-1, 0, 1].includes(direction[0])) || (! [-1, 0, 1].includes(direction[1]))) {
                            connection.send('invalid direction, must be array of 2 elements within -1,0,1')
                            return;
                        }

                        console.log('player ' + connection.data.name + ' is going ' + obj.data.args)
                        break;
                }


                break;
            default:
        }

    });




    connection.on('close', function(reasonCode, description) {
        console.log('user disconnected');
    });
});