const router = require("express").Router();

const commentController = require("../../../controllers/comment/commentController");

// CRUD Comments
router.post("/view-comments", commentController.getCommentsAction);
//
router.post("/new-comment", commentController.newCommentAction);
//
router.post("/delete-comment", commentController.deleteCommentAction);

// not working properly
router.post("/like-comment", commentController.likeCommentAction);

router.post("/dislike-comment", commentController.dislikeCommentAction);

//CRUD reply
router.post("/view-replies", commentController.getCommentRepliesAction);

router.post("/get-reply", commentController.getReplyAction);

//
router.post("/reply-comment", commentController.replyCommentAction);
//
router.post("/edit-reply", commentController.editReplyAction);
//
router.post("/delete-reply", commentController.deleteReplyAction);

module.exports = router;
