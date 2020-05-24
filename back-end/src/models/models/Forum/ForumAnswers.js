const db = require("../../../db/db");

module.exports = {
  getAnswers: (callBack) => {
    db.query(
      "SELECT forum_answer.id AS answer_id,answer,question_id,researcher.id AS researcher_id,first_name,last_name,profile_picture FROM researcher,forum_question,forum_answer WHERE researcher.id=forum_answer.researcher_id AND forum_answer.question_id=forum_question.id AND forum_answer.is_visible=1;",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addAnswer: (data, callBack) => {
    db.query(
      "insert into forum_answer(answer, question_id, researcher_id) values (?,?,?)",
      [
          data.answer,
          data.question_id,
          data.researcher_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteAnswer: (data, callBack) => {
    db.query(
      "UPDATE forum_answer SET is_visible = 0, deleted_at = ? WHERE id=?",
      [data.deleted_at, data.answer_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editAnswer: (data, callBack) => {
    db.query(
      "UPDATE forum_answer SET answer = ?, updated_at = ? WHERE id=?",
      [
        data.answer, 
        data.updated_at,
        data.answer_id
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
