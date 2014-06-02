var express = require('express'); //inclusion du framework express
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server); // création d'un objet app avec express + serveur + socket.io

server.listen(1337);
io.set('log level', 1)

app.use(express.static(__dirname + '/public'));

var req = app.get('/', function (req, res) { // c'est ici qu'on indique les différentes routes (URLs)
  //res.sendfile(__dirname + '/public/index.html');
});

var users = [];
var clients =[];
var socketCount = 0

io.sockets.on('connection', function (socket) {

    // Socket has connected, increase socket count
    socketCount++
    // Let all sockets know how many are connected
    io.sockets.emit('users connected', socketCount);
    clients.push(socket);

    socket.on('nouveau_client', function (user) { 
        socket.user = user;
        users.push(user);
        updateClients();

    });

    socket.on('message', function (data) {
            socket.broadcast.emit('notes', data);
        socket.on('id', function(id){
            socket.broadcast.emit('id', id);
         })        
    });

    socket.on('user image', function (msg) {
      socket.broadcast.emit('user image', socket.user, msg);
    });

    socket.on('disconnect', function (user) {
        for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                users.splice(i, 1);
            }
        }
        updateClients();

        // Decrease the socket count on a disconnect, emit
        socketCount--
        io.sockets.emit('users connected', socketCount);

        for(var i=0; i<clients.length; i++) {
            if(clients[i] == socket) {
                clients.splice(i, 1);
                console.log("client disconnect");
            }
        }

    });

    function updateClients() {
        io.sockets.emit('update', users);
    }

});
