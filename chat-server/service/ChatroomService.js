var db = require('../db/db')
var mysql = require('mysql')

var Chat = require('../models/models/Chat')
var Participant = require('../models/models/Participant')

class ChatroomServices {

  static createChatRoom(chatDetails) {

    return new Promise((resolve, reject) => {

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
          var result_array=[]
          results.forEach(res=>{
            result_array.push(Object.assign({},res))
          })
          resolve(result_array)
        }
      }
      var sql = 'SELECT researcher.id AS id, first_name AS first_name, last_name,profile_picture, researcher.email, institution.name as institution FROM researcher,institution WHERE researcher.deleted_at IS NULL AND researcher.institution=institution.id'
      db.query(sql, cb);
    });
  }
}

module.exports = ChatroomServices