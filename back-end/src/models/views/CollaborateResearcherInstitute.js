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
];

function ProjectTagCollaborateImage(data = {}) {
  model.call(
    this,
    "collaborate_researcher_institute",
    ProjectTagCollaborateImage,
    data,
    attrs
  );
}

ProjectTagCollaborateImage.prototype = Object.create(model.prototype);

ProjectTagCollaborateImage.prototype.find_by_project_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("project_id")
      .concat(" = ")
      .concat(mysql.escape(this.project_id))
  );
  return this.find_all(params);
};

module.exports = ProjectTagCollaborateImage;
