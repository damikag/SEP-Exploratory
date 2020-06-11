const db = require("../../db/db");

module.exports = {
  getProfileById: (id, callBack) => {
    db.query(
      "SELECT researcher.id,first_name,last_name,researcher.contact_no,researcher.email,researcher.profile_picture,institution.name AS institution,institution.id AS institution_id,profession,researcher.description,researcher.linkedIn,researcher.twitter FROM researcher,institution WHERE researcher.institution=institution.id AND researcher.id=?;",
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
      "UPDATE researcher SET first_name = ?, last_name=?, contact_no=?, institution=?, profession=?, description=?, linkedIn=?, twitter=?, updated_at = ? WHERE id=?",
      [
        data.first_name,
        data.last_name,
        data.contact_no,
        data.institution,
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

  editProfilePicture: (data, callBack) => {
    db.query(
      "UPDATE researcher SET profile_picture = ? WHERE id=?",
      [
        data.url,
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
      "SELECT project.id AS project_id,project.title,project.description,project.creator AS creator_id,collaborate.researcher_id AS colloborator_id,researcher.first_name,researcher.last_name,project.visibility_public FROM project RIGHT OUTER JOIN collaborate on project.id=collaborate.project_id LEFT OUTER JOIN researcher ON researcher.id=project.creator WHERE collaborate.researcher_id=? ORDER BY project.id;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getInstitutions: (callBack) => {
    db.query(
      "SELECT id,name,address FROM institution",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getProjectPostsByUserId: (id, callBack) => {
    db.query(
      "SELECT project.id, project.title, project.description,poster_image, project.published_at, project.creator FROM project WHERE project.creator=? ORDER BY project.published_at DESC;",
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
