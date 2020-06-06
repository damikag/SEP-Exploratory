var { userDisconnected, getUserRooms, newUserToRoom } = require("./helpers");
// var rooms = require("../models/room");

module.exports.onNewUser = function (room, userData, socket, io) {
  var onlineUsers = newUserToRoom(room, userData, socket);
  io.to(socket.id).emit("on-connected", onlineUsers);
};

module.exports.onDrawing = function (room, data, io) {
  io.to(room).emit("drawing", data);
};

module.exports.onRectangle = function (room, data, io) {
  io.to(room).emit("rectangle", data);
};

module.exports.onLineDraw = function (room, data, io) {
  io.to(room).emit("linedraw", data);
};

module.exports.onCircleDraw = function (room, data, io) {
  io.to(room).emit("ellipsedraw", data);
};

module.exports.onEllipseDraw = function (room, data, io) {
  io.to(room).emit("circledraw", data);
};

module.exports.onTextDraw = function (room, data, io) {
  io.to(room).emit("textdraw", data);
};

module.exports.onCopyCanvas = function (room, data, io) {
  io.to(room).emit("copyCanvas", data);
};

module.exports.onClearBoard = function (room, data, io) {
  io.to(room).emit("Clearboard", data);
};

module.exports.onDisconnect = function (socket) {
  // get room of particular socket
  var room = getUserRooms(socket)[0];
  // remove socket and remove user if neccessary
  userDisconnected(room, socket.id, socket);
};
