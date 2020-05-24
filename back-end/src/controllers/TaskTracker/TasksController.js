const {getTasksByProjectId, addTask, deleteTask, editTask} = require("../../models/models/TaskTracker/Tasks");

module.exports = {
  getTasksByProjectId: (req, res) => {
    const id = req.params.id;
    console.log(id);
    getTasksByProjectId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get tasks by project id error",
        });
      }
      if (!results) {
        return res.status(200).json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  addTask: (req, res) => {
    const body = req.body;
    addTask(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  deleteTask: (req, res) => {
    const body = req.body;
    deleteTask(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to delete task",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "task deleted successfully",
      });
    });
  },

  editTask: (req, res) => {
    const body = req.body;
    editTask(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to edit task",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Task updated successfully",
      });
    });
  },
};
