const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "project_id",
  "url",
  "caption",
  "created_at",
  "updated_at",
  "deleted_at",
];

function Image(data = {}) {
  model.call(this, "image", Image, data, attrs);
}

Image.prototype = Object.create(model.prototype);

Image.prototype.find_by_project_id = function () {
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

Image.prototype.delete_image = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("project_id")
      .concat(" = ")
      .concat(mysql.escape(this.project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  return this.update(params);
};

Image.prototype.soft_delete_images = function (project_id) {
  var params = [];
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  return this.update(params);
};

module.exports = Image;
