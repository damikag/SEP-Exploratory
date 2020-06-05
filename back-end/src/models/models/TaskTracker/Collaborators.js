const db = require("../../../db/db");

module.exports = {
  getCollaboratorsByProjectId: (id, callBack) => {
    db.query(
      "SELECT researcher.id,researcher.first_name,researcher.last_name FROM researcher,project,collaborate WHERE project.id=collaborate.project_id AND collaborate.researcher_id=researcher.id AND project_id=? ORDER BY researcher.id;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}