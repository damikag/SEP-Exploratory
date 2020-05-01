const model = require("../model");
const mysql = require("mysql");

const attrs = ["id", "project_id", "created_at", "updated_at", "deleted_at"];

function ProjectComment(data = {}) {
  model.call(this, "project_comment", ProjectComment, data, attrs);
}

ProjectComment.prototype = Object.create(model.prototype);

ProjectComment.prototype.find_by_project_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("project_id")
      .concat(" = ")
      .concat(mysql.escape(this.project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" = ").concat(" null "));

  return this.find_first(params);
};

ProjectComment.prototype.find_by_comment_id = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  params.push(mysql.escapeId("deleted_at").concat(" = ").concat(" null "));

  return this.find_first(params);
};

ProjectComment.prototype._delete = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));

  return this.update(params);
};

module.exports = ProjectComment;
