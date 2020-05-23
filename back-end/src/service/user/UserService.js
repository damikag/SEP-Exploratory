var db_service = require("../../db/db_service");
const mysql = require("mysql");

class UserService {
  static register_new_user(temporaryUser, researcher) {
    return new Promise((resolve, reject) => {
      var params = [];
      params.push(
        mysql
          .escapeId("email")
          .concat(" = ")
          .concat(mysql.escape(researcher.email))
      );
      params.push(
        mysql.escapeId("confirmed_at").concat(" IS ").concat(" NULL ")
      );

      const _params = {
        conditions: params,
      };

      db_service
        .transaction_insert_update([temporaryUser], [researcher], _params)
        .then((result) => {
          resolve({ insertId: result });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
module.exports = UserService;
