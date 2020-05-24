var mysql = require("mysql");
var db = require("./db");
var sql = "";

module.exports.transaction_insert = function transaction_insert(models) {
  sql = "";
  models.forEach((model) => {
    var sub_sql = "INSERT INTO ";
    sub_sql = sub_sql.concat(mysql.escapeId(model.table));
    sub_sql = sub_sql.concat(" SET ? ");
    sub_sql = mysql.format(sub_sql, model.get_db_object());
    sub_sql = sub_sql.concat(" ; ");
    sql = sql.concat(sub_sql);
  });

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    };

    db.exec_transaction_query(sql, cb);
  });
};

module.exports.transaction_insert_update = function transaction_insert_update(
  update_models,
  insert_models,
  params
) {
  sql = "";
  update_models.forEach((model) => {
    var sub_sql = "UPDATE ";
    sub_sql = sub_sql.concat(mysql.escapeId(model.table));
    sub_sql = sub_sql.concat(" SET ? ");

    var attrs = model.attrs;
    var obj = {};
    for (const attr of attrs) {
      if (!(model[attr] === undefined || model[attr] === null)) {
        obj[attr] = model[attr];
      }
    }
    sub_sql = mysql.format(sub_sql, obj);
    console.log(obj);

    var conditions = "";
    if (params.conditions && params.conditions.length > 0) {
      conditions = " WHERE ";
      params.conditions.forEach((condition) => {
        conditions = conditions.concat(condition, " AND ");
      });
      conditions = conditions.slice(0, -4);
    }
    sub_sql = sub_sql.concat(conditions);
    sub_sql = sub_sql.concat(" ; ");
    sql = sql.concat(sub_sql);
  });

  insert_models.forEach((model) => {
    var sub_sql = "INSERT INTO ";
    sub_sql = sub_sql.concat(mysql.escapeId(model.table));
    sub_sql = sub_sql.concat(" SET ? ");
    sub_sql = mysql.format(sub_sql, model.get_db_object());
    sub_sql = sub_sql.concat(" ; ");
    sql = sql.concat(sub_sql);
  });

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    };

    db.exec_transaction_query(sql, cb);
  });
};

module.exports.hr = function (new_hr_model, is_new = true) {
  sql = "UPDATE ".concat(mysql.escapeId(new_hr_model.table), " SET ");
  sql = sql.concat(" `active_status` = '0' where `job_title` = ? ");
  sql = mysql.format(sql, new_hr_model.job_title);
  if (is_new) {
    sql = sql.concat(" ; INSERT INTO ", mysql.escapeId(new_hr_model.table));
    sql = sql.concat(" SET ? ");
    sql = mysql.format(sql, new_hr_model.get_db_object());
    sql = sql.concat(";");
  } else {
    sql = sql.concat(" ; UPDATE ", mysql.escapeId(new_hr_model.table));
    sql = sql.concat(" SET ? ");
    sql = mysql.format(sql, new_hr_model.get_db_object(true));
    sql = sql.concat(
      " WHERE `employee_id` = ",
      mysql.escape(new_hr_model.employee_id)
    );
    sql = sql.concat(";");
  }

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    };

    db.exec_transaction_query(sql, cb);
  });
};
