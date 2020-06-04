const {
  getCommentsByProjectId,
  addComment,
  deleteComment,
  editComment,
} = require("../../models/models/TaskTracker/Comments");

module.exports = {
  getCommentsByProjectId: (req, res) => {
    const id = req.params.id;
    getCommentsByProjectId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get comments by project id error",
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

  addComment: (req, res) => {
    const body = req.body;
    addComment(body, (err, results) => {
      if (err) {
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

  deleteComment: (req, res) => {
    const body = req.body;
    deleteComment(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Failed to delete comment",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Comment deleted successfully",
      });
    });
  },

  editComment: (req, res) => {
    const body = req.body;
    editComment(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Failed to edit comment",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Comment updated successfully",
      });
    });
  },
};
