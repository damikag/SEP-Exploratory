const { addMessage } = require("../../models/models/AboutUs/message");

module.exports = {
  addMessage: (req, res) => {
    const body = req.body;
    addMessage(body, (err, results) => {
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
};
