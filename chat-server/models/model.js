const db = require("../db/db");

function model(table, sub_model, data = {}, attrs) {
  this.table = table;
  this.constructor = sub_model;

  attrs.forEach((element) => {
    this[element] = data[element];
  });
  this.attrs = attrs;
}

model.prototype.find_first = function find_first(params) {
  const _params = {
    conditions: params,
  };
  const table = this.table;
  const constructor = this.constructor;

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          const obj = new constructor(results[0]);
          resolve(obj);
        } else {
          resolve(false);
        }
      }
    };

    db.find([table], _params, cb);
  });
};

model.prototype.find_all = function find_all(params) {
  const _params = {
    conditions: params,
  };

  const table = this.table;
  const constructor = this.constructor;

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          var res_array = [];
          results.forEach(function (result, index) {
            res_array.push(new constructor(result));
          });
          resolve(res_array);
        } else {
          resolve(false);
        }
      }
    };
    db.find([table], _params, cb);
  });
};

model.prototype.insert = function insert() {
  const table = this.table;
  const attrs = this.attrs;
  var obj = {};
  for (const attr of attrs) {
    obj[attr] = this[attr];
    if (obj[attr] === undefined || obj[attr] === null) {
      continue;
      // obj[attr] = 'DEFAULT'
    }
  }

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    };

    db.insert(table, obj, cb);
  });
};

model.prototype.update = function update(params) {
  const _params = {
    conditions: params,
  };
  const table = this.table;
  const attrs = this.attrs;
  var obj = {};
  for (const attr of attrs) {
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

model.prototype.delete = function del(params) {
  const table = this.table;
  const _params = {
    conditions: params,
  };

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve({ affectedRows: results.affectedRows });
      }
    };
    db.delete(table, _params, cb);
  });
};

model.prototype.bulk_insert = function bulk_insert(models) {
  const table = this.table;
  const attrs = this.attrs;
  var objects = [];
  for (const model of models) {
    var obj = [];
    for (const attr of attrs) {
      if (model[attr] === undefined || model[attr] === null) {
        // obj.push("DEFAULT");
        obj.push(model[attr]);
      } else {
        obj.push(model[attr]);
      }
    }
    objects.push(obj);
  }

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    };

    db.bulk_insert(table, attrs, objects, cb);
  });
};

model.prototype.bulk_update = function bulk_update(models, param_array) {
  const table = this.table;
  const attrs = this.attrs;
  var objects = [];
  var p_array = [];
  for (index = 0; index < models.length; index++) {
    var obj = {};
    for (const attr of attrs) {
      if (
        !(models[index][attr] === undefined || models[index][attr] === null)
      ) {
        obj[attr] = models[index][attr];
      }
    }
    // console.log(obj)
    objects.push(obj);
    var _params = {
      conditions: param_array[index],
    };
    // console.log(_params)
    p_array.push(_params);
  }
  // console.log(objects);
  // console.log(p_array);

  return new Promise((resolve, reject) => {
    const cb = function (error, results, fields) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    };
    db.bulk_update(table, p_array, objects, cb);
  });
};

model.prototype.get_db_object = function (for_update = false) {
  var obj = {};

  if (for_update) {
    for (const attr of this.attrs) {
      if (!(this[attr] === undefined || this[attr] === null)) {
        obj[attr] = this[attr];
      }
    }
  } else {
    for (const attr of this.attrs) {
      obj[attr] = this[attr];
      if (obj[attr] === undefined || obj[attr] === null) {
        // obj[attr] = "DEFAULT";
        continue
      }
    }
  }

  return obj;
};

module.exports = model;
