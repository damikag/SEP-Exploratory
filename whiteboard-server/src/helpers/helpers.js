var rooms = require("../models/room");
var pending = require("../models/pending");

module.exports.userDisconnected = function (room, removed_socket, socket) {
  var user = rooms[room].users[removed_socket];
  // remove socket
  delete rooms[room].users[removed_socket];

  // remove user if no socket left
  if (socketLeft(room, user.id) == 0) {
    //remove user
    delete rooms[room].online[user.id];
    // remove token
    delete pending[user.id];
    // update online list
    socket.to(room).broadcast.emit("user-disconnected", user);
  }
};

module.exports.getUserRooms = function (socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
};

module.exports.newUserToRoom = function (room, userData, socket) {
  socket.join(room);
  if (rooms[room].online[userData.id] == null) {
    rooms[room].online[userData.id] = userData;
    socket.to(room).broadcast.emit("user-connected", userData);
  }
  rooms[room].users[socket.id] = userData;
  return rooms[room].online;
};

module.exports.joinRoomHelper = function (body) {
  if (rooms[body.room] == null) {
    rooms[body.room] = { users: {}, online: {} };
  }
  pending[body.user_id] = {
    token: body.token,
    id: body.user_id,
    name: body.name,
    email: body.email,
  };
};

function socketLeft(room, user_id) {
  count = 0;
  var users = rooms[room].users;
  Object.keys(users).map((key) => {
    if (users[key].id == user_id) {
      count = count + 1;
    }
  });
  return count;
}
