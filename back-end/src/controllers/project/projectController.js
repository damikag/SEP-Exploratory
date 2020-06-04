const { create_project_validation } = require("./validation");
var mysql = require("mysql");
var ProjectService = require("../../service/project/ProjectService");
var Project = require("../../models/models/Project");
var Collaborate = require("../../models/models/Collaborate");
var ProjectModel = require("../../models/models/Collaborate");
var Image = require("../../models/models/Image");
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

  ProjectService.createProject({ ...req.body, visibility_public: "0" })
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.finalPaperAction = (req, res) => {
  var project = new Project({
    final_paper: req.body.files[0],
    updated_at: new Date.now(),
  });
  project
    .upload_final_paper(req.body.project_id)
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

module.exports.isExistProjectAction = async (req, res) => {
  var project = new Project();

  project
    .find_by_id(req.body.project_id)
    .then(async (result) => {
      if (result === false) {
        return res.status(200).json(false);
      } else {
        return res.status(200).json(true);
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.updateProjectAction = async (req, res) => {
  ProjectService.updateProject(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
};

module.exports.deleteProjectAction = async (req, res) => {
  ProjectService.softDeleteProject(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json(err));
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

module.exports.saveFileAction = (req, res) => {
  if (req.body.type === "final_paper") {
    var project = new Project({ final_paper: req.body.name });
    project
      .upload_final_paper(req.body.project_id)
      .then((result) => {
        return res.status(200).json({ message: "Saved!" });
      })
      .catch((err) => {
        return res.status(500).json({ message: "Error!" });
      });
  }
  res.status(200).json({ message: "Image Saved!" });
};

module.exports.removeFinalPaperAction = (req, res) => {
  var project = new Project({ final_paper: "NULL" });
  project
    .remove_final_paper(req.body.project_id)
    .then((result) => {
      return res.status(200).json({ message: result });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

module.exports.retreiveImageFileAction = (req, res) => {
  res.sendFile(`${process.cwd()}/public/related_images/${req.body.file}`);
};

module.exports.getCollaboratorIdsAction = (req, res) => {
  var collaborate = new Collaborate({ project_id: req.body.project_id });
  collaborate
    .find_all_collaborators(req.body.project_id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json(err.message);
    });
};
