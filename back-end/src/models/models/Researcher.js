const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "email",
  "password",
  "contact_no",
  "first_name",
  "last_name",
  "profile_picture",
  "institution",
  "bio",
  "last_login",
  "created_at",
  "updated_at",
  // "deleted_at",
  "token",
];

function Researcher(data = {}) {
  model.call(this, "researcher", Researcher, data, attrs);

  // this.table = 'document';
  // this.constructor = document;
}

Researcher.prototype = Object.create(model.prototype);

Researcher.prototype.find_by_email = function (email) {
  var params = [];
  params.push(
    mysql.escapeId("email").concat(" = ").concat(mysql.escape(email))
  );
  // console.log(params);
  return this.find_first(params);
};

Researcher.prototype.find_by_id = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  return this.find_first(params);
};

Researcher.prototype.find_by_email_or_id = function (email, id) {
  var params = [];
  var param = mysql.escapeId("email").concat(" = ").concat(mysql.escape(email));
  param = param.concat(" OR ", mysql.escapeId("id"), " = ", mysql.escape(id));
  params.push(param);
  return this.find_first(params);
};

Researcher.prototype._update = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  return this.update(params);
};

Researcher.prototype.find_by_name = function (search_string) {
  var params = [];
  console.log(search_string);
  var param = mysql
    .escapeId("first_name")
    .concat(" LIKE ")
    .concat(mysql.escape(search_string.concat("%")));
  params.push(param);
  return this.find_all(params);
};

module.exports = Researcher;
