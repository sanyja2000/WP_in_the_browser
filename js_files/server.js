 
var express = require("express");

var messages = [];

var app = express();
var server = app.listen(8000);

app.use(express.static("public"));

console.log("My socket server is running.");

var socket = require("socket.io");

var io = socket(server);

io.sockets.on('connection',newConnection);


function newConnection(socket) {
	console.log("New connection: "+socket.id);
	socket.on('message', addMsg);
  io.sockets.emit('messages',messages);

	function addMsg(data) {
    console.log("Message from "+data.name);
    var local = new Date();
    messages.push({name:data.name,color:data.color,message:data.msg,time:("0"+local.getHours()).slice(-2)+":"+("0"+local.getMinutes()).slice(-2)});
		io.sockets.emit('messages',messages);
	}

}