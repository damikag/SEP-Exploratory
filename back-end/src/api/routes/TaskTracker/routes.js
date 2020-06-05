const router = require('express').Router();

const { getTasksByProjectId, addTask, editTask, deleteTask } = require("../../../controllers/TaskTracker/TasksController");
const { getCommentsByProjectId, addComment, deleteComment, editComment } = require("../../../controllers/TaskTracker/CommentsController");
const { getCollaboratorsByProjectId } = require("../../../controllers/TaskTracker/CollaboratorController");


router.get("/tasks/:id", getTasksByProjectId);
router.post("/addtask", addTask);
router.patch("/deletetask",deleteTask);
router.patch("/edittask", editTask);

router.get("/comments/:id", getCommentsByProjectId);
router.post("/addcomment", addComment);
router.patch("/deletecomment",deleteComment);
router.patch("/editcomment", editComment);

router.get("/collaborators/:id", getCollaboratorsByProjectId);

module.exports = router;