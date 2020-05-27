const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3001;
const dotenv = require("dotenv");
dotenv.config();

/////////////////////////////////////////////////// middleware///////////////////////////////////////////////////
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.ROOT); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/////////////////////////////////////////////////// data structures ///////////////////////////////////////////////////
const rooms = {};
var pending = {};
var onlienUsers = {};

/////////////////////////////////////////////////// routing ///////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.redirect(`${process.env.ROOT}`);
});

app.get("/:room&:token&:user_id", (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect(`${process.env.ROOT}`);
  }
  if (pending[req.params.user_id].token == req.params.token) {
    return res.render("index", {
      roomName: req.params.room,
      userData: pending[req.params.user_id],
    });
  }
  res.redirect(`${process.env.URL}/${req.params.room}`);
});

app.post("/leave", (req, res) => {
  res.redirect(`${process.env.ROOT}`);
});

app.post("/join", (req, res) => {
  var body = JSON.parse(Object.keys(req.body)[0]);

  if (rooms[body.room] == null) {
    rooms[body.room] = { users: {}, online: {} };
  }
  pending[body.user_id] = {
    token: body.token,
    id: body.user_id,
    name: body.name,
    email: body.email,
  };
  res.send(true);
});

/////////////////////////////////////////////////// socket.io functions ///////////////////////////////////////////////////
function onConnection(socket) {
  socket.on("new-user", (room, userData) => {
    socket.join(room);
    if (rooms[room].online[userData.id] == null) {
      rooms[room].online[userData.id] = userData;
      socket.to(room).broadcast.emit("user-connected", userData);
    }
    rooms[room].users[socket.id] = userData;
    io.to(socket.id).emit("on-connected", rooms[room].online);
  });

  socket.on("drawing", function (room, data) {
    io.to(room).emit("drawing", data);
    console.log(data);
  });

  socket.on("rectangle", function (room, data) {
    io.to(room).emit("rectangle", data);
    console.log(data);
  });

  socket.on("linedraw", function (room, data) {
    io.to(room).emit("linedraw", data);
    console.log(data);
  });

  socket.on("circledraw", function (room, data) {
    io.to(room).emit("circledraw", data);
    console.log(data);
  });

  socket.on("ellipsedraw", function (room, data) {
    io.to(room).emit("ellipsedraw", data);
    console.log(data);
  });

  socket.on("textdraw", function (room, data) {
    io.to(room).emit("textdraw", data);
    console.log(data);
  });

  socket.on("copyCanvas", function (room, data) {
    io.to(room).emit("copyCanvas", data);
    console.log(data);
  });

  socket.on("Clearboard", function (room, data) {
    io.to(room).emit("Clearboard", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    // get room of particular socket
    var room = getUserRooms(socket)[0];
    // remove socket and remove user if neccessary
    userDisconnected(room, socket.id, socket);
  });
}

/////////////////////////////////////////////////// helpers ///////////////////////////////////////////////////
function userDisconnected(room, removed_socket, socket) {
  console.log("room", room);
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
}

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

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

/////////////////////////////////////////////////// socket.io starter ///////////////////////////////////////////////////
io.on("connection", onConnection);

/////////////////////////////////////////////////// server starter ///////////////////////////////////////////////////
http.listen(port, () => console.log("listening on port " + port));
