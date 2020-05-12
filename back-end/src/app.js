var express = require("express");

const homeRoute = require("./api/routes/home/routes");
const researcherRoute = require("./api/routes/researcher/routes");
const projectRoute = require("./api/routes/project/routes");
const editorRoute = require("./api/routes/editor/routes");
const forumRoute = require("./api/routes/Forum/routes");

const config = require("./mongo/connect");

var cors = require("cors");

var app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "exp-auth-token");
  next();
});

app.use(express.json());

app.use("/", homeRoute);
app.use("/researcher", researcherRoute);
app.use("/project", projectRoute);
app.use("/editor", editorRoute);
app.use("/forum", forumRoute);

module.exports = app;
