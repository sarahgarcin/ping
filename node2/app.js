var express = require('express'); //inclusion du framework express
var mysql = require('mysql'); // inclusion de msql
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server); // création d'un objet app avec express + serveur + socket.io

server.listen(1337);
io.set('log level', 1)

app.use(express.static(__dirname + '/public'));

// définition de la base de données 
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node'
})

// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err)
})


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
        // socket.set('user', user);
        socket.user = user;
        users.push(user);
        updateClients();

    });

    socket.on('notes', function (data) { 
        socket.on('id', function (id){
            // console.log(id);
            if(id == users[2]){
               socket.broadcast.emit('notes2', data);
            }

            // else if(id == users[0] || id == users[1]) {
            //     socket.broadcast.emit('notes', data);
            //     io.sockets.socket(users[2]).emit('notes2', data);
            //     io.sockets.socket(users[3]).emit('notes2', data);
            // }

            else if(id == users[0]) {
                socket.broadcast.emit('notes', data);
            }

            else if(id == users[1]) {
                // io.sockets.socket(users[0]).emit('notes', data);
                // io.sockets.socket(users[2]).emit('notes2', data);
                // io.sockets.socket(users[3]).emit('notes2', data);
                // io.sockets.socket(clients[0]).emit('notes', data);
                // io.sockets.socket(clients[2]).emit('notes2', data);
                clients[0].emit('notes', data);
                clients[2].emit('notes2', data);
                // io.sockets.socket(users[0]).emit("notes", data);
                // io.sockets.socket(users[2]).emit('notes2', data);
                // socket.broadcast.emit('notes', data);
            }
                 
        })


        // socket.broadcast.emit('notes', data);
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

        delete clients[clients.indexOf(socket)];
    });

    function updateClients() {
        io.sockets.emit('update', users);
    }

});
