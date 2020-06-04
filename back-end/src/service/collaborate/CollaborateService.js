var Researcher = require("../../models/models/Researcher");
var db_service = require("../../db/db_service");

class CollaborateService {
  static async find_researchers_by_id(body) {
    let researcherList = [];

    await body.map(async (id) => {
      var researcher = new Researcher(id);
      var response = await researcher
        .find_by_id()
        .then((res) => console.log("found"))
        .catch((err) => console.log(err.message));
      researcherList.push(response);
    });

    return researcherList;
  }

  static async delete_all_collaborators(body) {
    var collaborate = new Collaborate({ deleted_at: null });
    await collaborate
      .delete_by_id(researcher_id, project_id)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.message));
  }
}

module.exports = CollaborateService;
