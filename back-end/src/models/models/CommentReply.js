const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "message",
  "author_id",
  "comment_id",
  "no_of_likes",
  "initial_comment",
  "created_at",
  "updated_at",
  "deleted_at",
];

function CommentReply(data = {}) {
  model.call(this, "comment_reply", CommentReply, data, attrs);
}

CommentReply.prototype = Object.create(model.prototype);

CommentReply.prototype.find_by_id = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));
  params.push(
    mysql.escapeId("project_id").concat(" = ").concat(mysql.escape(project_id))
  );
  return this.find_first(params);
};

CommentReply.prototype.update = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));

  return this.update(params);
};

module.exports = CommentReply;
