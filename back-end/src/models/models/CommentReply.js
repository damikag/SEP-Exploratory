const model = require("../model");
const mysql = require("mysql");

const attrs = [
  "id",
  "message",
  "author_id",
  "comment_id",
  "no_of_likes",
  "no_of_dislikes",
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
  params.push(mysql.escapeId("deleted_at").concat(" IS ").concat(" NULL "));

  return this.find_first(params);
};

CommentReply.prototype._update = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));

  return this.update(params);
};

CommentReply.prototype._delete = function () {
  var params = [];
  params.push(mysql.escapeId("id").concat(" = ").concat(mysql.escape(this.id)));

  this.find_by_id;

  return this.update(params);
};

CommentReply.prototype._delete_by_comment_id = function () {
  var params = [];
  params.push(
    mysql
      .escapeId("comment_id")
      .concat(" = ")
      .concat(mysql.escape(this.comment_id))
  );

  return this.update(params);
};

CommentReply.prototype.like_comment = function (reply_id) {
  var params = [];
  params.push(
    mysql.escapeId("id").concat(" = ").concat(mysql.escape(reply_id))
  );

  return this.update(params);
};

CommentReply.prototype.dislike_comment = function (reply_id) {
  var params = [];
  params.push(
    mysql.escapeId("id").concat(" = ").concat(mysql.escape(reply_id))
  );

  return this.update(params);
};

module.exports = CommentReply;
