const model = require("../model");
const mysql = require("mysql");
const attrs = [
  "id",
  "title",
  "description",
  "abstract",
  "creator",
  "visibility_public",
  "poster_image",
  "final_paper",
  "created_at",
  "updated_at",
  "deleted_at",
  "published_at",
];

function Project(data = {}) {
  model.call(this, "project", Project, data, attrs);
}

Project.prototype = Object.create(model.prototype);

Project.prototype.find_by_id = function (project_id) {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(project_id)));
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  return this.find_first(params);
};

Project.prototype.update_project = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.update(params);
};

module.exports = Project;
