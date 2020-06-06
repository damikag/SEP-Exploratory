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
      "SELECT first_name,last_name,researcher_id,Q_created_at,category_name,forum_question.id AS question_id,title,forum_question.description,profile_picture,like_count FROM forum_question,researcher,question_category WHERE forum_question.category_id=question_category.id AND forum_question.researcher_id=researcher.id AND is_visible=1 ORDER BY question_id DESC;",
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPopularQuestions: (callBack) => {
    db.query(
      "SELECT first_name,last_name,profile_picture,forum_question.title As title FROM researcher,forum_question WHERE forum_question.researcher_id=researcher.id AND forum_question.is_visible =1 ORDER BY forum_question.like_count DESC LIMIT 0,10;",
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

  editQuestion: (data, callBack) => {
    db.query(
      "UPDATE forum_question SET title = ?, description = ?, Q_updated_at = ? WHERE id = ?",
      [data.title, data.description, data.updated_at, data.question_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  likeQuestion: (data, callBack) => {
    connection.beginTransaction(function (err) {
      if (err) {
        //Transaction Error (Rollback and release connection)
        connection.rollback(function () {
          return callBack(err);
          //Failure
        });
      } else {
        connection.query(
          "INSERT INTO question_rating(question_id, researcher_id) VALUES (?, ?);",
          [data.question_id, data.researcher_id],
          function (err, results) {
            if (err) {
              //Query Error (Rollback and release connection)
              connection.rollback(function () {
                return callBack(err);
                //Failure
              });
            } else {
              connection.query(
                "UPDATE forum_question SET like_count=like_count+1 WHERE id=?",
                [data.question_id],
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
                          //Failure
                        });
                      } else {
                        return callBack(null,results);
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

  // unlikeQuestion: (data, callBack) => {
  //   connection.beginTransaction(function (err) {
  //     if (err) {
  //       //Transaction Error (Rollback and release connection)
  //       connection.rollback(function () {
  //         return callBack(err);
  //         //Failure
  //       });
  //     } else {
  //       connection.query(
  //         "UPDATE question_rating SET is_rating=0 WHERE question_id = ? AND researcher_id = ?;",
  //         [data.question_id, data.researcher_id],
  //         function (err, results) {
  //           if (err) {
  //             //Query Error (Rollback and release connection)
  //             connection.rollback(function () {
  //               return callBack(err);
  //               //Failure
  //             });
  //           } else {
  //             connection.query(
  //               "UPDATE forum_question SET like_count=like_count-1 WHERE id=?",
  //               [data.question_id],
  //               function (err, results) {
  //                 if (err) {
  //                   //Query Error (Rollback and release connection)
  //                   connection.rollback(function () {
  //                     return callBack(err);
  //                     console.log(err);
  //                     //Failure
  //                   });
  //                 } else {
  //                   connection.commit(function (err) {
  //                     if (err) {
  //                       connection.rollback(function () {
  //                         return callBack(err);
  //                         //Failure
  //                       });
  //                     } else {
  //                       return callBack(null,results);
  //                       //Success
  //                     }
  //                   });
  //                 }
  //               }
  //             );
  //           }
  //         }
  //       );
  //     }
  //   });
  // },

  getQuestionLikes: (callBack) => {
    db.query(
      "SELECT * FROM question_rating",
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
