const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "chat_id",
  "user_id",
  "isAdmin",
  "created_at",
  "updated_at",
  "deleted_at",
];

function Participant(data = {}) {
  model.call(this, "participant", Participant, data, attrs);
}

Participant.prototype = Object.create(model.prototype);

Participant.prototype.find_by_user_id_and_chat_id = function (user_id,chat_id) {
  var params = [];
  var param = mysql.escapeId("user_id").concat(" = ").concat(mysql.escape(user_id));
  param = param.concat(" AND ", mysql.escapeId("chat_id"), " = ", mysql.escape(chat_id));
  params.push(param);
  return this.find_first(params);
};

module.exports = Participant;
