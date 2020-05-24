const router = require("express").Router();

const projectController = require("../../../controllers/project/projectController");
const tagController = require("../../../controllers/tag/tagController");

const { valid_jwt_needed } = require("../../middleware/authorization");

router.get("/", projectController.indexAction);

router.post("/create-project", projectController.createProjectAction);

router.post("/view-project", projectController.renderProjectAction);

router.post("/update-project", projectController.updateProjectAction);

router.post("/get-all-tags", tagController.indexAction);

router.post("/get-collaborators", projectController.getProjectCollabAction);


module.exports = router;
