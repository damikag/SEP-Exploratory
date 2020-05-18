const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app").app;
// const onConnection = require("./websocket/socket-io-server");

// const http = require("http").createServer(app);
// const io = require("socket.io")(http);

// when web socket connection is on...
// io.on("connection", onConnection);

app.listen(process.env.PORT, () => {
  console.log("server running on port 8888");
});