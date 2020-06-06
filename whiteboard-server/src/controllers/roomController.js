var rooms = require("../models/room");
var pending = require("../models/pending");
var { joinRoomHelper } = require("../helpers/helpers");

module.exports.indexAction = (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect(`${process.env.ROOT}`);
  }
  if (pending[req.params.user_id].token == req.params.token) {
    return res.render("index", {
      roomName: req.params.room,
      userData: pending[req.params.user_id],
    });
  }
  res.status(302).redirect(`${process.env.URL}/${req.params.room}`);
};

module.exports.leaveRoomAction = (req, res) => {
  res.status(302).redirect(`${process.env.ROOT}`);
};

module.exports.joinRoomAction = (req, res) => {
  var body = JSON.parse(Object.keys(req.body)[0]);
  joinRoomHelper(body);
  res.status(200).send(true);
};

module.exports.unwantedLinkRedirectAction = (req, res) => {
  res.status(302).redirect(`${process.env.ROOT}`);
};
