var express = require('express');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', (client) => {

    client.on('toText', (text) => {
        console.log(text)
        client.broadcast.emit('subscribeToText', text);
    });

});

http.listen(8000, function () {
    console.log('listening on *:8000');
});
/*
io.on('connection', function(socket) {
    //Globals
    var defaultRoom = 'general';
    var rooms = ["General", "angular", "socket.io", "express", "node", "mongo", "PHP", "laravel"];
  
    //Emit the rooms array
    socket.emit('setup', {
      rooms: rooms
    });
  
    //Listens for new user
    socket.on('new user', function(data) {
      data.room = defaultRoom;
      //New user joins the default room
      socket.join(defaultRoom);
      //Tell all those in the room that a new user joined
      io.in(defaultRoom).emit('user joined', data);
    });
  
    //Listens for switch room
    socket.on('switch room', function(data) {
      //Handles joining and leaving rooms
      //console.log(data);
      socket.leave(data.oldRoom);
      socket.join(data.newRoom);
      io.in(data.oldRoom).emit('user left', data);
      io.in(data.newRoom).emit('user joined', data);
  
    });
  
    //Listens for a new chat message
    socket.on('new message', function(data) {
      //Create message
      var newMsg = new Chat({
        username: data.username,
        content: data.message,
        room: data.room.toLowerCase(),
        created: new Date()
      });
      //Save it to database
      newMsg.save(function(err, msg){
        //Send message to those connected in the room
        io.in(msg.room).emit('message created', msg);
      });
    });
  });
  */