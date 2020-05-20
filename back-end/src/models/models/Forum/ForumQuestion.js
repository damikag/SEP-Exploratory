const db = require("../../../db/db");

module.exports = {
  getQuestionCategory: (callBack) => {
    db.query(
      "SELECT * FROM question_category",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getQuestions: (callBack) => {
    db.query(
      "SELECT first_name,last_name,researcher_id,Q_created_at,category_name,forum_question.id AS question_id,title,forum_question.description,profile_picture FROM forum_question,researcher,question_category WHERE forum_question.category_id=question_category.id AND forum_question.researcher_id=researcher.id AND is_visible=1 ORDER BY question_id DESC;",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addQuestion: (data, callBack) => {
    db.query(
      "INSERT INTO forum_question(title, description, category_id, researcher_id, Q_created_at, Q_updated_at) VALUES (?,?,?,?,?,?)",
      [
        data.title,
        data.description,
        data.category_id,
        data.researcher_id,
        data.created_at,
        data.created_at,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteQuestion: (data, callBack) => {
    db.query(
      "UPDATE forum_question SET is_visible = 0, Q_deleted_at = ? WHERE id=?",
      [data.deleted_at, data.question_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
