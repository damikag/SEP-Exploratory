const router = require("express").Router();
const emailController = require("../../../controllers/email/emailController");

router.post("/send", emailController.indexAction);

module.exports = router;
