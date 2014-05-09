var express = require('express'); //inclusion du framework express
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server); // création d'un objet app avec express + serveur + socket.io

server.listen(8333);
io.set('log level', 1)

app.use(express.static(__dirname + '/public'));


var req = app.get('/', function (req, res) { // c'est ici qu'on indique les différentes routes (URLs)
  //res.sendfile(__dirname + '/public/index.html');
});

req.on('error', function(e){
  console.log(e);
})

req.on('socket', function(socket){
  socket.emit('agent remove');
})

// var allcClients = 0;
// var clientID = 1;

// clientID += 1;

io.sockets.on('connection', function (socket, pseudo) {

     // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        socket.set('pseudo', pseudo);
        socket.broadcast.emit('nouveau_client', pseudo);
        console.log("Coucou c'est "+ pseudo);
    });

 // var my_client = {
 //  "id" : clientID,
 //  "obj" : socket
 // }

//  io.sockets.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

//   socket.emit('news', { hello: 'world' });

//   socket.on('victor', function (datavictor) {
//     console.log('recu victor:');
//     console.log(datavictor);
//     console.log('emis victor');
    
//     io.sockets.emit('victor',datavictor);

//   });

//   socket.on('message', function (data) {
//     console.log('recu message:');
//     console.log(data);
//     console.log('emis message');
    
//     io.sockets.emit('message',data);

//   });

});