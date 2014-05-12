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

var users = [];

io.sockets.on('connection', function (socket, user) {


    socket.on('nouveau_client', function (user) { 
        // socket.set('user', user);
        socket.user = user;
        users.push(user);
        updateClients();
    });

    // socket.on('textarea', function (data){
    //     socket.broadcast.emit('textarea', data);

    // });

    socket.on('message', function (data) {        
        socket.broadcast.emit('message',data);

      });

    socket.on('disconnect', function (user) {
        for(var i=0; i<users.length; i++) {
            if(users[i] == socket.user) {
                users.splice(i, 1);
            }
        }
        updateClients(); 
    });

    function updateClients() {
        io.sockets.emit('update', users);
    }

});
