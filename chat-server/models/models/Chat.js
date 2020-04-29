const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "name",
  "description",
  "logo",
  "created_at",
  "updated_at",
  "deleted_at",
];

function Chat(data = {}) {
  model.call(this, "chat", Chat, data, attrs);
}

Chat.prototype = Object.create(model.prototype);

Chat.prototype.find_by_id = function (id) {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(id)));
  return this.find_first(params);
};

module.exports = Chat;
