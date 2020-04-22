var Project = require('../../models/models/Project')
var Collaborate = require('../../models/models/Collaborate')
var TagProject = require('../../models/models/TagProject')
var db_service = require('../../db/db_service')

class ProjectService {
    static createProject(body) {
      
      var collaborators = body.collaborators;
      var tag_projects = body.tags;
      delete body.collaborators;
      delete body.tags;

      return new Promise((resolve,reject) => {
        var project = new Project(body);

        project.insert()
        .then( async (result)=>{

          var modals = [];
          await collaborators.forEach((collaborator) => {
            var collaborators_modal = new Collaborate({
              project_id: result.insertId,
              researcher_id: collaborator,
              isAdmin: (collaborator==body.creator) ? 1:0,
            });
            modals.push(collaborators_modal);
          });
         
          var tag_project_modals = [];
          await tag_projects.forEach((tag) => {
            var tags_project_modal = new TagProject({
              tag_id: tag,
              project_id: result.insertId,
            });
            tag_project_modals.push(tags_project_modal);
          });

          db_service
            .transaction_insert(modals)
            .then((result1) => {
              
                db_service
                  .transaction_insert(tag_project_modals)
                  .then((result2) => {
                    resolve({insertId:result.insertId})
                  })
                  .catch((err) => {
                    reject(err)
                  });
              
            })
            .catch((err) => {reject(err)});
          
        })
        .catch( (error) => {
          reject(error)
        })
      })
      
    }
}

module.exports= ProjectService