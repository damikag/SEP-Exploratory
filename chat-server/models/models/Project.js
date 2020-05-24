const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "title",
  "description",
  "creator",
  "visibility_public",
  
  "created_at",
  "updated_at",
  "deleted_at",
  "published_at",
];

function Project(data = {}) {
  model.call(this, "project", Project, data, attrs);
}

Project.prototype = Object.create(model.prototype);

Project.prototype.find_by_id = function (id) {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(id)));
  return this.find_first(params);
};

module.exports = Project;