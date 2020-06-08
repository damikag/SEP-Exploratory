const router = require("express").Router();

const projectController = require("../../../controllers/project/projectController");
const tagController = require("../../../controllers/tag/tagController");
const imageController = require("../../../controllers/image/imageController");

const { valid_jwt_needed } = require("../../middleware/authorization");

const save_file = require("../../middleware/save_file");

router.get("/", projectController.indexAction);

router.post("/create-project", projectController.createProjectAction);

router.post("/view-project", projectController.renderProjectAction);

router.post("/is-exist-project", projectController.isExistProjectAction);

router.post("/update-project", projectController.updateProjectAction);

router.post("/delete-project", projectController.deleteProjectAction);

router.post("/get-all-tags", tagController.indexAction);

router.post("/get-collaborators", projectController.getProjectCollabAction);

router.post(
  "/get-collaborator-ids",
  projectController.getCollaboratorIdsAction
);

router.post("/save-file", save_file.upload, projectController.saveFileAction);

router.post("/retrieve-file", imageController.retreiveImageFileAction);

router.post("/insert-image-files", imageController.insertImageFilesAction);

router.post("/remove-final-paper", projectController.removeFinalPaperAction);

router.post(
  "/edit-abstract",
  valid_jwt_needed,
  projectController.editAbstractAction
);

module.exports = router;
