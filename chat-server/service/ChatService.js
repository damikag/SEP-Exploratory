// var Project = require('../models/models/Project')
// var Collaborate = require('../../models/models/Collaborate')
// var TagProject = require('../../models/models/TagProject')
// var db_service = require('../db/db_service')

var Chat = require('../models/models/Chat')
var db = require('../db/db')
var mysql = require('mysql')

class ChatServices {
  static getChats(user_id) {

    return new Promise((resolve, reject) => {
      const cb = async function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          var chats = []
          var promiseList = []

          await results.forEach((chat, ind) => {
            var chatObject = Object.assign({ chatMesseges: [], lastSeenACK: 0 }, chat);
            // chatObject.ne="new field"
            // await ChatServices.getMessages(chatObject.chat_id)
            // .then((res)=>{
            //   chatObject.Messeges=res
            //   console.log(res)
            // }).catch(err=>{console.log(err)})
            promiseList.push(ChatServices.getMessages(chatObject.chat_id)
              .then((res) => {
                chatObject.chatMesseges = []
                res.forEach(msg => {
                  chatObject.chatMesseges.push(Object.assign({}, msg))

                })
                // console.log(res)
              }).catch(err => { console.log(err) }))

            promiseList.push(ChatServices.getLastSeenACK(chatObject.chat_id, user_id)
              .then((res) => {
                chatObject.lastSeenACK = res
              }).catch(err => { console.log(err) }))

            chats.push(chatObject)
          })
          Promise.all(promiseList).then(() => {
            // console.log(chats)
            resolve(chats)
          })
            .catch(err => { console.log(err) })
          // await resolve(chats)
        }
      };
      var sql = "SELECT chat.id AS chat_id,chat.name as name, chat.logo, description FROM chat,participant WHERE chat.id=participant.chat_id AND participant.user_id= ? AND chat.deleted_at IS NULL"
      sql = mysql.format(sql, [user_id])
      db.query(sql, cb);
    });

  }

  static getMessages(chat_id) {
    // return("hi")
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          // console.log(results)
          resolve(results)
        }
      };
      var sql = "SELECT message.id as id,message,chat_id,message_time,sender_id,first_name,last_name,email,profile_picture FROM message,researcher WHERE researcher.id=message.sender_id AND chat_id=? AND message.deleted_at IS NULL"
      sql = mysql.format(sql, [chat_id])
      // console.log(sql)
      db.query(sql, cb);
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
      var sql = "SELECT participant.user_id, researcher.first_name, researcher.last_name,isAdmin FROM participant,researcher WHERE participant.user_id=researcher.id AND participant.chat_id= ? AND participant.deleted_at IS NULL"
      sql = mysql.format(sql, [chat_id])
      db.query(sql, cb);
    });

  }

  static getLastSeenACK(chat_id, user_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results[0].message_id) { resolve(results[0].message_id) }
          resolve(0)
        }
      };
      var sql = "SELECT MAX(message_id) AS message_id FROM seen WHERE chat_id=? AND user_id=?;"
      sql = mysql.format(sql, [chat_id, user_id])
      db.query(sql, cb);
    });

  }


}


module.exports = ChatServices