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
}

module.exports = MessageServices