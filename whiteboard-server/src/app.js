const express = require("express");
const app = express();

const homeRoute = require("./api/route");
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

app.use("/", homeRoute);

module.exports = { app };
