const db = require("../../../db/db");

module.exports = {
  getTasksByProjectId: (id, callBack) => {
    db.query(
      "SELECT task.id AS id,title,task.description,researcher.id AS aId, researcher.first_name AS first_name,researcher.last_name AS last_name,start_date,end_date,progress,remark,task.created_at from task,researcher WHERE task.assigned_to=researcher.id AND task.is_visible=1 AND project_id=?;",
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addTask: (data, callBack) => {
    db.query(
      "INSERT INTO task(title, description, assigned_to, start_date, end_date, progress, remark, creator_id, project_id, created_at, updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.title,
        data.description,
        data.assigned_to,
        data.start_date,
        data.end_date,
        data.progress,
        data.remark,
        data.creator_id,
        data.project_id,
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

  deleteTask: (data, callBack) => {
    db.query(
      "UPDATE task SET is_visible = 0, deleted_at = ? WHERE id=? AND project_id=?",
      [data.deleted_at, data.task_id, data.project_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  editTask: (data, callBack) => {
    db.query(
      "UPDATE task SET title = ?, description=?, assigned_to=?,start_date=?, end_date=?,progress=?, remark=? ,updated_at = ? WHERE id = ? AND project_id= ?",
      [
        data.title,
        data.description,
        data.assigned_to,
        data.start_date,
        data.end_date,
        data.progress,
        data.remark,
        data.updated_at,
        data.task_id,
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
