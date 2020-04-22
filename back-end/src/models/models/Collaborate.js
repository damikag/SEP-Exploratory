const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "project_id",
  "researcher_id",
  "isAdmin",
  "created_at",
  "updated_at",
  "deleted_at",
];

function Collaborate(data = {}) {
  model.call(this, "collaborate", Collaborate, data, attrs);
}

Collaborate.prototype = Object.create(model.prototype);

Collaborate.prototype.find_by_id = function (researcher_id, project_id) {
  var params = [];
  params.push(
    mysql
      .escapeId("researcher_id")
      .concat(" = ")
      .concat(mysql.escape(researcher_id))
  );
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  return this.find_first(params);
};

module.exports = Collaborate;
