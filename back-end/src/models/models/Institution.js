const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "name",
  "description",
  "location",
  "address",
  "official_web_site",
  "email",
  "created_at",
  "updated_at",
  "deleted_at",
];


function Institution(data = {}) {
  model.call(this, "institution", Institution, data, attrs);
}

Institution.prototype = Object.create(model.prototype);

Institution.prototype.find_by_id = function (id) {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(id)));
  return this.find_first(params);
};

module.exports = Institution;
