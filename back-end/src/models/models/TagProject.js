const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "project_id",
  "tag_id",
  "created_at",
  "updated_at",
  "deleted_at",
];

function TagProject(data = {}) {
  model.call(this, "tag_project", TagProject, data, attrs);
}

TagProject.prototype = Object.create(model.prototype);

TagProject.prototype.find_by_id = function (project_id) {
  var params = [];
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.find_all(params);
};

TagProject.prototype.delete_tags = function (project_id) {
  var params = [];
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  return this.delete(params);
};

TagProject.prototype.soft_delete_tags = function (project_id) {
  var params = [];
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS NULL "));
  return this.update(params);
};

module.exports = TagProject;
