const model = require("../model");
const mysql = require("mysql");

const attrs = ["tag_id", "project_id", "title"];

function TagProjectTag(data = {}) {
  model.call(this, "tag_project_tag", TagProjectTag, data, attrs);
}

TagProjectTag.prototype = Object.create(model.prototype);

TagProjectTag.prototype.find_by_project_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("project_id")
      .concat(" = ")
      .concat(mysql.escape(this.project_id))
  );

  return this.find_all(params);
};

module.exports = TagProjectTag;
