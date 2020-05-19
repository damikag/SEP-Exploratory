const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "researcher_id",
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

function ResearcherInstitute(data = {}) {
  model.call(this, "researcher_institute", ResearcherInstitute, data, attrs);
}

ResearcherInstitute.prototype = Object.create(model.prototype);

ResearcherInstitute.prototype.find_by_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("researcher_id")
      .concat(" = ")
      .concat(mysql.escape(this.researcher_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.find_all(params);
};

ResearcherInstitute.prototype.get_all_researchers = function () {
  var params = [];
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.find_all(params);
};

module.exports = ResearcherInstitute;
