const db = require("../../../db/db");

var mysql = require("mysql");

const db_options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

var connection = mysql.createConnection(db_options);

module.exports = {
  getAnswers: (callBack) => {
    db.query(
      "SELECT forum_answer.id AS answer_id,answer,question_id,researcher.id AS researcher_id,first_name,last_name,profile_picture,forum_answer.updated_at,forum_answer.like_count AS like_count FROM researcher,forum_question,forum_answer WHERE researcher.id=forum_answer.researcher_id AND forum_answer.question_id=forum_question.id AND forum_answer.is_visible=1;",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPopularAnswers: (callBack) => {
    db.query(
      "SELECT first_name,last_name,profile_picture,forum_question.title As question,forum_answer.answer AS answer FROM researcher,forum_question,forum_answer WHERE forum_answer.researcher_id=researcher.id AND forum_answer.question_id=forum_question.id AND forum_question.is_visible =1 AND forum_answer.is_visible=1 ORDER BY forum_answer.like_count DESC LIMIT 0,10;",
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
      [data.answer, data.question_id, data.researcher_id],
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
      [data.answer, data.updated_at, data.answer_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  likeAnswer: (data, callBack) => {
    connection.beginTransaction(function (err) {
      if (err) {
        //Transaction Error (Rollback and release connection)
        connection.rollback(function () {
          return callBack(err);
          console.log(err);
          //Failure
        });
      } else {
        connection.query(
          "INSERT INTO answer_rating(question_id, researcher_id, answer_id) VALUES (?, ?, ?);",
          [data.question_id, data.researcher_id, data.answer_id],
          function (err, results) {
            if (err) {
              //Query Error (Rollback and release connection)
              connection.rollback(function () {
                console.log(err);
                return callBack(err);
                //Failure
              });
            } else {
              connection.query(
                "UPDATE forum_answer SET like_count=like_count+1 WHERE id=? AND question_id=?;",
                [data.answer_id, data.question_id],
                function (err, results) {
                  if (err) {
                    //Query Error (Rollback and release connection)
                    connection.rollback(function () {
                      return callBack(err);
                      console.log(err);
                      //Failure
                    });
                  } else {
                    connection.commit(function (err) {
                      if (err) {
                        connection.rollback(function () {
                          return callBack(err);
                          console.log(err);
                          //Failure
                        });
                      } else {
                        return callBack(null, results);
                        //Success
                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  getAnswerLikes: (callBack) => {
    db.query(
      "SELECT * FROM answer_rating",
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
