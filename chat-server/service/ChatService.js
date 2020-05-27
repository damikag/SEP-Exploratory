// var Project = require('../models/models/Project')
// var Collaborate = require('../../models/models/Collaborate')
// var TagProject = require('../../models/models/TagProject')
// var db_service = require('../db/db_service')

var Chat = require('../models/models/Chat')
var db = require('../db/db')
var mysql = require('mysql')
var ChatroomService =require('./ChatroomService')

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
            var chatObject = Object.assign({ chatMesseges: [], lastSeenACK: 0, lastDeliverACK:0 }, chat);
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


            promiseList.push(ChatServices.getLastDeliverACK(chatObject.chat_id, user_id)
            .then((res) => {
              chatObject.lastDeliverACK = res
            }).catch(err => { console.log(err) }))

            if(chatObject.isDirrect){
              console.log(chatObject)
              promiseList.push(ChatroomService.getParticipants(chatObject.chat_id)
              .then((res)=>{
                res.forEach(participant=>{
                  if(participant.user_id!=user_id){
                    console.log(participant)
                    chatObject.name=participant.first_name.concat(" ").concat(participant.last_name)
                    chatObject.description="Dirrect Chat"
                    chatObject.logo=participant.profile_picture
                  }
                })
              }).catch(err=>{console.log(err)}))
            }
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
      var sql = "SELECT chat.id AS chat_id,chat.name as name, chat.logo, description, participant.created_at AS joined_at,isDirrect FROM chat,participant WHERE chat.id=participant.chat_id AND participant.user_id= ? AND chat.deleted_at IS NULL"
      sql = mysql.format(sql, [user_id])
      db.query(sql, cb);
    });

  }

  static getMessages(chat_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          // console.log(results)
          resolve(results)
        }
      };
      var sql = "SELECT * FROM (SELECT message.id as id,message,chat_id,message_time,sender_id,first_name,last_name,email,profile_picture FROM message,researcher WHERE researcher.id=message.sender_id AND chat_id=? AND message.deleted_at IS NULL ORDER BY message.id DESC LIMIT 20)sub ORDER BY id ASC"
      sql = mysql.format(sql, [chat_id])
      // console.log(sql)
      db.query(sql, cb);
    });

  }

  static getMoreMessages(chat_id,lastMsg_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          // console.log(results)
          var msgList=[]
          results.forEach(msg => {
            msgList.push(Object.assign({}, msg))

          })
          resolve(msgList)
        }
      };
      var sql = "SELECT * FROM (SELECT message.id as id,message,chat_id,message_time,sender_id,first_name,last_name,email,profile_picture FROM message,researcher WHERE researcher.id=message.sender_id AND chat_id=? AND message.deleted_at IS NULL AND message.id<? ORDER BY message.id DESC LIMIT 10)sub ORDER BY id ASC"
      sql = mysql.format(sql, [chat_id,lastMsg_id])
      // console.log(sql)
      db.query(sql, cb);
    });

  }

  // Auxillary 
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

  static getLastDeliverACK(chat_id, user_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results[0].message_id) { resolve(results[0].message_id) }
          resolve(0)
        }
      };
      var sql = "SELECT MAX(message_id) AS message_id FROM deliver WHERE chat_id=? AND user_id=?;"
      sql = mysql.format(sql, [chat_id, user_id])
      db.query(sql, cb);
    });

  }
}

module.exports = ChatServices