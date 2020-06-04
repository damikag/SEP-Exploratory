var ProjectComment = require("../../models/models/ProjectComment");
var CommentReply = require("../../models/models/CommentReply");

class CommentService {
  static async add_new_comment(body) {
    var projectComment = new ProjectComment({ project_id: body.project_id });

    return new Promise(async (resolve, reject) => {
      projectComment
        .insert()
        .then((result) => {
          var commentReply = new CommentReply({
            comment_id: result.insertId,
            message: body.message,
            author_id: body.author_id,
            no_of_likes: body.no_of_likes,
            no_of_dislikes: body.no_of_dislikes,
            initial_comment: body.initial_comment,
          });

          commentReply
            .insert()
            .then((result_new) => resolve(result))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }

  static async delete_comment_thread(body) {
    var projectComment = new ProjectComment(body);

    return new Promise(async (resolve, reject) => {
      projectComment
        ._delete()
        .then((result) => {
          var commentReply = new CommentReply({
            comment_id: body.id,
            deleted_at: body.deleted_at,
          });

          commentReply
            ._delete_by_comment_id()
            .then((result_new) => resolve(result_new))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = CommentService;
