const { create_project_validation } = require("./validation");

var ProjectService = require("../../service/project/ProjectService");
var ProjectCommentReply = require("../../models/views/ProjectCommentReply");
var CommentReply = require("../../models/models/CommentReply");

var Project = require("../../models/models/Project");
var CollaborateResearcherInstitute = require("../../models/views/CollaborateResearcherInstitute");
var TagProjectTag = require("../../models/views/TagProjectTag");
var Image = require("../../models/models/Image");

module.exports.indexAction = (req, res) => {
  return res.status(200).send("You are at project index");
};

module.exports.createProjectAction = (req, res) => {
  const { error } = create_project_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  ProjectService.createProject(req.body)
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.renderProjectAction = async (req, res) => {
  ProjectService.getProject(req.body)
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.getCommentsAction = async (req, res) => {
  var projectCommentReply = new ProjectCommentReply({
    project_id: req.body.id,
  });

  projectCommentReply
    .find_by_project_id()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
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

module.exports.editReplyAction = async (req, res) => {
  var commentReply = new CommentReply(req.body);

  commentReply
    .update()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
