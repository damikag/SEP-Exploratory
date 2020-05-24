const {
  getQuestionCategory,
  getQuestions,
  addQuestion,
  deleteQuestion,
  editQuestion
} = require("../../models/models/Forum/ForumQuestion");

module.exports = {
  getQuestionCategory: (req, res) => {
    getQuestionCategory((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Question category error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  
  getQuestions: (req, res) => {
    getQuestions((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Loading Questions error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  addQuestion: (req, res) => {
    const body = req.body;
    addQuestion(body, (err, results) => {
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

  deleteQuestion: (req, res) => {
    const body = req.body;
    deleteQuestion(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to delete question",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Question deleted successfully",
      });
    });
  },

  editQuestion: (req, res) => {
    const body = req.body;
    editQuestion(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Failed to edit question",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Question updated successfully",
      });
    });
  },
};