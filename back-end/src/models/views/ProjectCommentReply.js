const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "reply_id",
  "project_id",
  "comment_id",
  "message_id",
  "author_id",
  "message",
  "no_of_likes",
  "no_of_dislikes",
  "initial_comment",
  "first_name",
  "last_name",
  "institution",
  "profile_picture",
  "created_at",
  "updated_at",
  "deleted_at",
];

function ProjectCommentReply(data = {}) {
  model.call(this, "project_comment_reply", ProjectCommentReply, data, attrs);
}

ProjectCommentReply.prototype = Object.create(model.prototype);

ProjectCommentReply.prototype.find_by_project_id = function () {
  var params = [];

  var param = "";
  param = param.concat(
    mysql.escapeId("project_id"),
    " = ",
    mysql.escape(this.project_id),
    " AND ",
    mysql.escapeId("initial_comment"),
    " = ",
    " 1 "
  );

  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  params.push(param);

  return this.find_all(params);
};

ProjectCommentReply.prototype.find_by_comment_id = function () {
  var params = [];

  var param = "";
  param = param.concat(
    mysql.escapeId("comment_id"),
    " = ",
    mysql.escape(this.comment_id)
  );

  params.push(param);
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  return this.find_all(params);
};

module.exports = ProjectCommentReply;
