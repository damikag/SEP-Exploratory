var mysql = require('mysql');
var db = require('./db');
var sql="";

module.exports.transaction_insert = function transaction_insert(models){
    sql = "";
    models.forEach((model) => {
        var sub_sql = 'INSERT INTO ';
        sub_sql = sub_sql.concat(mysql.escapeId(model.table));
        sub_sql = sub_sql.concat(' SET ? ');
        sub_sql = mysql.format(sub_sql,model.get_db_object());
        sub_sql = sub_sql.concat(' ; ');
        sql = sql.concat(sub_sql);
    });

    return new Promise((resolve, reject) => {
        const cb = function(error,results,fields){
            
            if(error){
                reject(error);
            } 
            else{
                resolve(true) 
            }            
        }

        db.exec_transaction_query(sql,cb);
    });

}

module.exports.hr = function(new_hr_model,is_new = true){
    sql = "UPDATE ".concat(mysql.escapeId(new_hr_model.table)," SET ");
    sql = sql.concat(" `active_status` = '0' where `job_title` = ? ");
    sql = mysql.format(sql,new_hr_model.job_title);
    if (is_new) {
        sql = sql.concat(" ; INSERT INTO ",mysql.escapeId(new_hr_model.table));
        sql = sql.concat(" SET ? ");
        sql = mysql.format(sql,new_hr_model.get_db_object());
        sql = sql.concat(";")
    } else {
        sql = sql.concat(" ; UPDATE ",mysql.escapeId(new_hr_model.table));
        sql = sql.concat(" SET ? ");
        sql = mysql.format(sql,new_hr_model.get_db_object(true));
        sql = sql.concat(" WHERE `employee_id` = ",mysql.escape(new_hr_model.employee_id))
        sql = sql.concat(";")
    }
    
    return new Promise((resolve, reject) => {
        const cb = function(error,results,fields){
            
            if(error){
                reject(error);
            } 
            else{
                resolve(true) 
            }            
        }

        db.exec_transaction_query(sql,cb);
    });

}
