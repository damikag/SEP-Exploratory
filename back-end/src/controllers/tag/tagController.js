var Tag = require("../../models/models/Tag");

var moment = require("moment");

module.exports.indexAction = (req, res) => {
  var tag = new Tag();
  tag
    .find_all_tags()
    .then(async (response) => {
      return res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err.message));
};
