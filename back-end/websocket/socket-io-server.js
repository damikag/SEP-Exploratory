// function onConnection(socket) {
//   console.log("You are connected to the socket...");
//   socket.on("drawing", function (data) {
//     socket.broadcast.emit("drawing", data);
//     console.log(data);
//   });

//   socket.on("rectangle", function (data) {
//     socket.broadcast.emit("rectangle", data);
//     console.log(data);
//   });

//   socket.on("linedraw", function (data) {
//     socket.broadcast.emit("linedraw", data);
//     console.log(data);
//   });

//   socket.on("circledraw", function (data) {
//     socket.broadcast.emit("circledraw", data);
//     console.log(data);
//   });

//   socket.on("ellipsedraw", function (data) {
//     socket.broadcast.emit("ellipsedraw", data);
//     console.log(data);
//   });

//   socket.on("textdraw", function (data) {
//     socket.broadcast.emit("textdraw", data);
//     console.log(data);
//   });

//   socket.on("copyCanvas", function (data) {
//     socket.broadcast.emit("copyCanvas", data);
//     console.log(data);
//   });

//   socket.on("Clearboard", function (data) {
//     socket.broadcast.emit("Clearboard", data);
//     console.log(data);
//   });
// }

// module.exports = onConnection;

let interval;

function onConnection(socket) {
  console.log("New client connected...");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
}

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = onConnection;
