var Project = require("../../models/models/Project");
var Collaborate = require("../../models/models/Collaborate");
const db_service = require("../../db/db_service");
const { create_project_validation } = require("./validation");

module.exports.indexAction = (req, res) => {
  return res.status(200).send("You are at project index");
};

module.exports.createProjectAction = (req, res) => {
  const { error } = create_project_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  var collaborators = req.body.collaborators;

  delete req.body.collaborators;

  var project = new Project(req.body);

  project
    .insert()
    .then(async (result) => {
      if (result) {
        var modals = [];
        await collaborators.forEach((collaborator) => {
          var collaborators_modal = new Collaborate({
            project_id: result.insertId,
            researcher_id: collaborator,
          });
          modals.push(collaborators_modal);
        });

        db_service
          .transaction_insert(modals)
          .then((result) => res.status(200).json({ result: result }))
          .catch((err) => res.status(500).json({ error: err.message }));
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    })
    .catch((error) => {
      return res.status(500).send("server error");
    });
};
