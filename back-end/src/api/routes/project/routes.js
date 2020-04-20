const router = require("express").Router();

const projectController = require("../../../controllers/project/projectController");
const { valid_jwt_needed } = require("../../middleware/authorization");

router.get("/", projectController.indexAction);

router.post("/createProject", projectController.createProjectAction);

module.exports = router;
