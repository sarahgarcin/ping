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
        socket.on('id', function (id){
            if(id == users[0]){
               socket.broadcast.emit('notes', data);
               socket.broadcast.emit('id', id);
            }

            else if(id == users[1]) {
                clients[0].emit('notes', data);
                clients[0].emit('id', id);
                if(clients[2]){
                    clients[2].emit('notes2', data);
                    clients[2].emit('id2', id);
                }
                if(clients[3]){
                    clients[3].emit('notes2', data);
                    clients[3].emit('id2', id);
                }
            }

            else if(id == users[2]) {
                clients[0].emit('notes2', data);
                clients[0].emit('id2', id);
                clients[1].emit('notes2', data);
                clients[1].emit('id2', id);
                if(clients[3]){
                    clients[3].emit('notes3', data);
                    clients[3].emit('id3', id);
                }
            }

            else if(id == users[3]) {
                clients[0].emit('notes3', data);
                clients[0].emit('id3', id);
                clients[1].emit('notes3', data);
                clients[1].emit('id3', id);
                if(clients[2]){
                    clients[2].emit('notes3', data);
                    clients[2].emit('id3', id);
                }
            }
                 
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
