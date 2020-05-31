var db = require('../db/db')
var mysql = require('mysql')

var Chat = require('../models/models/Chat')
var Participant = require('../models/models/Participant')

class ChatroomServices {

  static createChatRoom(chatDetails) {

    return new Promise((resolve, reject) => {
      console.log(chatDetails)
      var chat = new Chat(chatDetails)
      chat.insert()
        .then((res) => {

          var participantList = []
          participantList.push(new Participant(
            {
              chat_id: res.insertId,
              user_id: chatDetails.creator_id,
              isAdmin: 1,
            }
          ))
          chatDetails.participants.forEach(eachParticipant => {
            if (eachParticipant.user_id != chatDetails.creator_id) {
              participantList.push(new Participant(
                {
                  chat_id: res.insertId,
                  user_id: eachParticipant.user_id,
                  isAdmin: eachParticipant.isAdmin,
                }
              ))
            }

          })
          var tempParticipant = new Participant()
          tempParticipant.bulk_insert(participantList)
            .then(res2 => {
              resolve({ success: true, message: "Successfully Created the Group" })
            })
            .catch(err => { reject({ success: false, message: "Participant addition Failed." }) })
        }).catch(err => { reject({ success: false, message: "Group creation Failed." }) })
    });

  }


  static searchResearchers(searchString) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results)
        }
      }
      var sql = mysql.format('SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, researcher.email, institution.name as institution FROM researcher,institution WHERE  MATCH(first_name,last_name,researcher.email) AGAINST(? IN NATURAL LANGUAGE MODE) AND researcher.deleted_at IS NULL AND researcher.institution=institution.id', [searchString])
      db.query(sql, cb);
    });
  }

  static allResearchers() {

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
      }
      var sql = 'SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, researcher.email, institution.name as institution FROM researcher,institution WHERE researcher.deleted_at IS NULL AND researcher.institution=institution.id'
      db.query(sql, cb);
    });
  }

  static getParticipants(chat_id) {

    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          var result_array = []
          results.forEach(res => {
            result_array.push(Object.assign({}, res))
          })
          // console.log(result_array)
          resolve(result_array)
        }
      }
      var sql = mysql.format('SELECT researcher.id AS user_id, first_name, last_name,profile_picture, researcher.email, institution.name as institution,isAdmin FROM researcher,institution,participant WHERE participant.deleted_at IS NULL AND researcher.deleted_at IS NULL AND researcher.institution=institution.id AND researcher.id=participant.user_id AND participant.chat_id=?', [chat_id])
      db.query(sql, cb);
    });
  }

  static updateChatInfo(chatInfo) {

    return new Promise((resolve, reject) => {
      var newChat = new Chat(chatInfo)
      newChat.update(chatInfo)
        .then(res => {
          if (res.affectedRows) {
            resolve({ success: true, message: "Successfully Updated!" })
          }
          else {
            resolve({ success: false, message: "Update Failed!" })
          }
        }).catch(err => {
          resolve({ success: false, message: "Update Failed!" })
        })
    })

  }

  static changeAdmin(userInfo) {

    return new Promise((resolve, reject) => {
      var participant = new Participant(userInfo)
      participant.update(userInfo)
        .then(res => {
          if (res.affectedRows) {
            resolve({ success: true, message: "Successfully Updated!" })
          }
          else {
            resolve({ success: false, message: "Update Failed!" })
          }

        }).catch(err => {
          resolve({ success: false, message: "Update Failed!" })
        })
    })

  }

  static addMoreParticipants(usersInfo) {

    return new Promise((resolve, reject) => {
      this.getParticipants(usersInfo.chat_id)
        .then(res2 => {

          var currentParticipantSet = new Set()
          res2.forEach(p => {
            currentParticipantSet.add(p.user_id)
          })

          var participantList = []

          usersInfo.participants.forEach(eachParticipant => {
            if (!currentParticipantSet.has(eachParticipant)) {
              participantList.push(new Participant(
                {
                  chat_id: usersInfo.chat_id,
                  user_id: eachParticipant,
                  isAdmin: 0,
                }
              ))
            }

          })
          var tempParticipant = new Participant()
          tempParticipant.bulk_insert(participantList)
            .then(res2 => {
              resolve({ success: true, message: "Successfully added the participants" })
            })
            .catch(err => { reject({ success: false, message: "Participant addition Failed!" }) })

        })
        .catch(err => { reject({ success: false, message: "Participant addition Failed!" }) })
    })
  }

  static removeParticipant(chat_id, user_id) {

    return new Promise((resolve, reject) => {

      const cb = function (error, results, fields) {
        if (results[0].adminCount > 1) {
          var participant = new Participant()
          participant.delete([mysql.format('chat_id=?', [chat_id]), mysql.format('user_id=?', [user_id])])
            .then(res => {
              console.log(res)
              resolve({ success: true, message: "Participant Removed" })
            }).catch(err => {
              console.log(err)
              resolve({ success: false, message: "Participant removal Failed!" })
            })
        }
        else {
          var participant = new Participant()
          participant.find_by_user_id_and_chat_id(user_id, chat_id)
            .then(res => {
              if (res.isAdmin == 0) {
                participant.delete([mysql.format('chat_id=?', [chat_id]), mysql.format('user_id=?', [user_id])])
                  .then(res => {
                    resolve({ success: true, message: "Participant Removed" })
                  }).catch(err => {
                    resolve({ success: false, message: "Participant removal Failed!" })
                  })
              }
              else {
                resolve({ success: false, message: "Participant removal Failed!\n You are the Only Admin Remaining" })
              }
            })
            .catch(err => { resolve({ success: false, message: "Participant removal Failed!" }) })

        }

      }
      var sql = mysql.format('SELECT count(*) AS adminCount FROM participant WHERE chat_id=? AND isAdmin AND deleted_at IS NULL', [chat_id])
      db.query(sql, cb);
    })

  }

  static getDirrectChat(user1_id, user2_id) {
    return new Promise((resolve, reject) => {

      const cb = function (error, results, fields) {
        if (results.length > 0) {
          resolve(Object.assign({}, results[0]))
        }
        resolve(null)
      }
      var sql = mysql.format('SELECT chat.id AS chat_id FROM chat,participant WHERE chat.id=participant.chat_id AND chat.isDirrect=TRUE AND ((chat.creator_id=? AND participant.user_id=?) OR (participant.user_id=? AND chat.creator_id=?)) AND chat.deleted_at IS NULL', [user1_id, user2_id, user1_id, user2_id])
      db.query(sql, cb);
    })
  }
}

module.exports = ChatroomServices