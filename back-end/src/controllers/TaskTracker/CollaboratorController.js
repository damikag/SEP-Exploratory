const {
  getCollaboratorsByProjectId,
} = require("../../models/models/TaskTracker/Collaborators");

module.exports = {
  getCollaboratorsByProjectId: (req, res) => {
    const id = req.params.id;
    getCollaboratorsByProjectId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get collaborators by project id error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
