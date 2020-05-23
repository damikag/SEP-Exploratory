const homeRoute = require("./api/routes/home/routes");
const researcherRoute = require("./api/routes/researcher/routes");
const projectRoute = require("./api/routes/project/routes");
const editorRoute = require("./api/routes/editor/routes");
const driveRoute = require("./api/routes/drive/routes");
const screeShareRoute = require("./api/routes/screenShare/routes");
const commentRoute = require("./api/routes/comment/routes");
const emailRoute = require("./api/routes/email/routes");
var express = require("express");
const config = require("./mongo/connect");
var app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "exp-auth-token");
  next();
});

app.use(express.json());

app.use("/", homeRoute);
app.use("/researcher", researcherRoute);
app.use("/project", projectRoute);
app.use("/project/comments", commentRoute);
app.use("/editor", editorRoute);
app.use("/drive", driveRoute);
app.use("/screenshare", screeShareRoute);
app.use("/email", emailRoute);

module.exports = { app };
