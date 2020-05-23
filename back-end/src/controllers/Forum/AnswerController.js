const { getAnswers } = require("../../models/models/Forum/ForumAnswers");

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
};
