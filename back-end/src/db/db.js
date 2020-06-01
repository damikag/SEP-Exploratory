var mysql = require("mysql");
var sql = "";

const db_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

var con = mysql.createConnection(db_options);

module.exports.find = function find(tables, params, cb) {
  sql = "SELECT ";
  if (params.columns && params.columns.length > 0) {
    sql = sql.concat(" ?? ");
    var columns =
      params.columns && params.columns.length > 0 ? [params.columns] : [[]];
    sql = mysql.format(sql, columns);
  } else {
    sql = sql.concat(" * ");
  }

  sql = sql.concat(" FROM ?? ");
  sql = mysql.format(sql, [tables]);
  var conditions = "";
  if (params.conditions && params.conditions.length > 0) {
    conditions = conditions.concat(" WHERE ");
    params.conditions.forEach((condition) => {
      conditions = conditions.concat(condition, " AND ");
    });
    conditions = conditions.endsWith("AND ")
      ? conditions.slice(0, -4)
      : conditions;
  }
  sql = sql.concat(conditions);
  // console.log(sql);
  con.query(sql, cb);
};

module.exports.insert = function insert(table, data, cb) {
  sql = "INSERT INTO ";
  sql = sql.concat(mysql.escapeId(table));
  sql = sql.concat(" SET ? ");
  sql = mysql.format(sql, data);
  console.log(sql);
  con.query(sql, cb);
};

module.exports.bulk_insert = function insert(table, columns, data, cb) {
  sql = "INSERT INTO ";
  sql = sql.concat(mysql.escapeId(table));
  sql = sql.concat(" ( ?? ) ");
  sql = mysql.format(sql, [columns]);
  sql = sql.concat(" VALUES ?");
  sql = mysql.format(sql, [data]);
  console.log(sql);
  con.query(sql, cb);
};

module.exports.update = function update(table, params, data, cb) {
  sql = "UPDATE ";
  sql = sql.concat(mysql.escapeId(table));
  sql = sql.concat(" SET ? ");
  sql = mysql.format(sql, data);
  var conditions = "";
  if (params.conditions && params.conditions.length > 0) {
    conditions = " WHERE ";
    params.conditions.forEach((condition) => {
      conditions = conditions.concat(condition, " AND ");
    });
    conditions = conditions.slice(0, -4);
  }
  sql = sql.concat(conditions);
  console.log(sql);
  con.query(sql, cb);
};

module.exports.bulk_update = function bulk_update(
  table,
  param_array,
  data_array,
  cb
) {
  if (param_array.length != data_array.length) {
    console.log("param_array and data array_should be equal in length");
    return Promise.reject({ message: "unmatched param size" });
  }
  sql = "";
  for (index = 0; index < param_array.length; index++) {
    var sub_sql = "UPDATE ";
    sub_sql = sub_sql.concat(mysql.escapeId(table));
    sub_sql = sub_sql.concat(" SET ? ");
    sub_sql = mysql.format(sub_sql, data_array[index]);
    var conditions = "";
    if (
      param_array[index].conditions &&
      param_array[index].conditions.length > 0
    ) {
      conditions = " WHERE ";
      param_array[index].conditions.forEach((condition) => {
        conditions = conditions.concat(condition, " AND ");
      });
      conditions = conditions.slice(0, -4);
    }
    sub_sql = sub_sql.concat(conditions, ";");
    // console.log(sub_sql);
    sql = sql.concat(sub_sql);
  }
  // console.log(sql);
  this.exec_transaction_query(sql, cb);
};

module.exports.delete = function del(table, params, cb) {
  sql = "DELETE FROM ";
  sql = sql.concat(mysql.escapeId(table));
  if (params.conditions && params.conditions.length > 0) {
    conditions = " WHERE ";
    params.conditions.forEach((condition) => {
      conditions = conditions.concat(condition, " AND ");
    });
    conditions = conditions.slice(0, -4);
  } else {
    console.log("no conditions given");
    return Promise.reject({ message: "no condition given for delete" });
  }
  sql = sql.concat(conditions);
  // console.log(sql);
  con.query(sql, cb);
};

//params should be given in order
module.exports.call_proc = function call(procedure, params, cb) {
  sql = "CALL ";
  sql = sql.concat(mysql.escapeId(procedure));
  var params_string = "(";
  if (params && params.length > 0) {
    params.forEach((param) => {
      params_string = params_string.concat(mysql.escape(param), ",");
    });
    params_string = params_string.slice(0, -1);
  }
  params_string = params_string.concat(")");
  sql = sql.concat(params_string);
  // console.log(sql);
  con.query(sql, cb);
};

module.exports.exec_transaction_query = function exec_transaction_query(
  sql,
  cb
) {
  // console.log(sql);

  con.beginTransaction(function (err) {
    if (err) {
      cb(err);
    } else {
      con.query(sql, function (err, result) {
        if (err) {
          con.rollback(function () {
            cb(err);
          });
        } else {
          con.commit(function (err) {
            if (err) {
              con.rollback(function () {
                cb(err);
              });
            } else {
              cb();
            }
          });
        }
      });
    }
  });
};

module.exports.query = function query(sql, params, cb) {
  con.query(sql, params, cb);
};
