var express = require('express'); //inclusion du framework express
var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server); // création d'un objet app avec express + serveur + socket.io

server.listen(3000);
io.set('log level', 1)

app.use(express.static(__dirname + '/public'));


var req = app.get('/', function (req, res) { // c'est ici qu'on indique les différentes routes (URLs)
  //res.sendfile(__dirname + '/public/index.html');
});


 
io.sockets.on('connection', function(socket){
   
    socket.on('add-user', function(data){
        clients[data.username] = {
          "socket": socket.id
        };
    });


  socket.on('private-message', function(data){
    console.log("Sending: " + data.content + " to " + data.username);
    if (clients[data.username]){
      io.sockets.socket(clients[data.username].socket).emit("add-message", data);
    } else {
      console.log("User does not exist: " + data.username); 
    }
  });

  //Removing the socket on disconnect
  socket.on('disconnect', function() {
    for(var name in clients) {
        if(clients[name].socket === socket.id) {
            delete clients[name];
            break;
        }
    }   
  })

})


