const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "email",
  "password",
  "first_name",
  "last_name",
  "token",
  "created_at",
  "confirmed_at",
];

function TemporaryUser(data = {}) {
  model.call(this, "temporary_user", TemporaryUser, data, attrs);
}

TemporaryUser.prototype = Object.create(model.prototype);

TemporaryUser.prototype.find_by_email = function () {
  var params = [];
  params.push(
    mysql.escapeId("email").concat(" = ").concat(mysql.escape(this.email))
  );
  params.push(mysql.escapeId("confirmed_at").concat(" IS ").concat(" NULL "));
  return this.find_first(params);
};

TemporaryUser.prototype.find_by_id = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  params.push(
    mysql.escapeId("token").concat(" = ").concat(mysql.escape(this.token))
  );
  params.push(mysql.escapeId("confirmed_at").concat(" IS ").concat(" NULL "));
  return this.find_first(params);
};

TemporaryUser.prototype.confirm_email = function () {
  var params = [];
  params.push(
    mysql.escapeId("email").concat(" = ").concat(mysql.escape(this.email))
  );
  params.push(mysql.escapeId("confirmed_at").concat(" IS ").concat(" NULL "));
  return this.update(params);
};

TemporaryUser.prototype.delete_by_email = function () {
  var params = [];
  params.push(
    mysql.escapeId("email").concat(" = ").concat(mysql.escape(this.email))
  );
  return this.delete(params);
};

module.exports = TemporaryUser;
