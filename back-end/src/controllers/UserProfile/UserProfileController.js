const { getProfileById, editProfile, getProjectsByUserId, getInstitutions } = require("../../models/models/UserProfile");

module.exports = {
  getProfileById: (req, res) => {
    const id = req.params.id;
    getProfileById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get userProfile error",
        });
      }
      if (!results[0]) {
        return res.status(200).json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results[0],
      });
    });
  },

  editProfile: (req, res) => {
    const body = req.body;
    editProfile(body, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Failed to edit profile",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Profile updated successfully",
      });
    });
  },

  getProjectsByUserId: (req, res) => {
    const id = req.params.id;
    getProjectsByUserId(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get projects error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getInstitutions: (req, res) => {
    getInstitutions((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Get institutions error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
