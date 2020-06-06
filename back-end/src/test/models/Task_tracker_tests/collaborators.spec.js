const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Task tracker collaborators Endpoints", () => {
  it("should fetch collaborators for a given project id ", async () => {
    const id = 10001;
    const res = await request(app).get(`/project/tasktracker/collaborators/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
