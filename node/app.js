
var express = require('express');
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8333);
io.set('log level', 1)

app.use(express.static(__dirname + '/public'));

var req = app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/public/index.html');
});

req.on('error', function(e){
  console.log(e);
})

req.on('socket', function(socket){
  socket.emit('agent remove');
})

var allcClients = 0;
var clientID = 1;

clientID += 1;

io.sockets.on('connection', function (socket) {

 var my_client = {
  "id" : clientID,
  "obj" : socket
 }

  socket.emit('news', { hello: 'world' });

  socket.on('message', function (data) {
    console.log('recu :');
    console.log(data);
    console.log('emis');
    
    io.sockets.emit('message',data);

  });
});