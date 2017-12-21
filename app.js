var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 


app.use(express.static('public'));


app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

var players_srv = [];

io.on('connection', function (socket) {
    console.log("a user connected" + socket.request.connection.remoteAddress);
    io.emit('userMsg', "User connected");

    socket.on('pConnect', function (pObj, players) {
        players_srv.push(pObj);
        players = players_srv;
        io.emit('pConnect', pObj, players);
        console.log(players_srv);

    });

    socket.on('chat', function (msg) {
        io.emit('chat', msg);
    });
    socket.on('pMove', function (move) {
    	console.log(move);
        io.emit('pMove', move);
    });
  });

http.listen(3000, function () {
  console.log("listening on *:3000");
});