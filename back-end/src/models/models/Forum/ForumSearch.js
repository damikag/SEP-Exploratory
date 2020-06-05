const db = require("../../../db/db");

module.exports = {
    getQuestionsOnSearch: (data, callBack) => {
        db.query(
          "SELECT first_name,last_name,researcher_id,Q_created_at,category_name,forum_question.id AS question_id,title,forum_question.description,profile_picture,like_count FROM forum_question,researcher,question_category WHERE (MATCH(forum_question.title,forum_question.description) AGAINST(? IN NATURAL LANGUAGE MODE) OR MATCH(question_category.category_name) AGAINST(? IN NATURAL LANGUAGE MODE)) AND forum_question.category_id=question_category.id AND forum_question.researcher_id=researcher.id AND is_visible=1 ORDER BY question_id DESC;",
          [data.searchString,data.searchString],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
}