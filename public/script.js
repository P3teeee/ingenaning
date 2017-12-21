var socket = io();

var player = {
	id: Math.floor(Math.random()*1000),
    color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
    x: Math.floor(Math.random() * 500),
    y: Math.floor(Math.random() * 500),
    size: 20
};

var players = [];

socket.emit('pConnect', player, players);

socket.on('pConnect', function (p, ps) {
	players.push(p);
	players = ps;
    console.log(players);
});

socket.on('userMsg', function (msg) {
    console.log(msg);
});

var input = document.getElementById("msg");

input.addEventListener("keydown", function (event) {
	if(event.key === "Enter") {
		socket.emit('chat', input.value);
		input.value = "";
	}	
});

socket.on('chat', function (msg) {
    var li = document.createElement("li");
	li.textContent = msg;
	document.getElementById("chat").appendChild(li);
});

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");




function drawPlayer(x, y, c, s)  {
	ctx.fillStyle = c;
	ctx.fillRect(x, y, s, s);
}

function updatePlayers(pUpd) {  
    
    for(var i = 0; i < players.length; i++) {
        if (players[i].id == pUpd.id) {
            players[i].x = pUpd.x;
            players[i].y = pUpd.y;
            drawPlayer(players[i].x, players[i].y, players[i].color, players[i].size);
        } else {
            drawPlayer(players[i].x, players[i].y, players[i].color, players[i].size);
        }
    }
}

canvas.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "w":
			player.y -= 10;
			socket.emit("pMove", player);
			
		break;
		case "s":
			player.y += 10;
			socket.emit("pMove", player);
			
		break;
		case "a":
			player.x -= 10;
			socket.emit("pMove", player);
			
		break;
		case "d":
			player.x += 10;
			socket.emit("pMove", player);
			
		break;
		default:
		break;
	}
});

socket.on('pMove', function (move) {
    updatePlayers(move);
});