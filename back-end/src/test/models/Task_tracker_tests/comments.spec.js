const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Task tracker comments Endpoints", () => {
  it("should fetch comments for a given project id ", async () => {
    const id = 10001;
    const res = await request(app).get(`/project/tasktracker/comments/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });
});

it("should create a new comment", async () => {
  const res = await request(app).post("/project/tasktracker/addcomment").send({
    project_id: 10001,
    comment: "Lorem ipsum",
    commentor_id: 10002,
    created_at: "2020-06-10",
    updated_at: "2020-06-10",
  });
  expect(res.statusCode).toEqual(200);
  expect(res.body.success).toEqual(1);
});

it("should delete a comment", async () => {
  const res = await request(app)
    .patch("/project/tasktracker/deletecomment")
    .send({
      deleted_at: "2020-06-05",
      comment_id: 10001,
      project_id: 10001,
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Comment deleted successfully");
});

it("should edit a comment", async () => {
  const res = await request(app)
    .patch("/project/tasktracker/editcomment")
    .send({
      comment: "Lorem ipsum",
      updated_at: "2020-06-10",
      comment_id: 10001,
      project_id: 10001,
    });
  expect(res.statusCode).toEqual(200);
  expect(res.body.message).toEqual("Comment updated successfully");
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
