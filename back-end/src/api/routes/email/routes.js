const router = require("express").Router();
const emailController = require("../../../controllers/email/emailController");

router.post("/join-exploratory", emailController.newUserAction);
router.post("/new-project", emailController.newProjectAction);
router.post("/new-task", emailController.newTaskAction);

module.exports = router;
