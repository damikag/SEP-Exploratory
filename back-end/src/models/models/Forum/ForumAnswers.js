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
};
