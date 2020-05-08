const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "chat_id",
  "message",
  "message_time",
  "sender_id",
  "created_at",
  "updated_at",
  "deleted_at",
];

function Message(data = {}) {
  model.call(this, "message", Message, data, attrs);
}

Message.prototype = Object.create(model.prototype);

Message.prototype.find_by_chat_id = function (chat_id) {
  var params = [];
  params.push(mysql.escapeId("chat_id").concat(" = ").concat(mysql.escape(chat_id)));
  return this.find_first(params);
};

Message.prototype.find_by_id = function (chat_id) {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(chat_id)));
  return this.find_first(params);
};

module.exports = Message;
