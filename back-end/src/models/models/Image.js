const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "project_id",
  "image_id",
  "url",
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
  return this.find_all(params);
};

module.exports = Image;
