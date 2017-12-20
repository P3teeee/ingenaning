var socket = io();

socket.on('userMsg', function (msg) {
    console.log(msg);
});

var input = document.getElementById("msg");

input.addEventListener("keydown", function (event) {
	if(event.key === "Enter") {
		//console.log(input.value);
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


ctx.fillStyle = "rgb(0,255,0)";
ctx.font = "20px Arial";
ctx.fillText("Welcome to ingenting", 20, 20);

function drawPlayer(x, y)  {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgb(255,0,0)";
	ctx.fillRect(x, y, 10, 10);
}

var x = 200;
var y = 200;

canvas.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "w":
			y -= 10;
			socket.emit("pMove", {x: x, y: y});
			
		break;
		case "s":
			y += 10;
			socket.emit("pMove", {x: x, y: y});
			
		break;
		case "a":
			x -= 10;
			socket.emit("pMove", {x: x, y: y});
			
		break;
		case "d":
			x += 10;
			socket.emit("pMove", {x: x, y: y});
			
		break;
		default:
		break;
	}
});

socket.on('pMove', function (move) {
    drawPlayer(move.x, move.y)
});