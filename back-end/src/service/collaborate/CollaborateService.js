var Researcher = require("../../models/models/Researcher");
var db_service = require("../../db/db_service");

class CollaborateService {
  static async find_researchers_by_id(body) {
    var researcherList = [];

    await body.forEach((id) => {
      var researcher = new Researcher(id);
      researcher
        .find_by_id()
        .then((result) => researcherList.push(result))
        .catch((err) => res.json({ error: err.message }));
    });
  }
}

module.exports = CollaborateService;
