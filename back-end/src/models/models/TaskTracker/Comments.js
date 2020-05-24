const db = require("../../../db/db");

module.exports = {
  getCommentsByProjectId: (id, callBack) => {
    db.query(
      "SELECT task_comment.id AS comment_id,comment,commentor_id,researcher.first_name,researcher.last_name,researcher.profile_picture,task_comment.updated_at FROM researcher,task_comment WHERE researcher.id=task_comment.commentor_id AND task_comment.is_visible=1 AND project_id=?;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addComment: (data, callBack) => {
    db.query(
      "INSERT INTO task_comment(project_id, comment, commentor_id, created_at, updated_at) VALUES (?,?,?,?,?)",
      [
        data.project_id,
        data.comment,
        data.commentor_id,
        data.created_at,
        data.updated_at,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteComment: (data, callBack) => {
    db.query(
      "UPDATE task_comment SET is_visible = 0, deleted_at = ? WHERE id=? AND project_id=?",
      [data.deleted_at, data.comment_id, data.project_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editComment: (data, callBack) => {
    db.query(
      "UPDATE task_comment SET comment = ?, updated_at = ? WHERE id = ? AND project_id= ?",
      [
        data.comment,
        data.updated_at,
        data.comment_id,
        data.project_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
