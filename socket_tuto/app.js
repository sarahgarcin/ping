var express = require('express'); //inclusion du framework express
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server), // création d'un objet app avec express + serveur + socket.io
    fs = require('fs');

server.listen(1337);

// Chargement de la page index.html
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

// app.use(express.static(__dirname + '/public'));

// var req = app.get('/', function (req, res) { // c'est ici qu'on indique les différentes routes (URLs)
//   //res.sendfile(__dirname + '/public/index.html');
// });


io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        socket.set('pseudo', pseudo);
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        socket.get('pseudo', function (error, pseudo) {
            socket.broadcast.emit('message', {pseudo: pseudo, message: message});
        });
    }); 
});


   
