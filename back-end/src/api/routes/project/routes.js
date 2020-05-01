const router = require("express").Router();

const projectController = require("../../../controllers/project/projectController");
const { valid_jwt_needed } = require("../../middleware/authorization");

router.get("/", projectController.indexAction);

router.post("/create-project", projectController.createProjectAction);

router.post("/view-project", projectController.renderProjectAction);

module.exports = router;
