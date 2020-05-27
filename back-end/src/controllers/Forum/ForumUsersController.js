const { getForumUsers } = require("../../models/models/Forum/ForumUsers");

module.exports = {
  getForumUsers: (req, res) => {
    getForumUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Loading Users error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
