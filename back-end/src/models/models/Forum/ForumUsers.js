const db = require("../../../db/db");

module.exports = {
  getForumUsers: (callBack) => {
    db.query(
      "SELECT r.id, r.first_name, r.last_name, r.profile_picture, COUNT(DISTINCT fq.id) as question_count, COUNT(DISTINCT fa.id) as answer_count FROM forum_question as fq RIGHT OUTER JOIN researcher as r ON r.id = fq.researcher_id AND fq.is_visible=1 LEFT OUTER JOIN forum_answer as fa ON r.id = fa.researcher_id AND fa.is_visible=1 GROUP BY r.id",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getFreqUsers: (callBack) => {
    db.query(
      "SELECT r.id, r.first_name, r.last_name, r.profile_picture, COUNT(DISTINCT fq.id) as question_count, COUNT(DISTINCT fa.id) as answer_count FROM researcher as r JOIN forum_question as fq ON r.id = fq.researcher_id AND fq.is_visible=1 left outer JOIN forum_answer as fa ON r.id = fa.researcher_id AND fa.is_visible=1 GROUP BY r.id ORDER BY question_count DESC ,answer_count DESC LIMIT 0,10",
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
