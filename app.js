
var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');
var myVar='';
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});

socketio.listen(server).on('connection', function (socket) {
	
	//recieve client data
    socket.on('client_data', function(data){
       // process.stdout.write(data.letter);
		myVar=data.letter;
		myVar=myVar.toString('utf8');
    });
	
	
	
   //send data to client
    setInterval(function(){
        socket.emit('message', {'message':"Hello "+myVar});
    }, 1000);

    
});