var Researcher = require("../../models/models/Researcher");
var Feed = require("../../models/models/Feed");

module.exports.indexAction = (req, res) => {
  return res.status(200).json({ message: "Welcome home researcher" });
};

module.exports.searchRelatedResearchersAction = (req, res) => {
  var researcher = new Researcher();

  researcher
    .find_by_name(req.body.search_string)
    .then((result) => res.status(200).json({ result: result }))
    .catch((err) => res.status(500).json({ error: err.message }))
    .catch((error) => res.status(500).send("server error"));
};

module.exports.feedAction = (req, res) => {
  var feed = new Feed();
  feed
    .feed()
    .then((feedArr) => {
      return res.status(200).json(feedArr);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
