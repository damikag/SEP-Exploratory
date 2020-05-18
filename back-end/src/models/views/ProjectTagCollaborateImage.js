const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "project_id",
  "project_title",
  "description",
  "visibility_public",
  "published_at",
  "poster_image",
  "final_paper",
  "tag_id",
  "tag_title",
  "researcher_id",
  "isAdmin",
  "researcher_email",
  "first_name",
  "last_name",
  "profile_picture",
  "institution",
  "institution_name",
  "image_id",
  "image_url",
  "project_created_at",
  "project_updated_at",
  "project_deleted_at",
];

function ProjectTagCollaboratorImage(data = {}) {
  model.call(
    this,
    "project_tag_collaborate_image",
    ProjectTagCollaboratorImage,
    data,
    attrs
  );
}

ProjectTagCollaboratorImage.prototype = Object.create(model.prototype);

ProjectTagCollaboratorImage.prototype.find_by_id = function () {
  var params = [];
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(this.id))
  );
  return this.find_first(params);
};

module.exports = ProjectTagCollaboratorImage;
