const dotenv = require("dotenv");
dotenv.config();
const app = require("./src/app").app;
const express = require("express");

app.use(express.static("public"));

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log("server running on port 8888");
});
