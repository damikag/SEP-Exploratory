const db = require("../../db/db");

module.exports = {
  getProfileById: (id, callBack) => {
    db.query(
      "SELECT researcher.id,first_name,last_name,researcher.contact_no,researcher.email,researcher.profile_picture,institution.name AS institution,profession,researcher.description,researcher.linkedIn,researcher.twitter FROM researcher,institution WHERE researcher.institution=institution.id AND researcher.id=?;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editProfile: (data, callBack) => {
    db.query(
      "UPDATE researcher SET first_name = ?, last_name=?, contact_no=?, profession=?, description=?, linkedIn=?, twitter=?, updated_at = ? WHERE id=?",
      [
        data.first_name,
        data.last_name,
        data.contact_no,
        data.profession,
        data.description,
        data.linkedIn,
        data.twitter,
        data.updated_at,
        data.researcher_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getProjectsByUserId: (id, callBack) => {
    db.query(
      "SELECT project.id AS project_id,project.title,project.description,researcher.id AS creator_id,researcher.first_name,researcher.last_name,project.visibility_public FROM project,researcher WHERE project.creator=researcher.id AND researcher.id=?;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
