const model = require("../model");
const mysql = require("mysql");
const db = require("../../db/db")

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

Participant.prototype.update = function update(params) {

  const _params = {
    conditions: [mysql.format('chat_id = ?',[params.chat_id]),mysql.format('user_id=?',[params.user_id])]
  };
  const table = this.table;
  const attrs = this.attrs;
  var obj = {};
  for (const attr of attrs) {
    if(attr=='chat_id'||attr=='user_id')continue
    if (!(this[attr] === undefined || this[attr] === null)) {
      obj[attr] = this[attr];
    }
  }

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve({
          changedRows: results.changedRows,
          affectedRows: results.affectedRows,
        });
      }
    };
    
    db.update(table, _params, obj, cb);
  });
};

module.exports = Participant;
