const model = require("../model");
const mysql = require("mysql");

const attrs = ["id", "title", "created_at", "updated_at", "deleted_at"];

function TagProject(data = {}) {
  model.call(this, "tag", TagProject, data, attrs);
}

TagProject.prototype = Object.create(model.prototype);

TagProject.prototype.find_all_tags = function () {
  var params = [];
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));
  return this.find_all(params);
};

module.exports = TagProject;
