const model = require("../../model");
const mysql = require("mysql");
const db = require("../../../db/db")

const attrs = [
  "id",
  "name",
  "description",
  "logo",
  "isDirrect",
  "creator_id",
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

Chat.prototype.update = function update(params) {

  const _params = {
    conditions: [mysql.format('id = ?',[params.id])]
  };
  const table = this.table;
  const attrs = this.attrs;
  var obj = {};
  for (const attr of attrs) {
    if(attr=='id')continue
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

module.exports = Chat;
