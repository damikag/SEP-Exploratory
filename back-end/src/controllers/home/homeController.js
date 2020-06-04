const { search_validation } = require("./validation");
var Search = require("../../models/models/Search");

module.exports.indexAction = (req, res) => {
  return res.status(200).json({ message: "Welcome home" });
};

module.exports.SearchAction = (req, res) => {
  const { error } = search_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  var search = new Search(req.body.searchString);

  if (req.body.type == "projects") {

    search.getProjects(req.body.index)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

  }
  else if (req.body.type == "researchers") {

    search.getResearchers(req.body.index)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });

  }
  else {
    search.getInstitutions(req.body.index)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res.status(500).json({ error: err.message });
      });
  }


};
