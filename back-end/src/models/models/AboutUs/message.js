const db = require("../../../db/db");

module.exports = {
  addMessage: (data, callBack) => {
    db.query(
      "insert into user_message(name, email, message) values (?,?,?)",
      [data.name, data.email, data.message],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
