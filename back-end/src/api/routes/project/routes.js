const router = require("express").Router();

const projectController = require("../../../controllers/project/projectController");
const { valid_jwt_needed } = require("../../middleware/authorization");

router.get("/", projectController.indexAction);

router.post("/create-project", projectController.createProjectAction);

router.post("/view-project", projectController.renderProjectAction);

router.post("/view-comments", projectController.getCommentsAction);

router.post("/view-replies", projectController.getCommentRepliesAction);

router.post("/reply-comment", projectController.replyCommentAction);

router.post("/edit-reply", projectController.editReplyAction);

module.exports = router;
