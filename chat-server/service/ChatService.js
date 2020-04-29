// var Project = require('../models/models/Project')
// var Collaborate = require('../../models/models/Collaborate')
// var TagProject = require('../../models/models/TagProject')
// var db_service = require('../db/db_service')

var Chat = require('../models/models/Chat')
var db = require('../db/db')
var mysql = require('mysql')

class ChatServices{
  static getChats(user_id){
   
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results)
          }
      };
      var sql="SELECT chat.id AS chat_id,chat.name as name, chat.logo, description FROM chat,participant WHERE chat.id=participant.chat_id AND participant.user_id= ? AND chat.deleted_at IS NULL"
      sql = mysql.format(sql,[user_id])
      db.query(sql, cb);
  });

  }

  static getParticipants(chat_id){
    
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results)
          }
      };
      var sql="SELECT participant.user_id, researcher.first_name, researcher.last_name,isAdmin FROM participant,researcher WHERE participant.user_id=researcher.id AND participant.chat_id= ? AND participant.deleted_at IS NULL"
      sql = mysql.format(sql,[chat_id])
      db.query(sql, cb);
  });

  }


  static getMessages(chat_id){
    
    return new Promise((resolve, reject) => {
      const cb = function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results)
          }
      };
      var sql="SELECT message.id,message,message_time,sender_id FROM message WHERE message.chat_id= ? AND message.deleted_at IS NULL"
      sql = mysql.format(sql,[chat_id])
      db.query(sql, cb);
  });

  }
}

// class ProjectService {
//     static createProject(body) {
      
//       var collaborators = body.collaborators;
//       var tag_projects = body.tags;
//       delete body.collaborators;
//       delete body.tags;

//       return new Promise((resolve,reject) => {
//         var project = new Project(body);

//         project.insert()
//         .then( async (result)=>{

//           var modals = [];
//           await collaborators.forEach((collaborator) => {
//             var collaborators_modal = new Collaborate({
//               project_id: result.insertId,
//               researcher_id: collaborator,
//               isAdmin: (collaborator==body.creator) ? 1:0,
//             });
//             modals.push(collaborators_modal);
//           });
         
//           var tag_project_modals = [];
//           await tag_projects.forEach((tag) => {
//             var tags_project_modal = new TagProject({
//               tag_id: tag,
//               project_id: result.insertId,
//             });
//             tag_project_modals.push(tags_project_modal);
//           });

//           db_service
//             .transaction_insert(modals)
//             .then((result1) => {
              
//                 db_service
//                   .transaction_insert(tag_project_modals)
//                   .then((result2) => {
//                     resolve({insertId:result.insertId})
//                   })
//                   .catch((err) => {
//                     reject(err)
//                   });
              
//             })
//             .catch((err) => {reject(err)});
          
//         })
//         .catch( (error) => {
//           reject(error)
//         })
//       })
      
//     }
// }

module.exports= ChatServices