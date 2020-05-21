var Project = require("../../models/models/Project");
//create project
var Collaborate = require("../../models/models/Collaborate");
var TagProject = require("../../models/models/TagProject");
var ProjectCommentReply = require("../../models/views/ProjectCommentReply");
var db_service = require("../../db/db_service");
//get project
var CollaborateResearcherInstitute = require("../../models/views/CollaborateResearcherInstitute");
var TagProjectTag = require("../../models/views/TagProjectTag");
var Image = require("../../models/models/Image");

class ProjectService {
  static createProject(body) {
    var collaborators = body.collaborators;
    var tag_projects = body.tags;
    delete body.collaborators;
    delete body.tags;

    return new Promise((resolve, reject) => {
      var project = new Project(body);

      project
        .insert()
        .then(async (result) => {
          var modals = [];
          await collaborators.forEach((collaborator) => {
            var collaborators_modal = new Collaborate({
              project_id: result.insertId,
              researcher_id: collaborator,
              isAdmin: collaborator == body.creator ? 1 : 0,
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
                  resolve({ insertId: result.insertId });
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // delete ALL tags and insert ALL tags
  static updateProject(body) {
    return new Promise(async (resolve, reject) => {
      // update projects
      console.log(body);
      var req_body = {
        id: body.id,
        title: body.title,
        description: body.description,
        abstract: body.abstract,
        visibility_public: body.visibility_public,
      };
      var project = new Project(req_body);
      var promise_1 = await project.update_project();

      // update tags
      var tagProject = new TagProject({
        deleted_at: "NULL",
      });
      var promise_2 = await tagProject.delete_tags(body.id);

      var promise_3 = body.tags.map(async (tag) => {
        console.log();
        var tagProject = new TagProject({
          tag_id: tag.tag_id,
          project_id: body.id,
        });
        return await tagProject.insert();
      });

      // update collaborators
      var collaborate = new Collaborate({
        deleted_at: null,
      });
      var promise_4 = await collaborate.delete_collaborators(body.id);

      var promise_5 = body.collaborators.map(async (collaborator) => {
        var collaborate = new Collaborate({
          researcher_id: collaborator.id,
          project_id: body.id,
          isAdmin: 0,
        });
        return await collaborate.insert();
      });

      var promises = [
        promise_1,
        promise_2,
        ...promise_3,
        promise_4,
        ...promise_5,
      ];

      await Promise.all(promises)
        .then((res) => resolve(true))
        .catch((err) => {
          console.log(err.message);
          reject(false);
        });
    });
  }

  static deleteProject(body) {
    this.getProject(body).then((res) => {});
  }

  static getProject(body) {
    return new Promise(async (resolve, reject) => {
      var project = new Project(body);
      var promise1 = project.find_by_id();

      var collaborator_view = new CollaborateResearcherInstitute({
        project_id: body.id,
      });

      var promise2 = collaborator_view.find_by_project_id();

      var tag_view = new TagProjectTag({ project_id: body.id });
      var promise3 = tag_view.find_by_project_id();

      var images = new Image({ project_id: body.id });
      var promise4 = images.find_by_project_id();

      var comments = new ProjectCommentReply({ project_id: body.id });
      var promise5 = comments.find_by_project_id();

      await Promise.all([promise1, promise2, promise3, promise4, promise5])
        .then(([result1, result2, result3, result4, result5]) => {
          var [adminList, collaboratorList] = getAdminList(result2);

          var project_details = {
            project: result1,
            collaborators: collaboratorList,
            admins: adminList,
            tags: result3,
            related_images: result4,
            comments: result5,
          };
          resolve({ project_details });
        })
        .catch((err) => reject(err));
    });
  }
}
module.exports = ProjectService;

function getAdminList(collaborators) {
  var adminList = [];
  var collaboratorList = [];
  collaborators.forEach((item) => {
    if (item.isAdmin) {
      adminList.push(item);
    } else {
      collaboratorList.push(item);
    }
  });
  return [adminList, collaboratorList];
}
