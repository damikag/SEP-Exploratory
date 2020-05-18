const { create_project_validation } = require("./validation");

var ProjectService = require("../../service/project/ProjectService");
var ProjectModel = require("../../models/models/Collaborate");
var CollaborateResearcherInstitute = require("../../models/views/CollaborateResearcherInstitute");
var moment = require("moment");

module.exports.indexAction = (req, res) => {
  return res.status(200).send("You are at project index");
};

module.exports.createProjectAction = (req, res) => {
  const { error } = create_project_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  ProjectService.createProject(req.body)
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.renderProjectAction = async (req, res) => {
  ProjectService.getProject(req.body)
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
module.exports.getProjectCollabAction = (req, res) => {
  var collaborator_view = new CollaborateResearcherInstitute({
    project_id: req.body.group,
  });
  collaborator_view
    .find_by_project_id()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};


