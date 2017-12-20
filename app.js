var express = require('express');
var app = express(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 


app.use(express.static('public'));


app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});