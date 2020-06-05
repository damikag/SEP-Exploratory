const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Task tracker tasks Endpoints", () => {
  it("should fetch tasks for a given project id ", async () => {
    const id = 10001;
    const res = await request(app).get(`/project/tasktracker/tasks/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });
});

it("should create a new task", async () => {
  const res = await request(app).post("/project/tasktracker/addtask").send({
    title: "Exploratory",
    description: "Lorem ipsum",
    assigned_to: 10001,
    start_date: "2020-06-05",
    end_date: "2020-06-10",
    progress: "Not Started",
    remark: "test remark",
    creator_id: 10002,
    project_id: 10011,
    created_at: "2020-06-10",
    updated_at: "2020-06-10",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(1);
});

it("should delete a task", async () => {
  const res = await request(app).patch("/project/tasktracker/deletetask").send({
    deleted_at: "2020-06-05",
    task_id: 1,
    project_id: 10001,
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("task deleted successfully");
});

it("should edit a task", async () => {
  const res = await request(app).patch("/project/tasktracker/edittask").send({
    title: "Exploratory",
    description: "Lorem ipsum",
    assigned_to: 10001,
    start_date: "2020-06-05",
    end_date: "2020-06-10",
    progress: "Completed",
    remark: "test remark",
    updated_at: "2020-06-10",
    task_id: 1,
    project_id: 10001,
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Task updated successfully");
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
