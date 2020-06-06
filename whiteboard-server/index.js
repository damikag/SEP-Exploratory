const express = require("express");
const { app } = require("./src/app");
const http = require("http").Server(app);
const io = require("socket.io")(http);

const {
  onNewUser,
  onDrawing,
  onRectangle,
  onLineDraw,
  onCircleDraw,
  onEllipseDraw,
  onTextDraw,
  onCopyCanvas,
  onClearBoard,
  onDisconnect,
} = require("./src/helpers/socketHelpers");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 4000;

/////////////////////////////////////////////////// middleware///////////////////////////////////////////////////

/////////////////////////////////////////////////// socket.io functions ///////////////////////////////////////////////////
function onConnection(socket) {
  socket.on("new-user", (room, userData) =>
    onNewUser(room, userData, socket, io)
  );

  socket.on("drawing", (room, data) => onDrawing(room, data, io));

  socket.on("rectangle", (room, data) => onRectangle(room, data, io));

  socket.on("linedraw", (room, data) => onLineDraw(room, data, io));

  socket.on("circledraw", (room, data) => onCircleDraw(room, data, io));

  socket.on("ellipsedraw", (room, data) => onEllipseDraw(room, data, io));

  socket.on("textdraw", (room, data) => onTextDraw(room, data, io));

  socket.on("copyCanvas", (room, data) => onCopyCanvas(room, data, io));

  socket.on("Clearboard", (room, data) => onClearBoard(room, data, io));

  socket.on("disconnect", () => onDisconnect(socket));
}

/////////////////////////////////////////////////// socket.io starter ///////////////////////////////////////////////////
io.on("connection", onConnection);

/////////////////////////////////////////////////// server starter ///////////////////////////////////////////////////
http.listen(port, () => console.log("listening on port " + port));
