const {
  getAnswers,
  addAnswer,
  deleteAnswer,
  editAnswer,
  likeAnswer,
  getPopularAnswers,
} = require("../../models/models/Forum/ForumAnswers");

module.exports = {
  getAnswers: (req, res) => {
    getAnswers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Loading Answers error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getPopularAnswers: (req, res) => {
    getPopularAnswers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Loading Popular Answers error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  addAnswer: (req, res) => {
    const body = req.body;
    addAnswer(body, (err, results) => {
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

  deleteAnswer: (req, res) => {
    const body = req.body;
    deleteAnswer(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to delete answer",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Answer deleted successfully",
      });
    });
  },

  editAnswer: (req, res) => {
    const body = req.body;
    editAnswer(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to edit answer",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Answer updated successfully",
      });
    });
  },

  likeAnswer: (req, res) => {
    const body = req.body;
    likeAnswer(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Answer liked successfully",
      });
    });
  },
};
