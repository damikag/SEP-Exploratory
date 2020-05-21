// const { create_project_validation } = require("../project/validation");

var CommentService = require("../../service/comment/CommentService");
var ProjectCommentReply = require("../../models/views/ProjectCommentReply");
var CommentReply = require("../../models/models/CommentReply");

var moment = require("moment");

module.exports.indexAction = (req, res) => {
  return res.status(200).send("You are at project index");
};

module.exports.getCommentsAction = async (req, res) => {
  console.log(res);
  var projectCommentReply = new ProjectCommentReply({
    project_id: req.body.id,
  });

  projectCommentReply
    .find_by_project_id()
    .then(async (result) => {
      console.log(result);
      return res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: error.message });
    });
};

module.exports.getCommentRepliesAction = async (req, res) => {
  var projectCommentReply = new ProjectCommentReply({
    comment_id: req.body.id,
  });

  projectCommentReply
    .find_by_comment_id()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.replyCommentAction = async (req, res) => {
  var commentReply = new CommentReply(req.body);

  commentReply
    .insert()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.newCommentAction = async (req, res) => {
  console.log("here");
  CommentService.add_new_comment(req.body)
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

module.exports.deleteCommentAction = async (req, res) => {
  CommentService.delete_comment_thread({
    id: req.body.id,
    deleted_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  })
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
};

module.exports.editReplyAction = async (req, res) => {
  var commentReply = new CommentReply(req.body);

  commentReply
    ._update()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.deleteReplyAction = async (req, res) => {
  var commentReply = new CommentReply({
    id: req.body.id,
    deleted_at: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  });

  commentReply
    ._delete()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.getReplyAction = async (req, res) => {
  var commentReply = new CommentReply({
    id: req.body.id,
  });

  commentReply
    .find_by_id()
    .then(async (result) => {
      return res.status(200).json(result.initial_comment);
    })
    .catch((error) => {
      return res.status(500).json(error.message);
    });
};
