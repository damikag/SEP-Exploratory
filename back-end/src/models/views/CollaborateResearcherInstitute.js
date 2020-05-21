const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "researcher_id",
  "project_id",
  "isAdmin",
  "researcher_email",
  "first_name",
  "last_name",
  "profile_picture",
  "institution",
  "institution_name",
  "address",
  "deleted_at",
  "created_at",
  "updated_at",
];

function CollaborateResearcherInstitute(data = {}) {
  model.call(
    this,
    "collaborate_researcher_institute",
    CollaborateResearcherInstitute,
    data,
    attrs
  );
}

CollaborateResearcherInstitute.prototype = Object.create(model.prototype);

CollaborateResearcherInstitute.prototype.find_by_project_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("project_id")
      .concat(" = ")
      .concat(mysql.escape(this.project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.find_all(params);
};

module.exports = CollaborateResearcherInstitute;
