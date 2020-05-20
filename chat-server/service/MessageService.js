var Chat = require('../models/models/Chat')
var Message = require('../models/models/Message')
var db = require('../db/db')
var mysql = require('mysql')

class MessageServices {
  
    
  static saveMessages(msg) {

    return new Promise((resolve, reject) => {
      
      var newMsg = new Message(msg)
      newMsg.insert()
      .then((savedMessage)=>{
        resolve(savedMessage)
      })
      .catch((err)=>{console.log(err)})
      
    });

  }

  static getParticipants(chat_id) {
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results)
        }
      };
      var sql = "SELECT * FROM participant WHERE chat_id=? AND deleted_at IS NULL"
      sql = mysql.format(sql, [chat_id])
      db.query(sql, cb);
    });

  }

  static getSenderDetails(sender_id) {
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results)
        }
      };
      var sql = "SELECT id,first_name,last_name,email,profile_picture FROM researcher WHERE id=? AND deleted_at IS NULL"
      sql = mysql.format(sql, [sender_id])
      db.query(sql, cb);
    });

  }

  static markSeen(chat_id, user_id,message_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if(error){resolve(false)}
        resolve(true)
      };
      var sql = "INSERT INTO seen(chat_id,user_id,message_id) VALUES(?,?,?);"
      sql = mysql.format(sql, [chat_id, user_id,message_id])
      db.query(sql, cb);
    });

  }

  static getSeen(chat_id, message_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
       
        if (error) {
          reject(error);
        } else {
          var result_array = []
          results.forEach(res => {
            result_array.push(Object.assign({}, res))
          })
          resolve(result_array)
        }
      };
      var sql = "SELECT researcher.id AS user_id, first_name, last_name,profile_picture, researcher.email, institution.name as institution,seen_time FROM seen,researcher,institution WHERE seen.user_id=researcher.id AND researcher.institution=institution.id AND seen.chat_id=? AND seen.message_id=? AND researcher.deleted_at IS NULL ORDER BY researcher.first_name, researcher.last_name;"
      sql = mysql.format(sql, [chat_id,message_id])
      db.query(sql, cb);
    });

  }
}

module.exports = MessageServices