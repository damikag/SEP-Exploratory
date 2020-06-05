const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Forum Answer Endpoints", () => {

  it("should fetch all answers", async () => {
    const res = await request(app).get("/forum/answers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all popular answers", async () => {
    const res = await request(app).get("/forum/popularanswers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all question likes", async () => {
    const res = await request(app).get("/forum/answerlikes");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should create a new answer", async () => {
    const res = await request(app).post("/forum/addanswer").send({
      question_id: 1,
      answer: "test is cool",
      researcher_id: 10001,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  // it("should not create a new answer", async () => {
  //   const res = await request(app).post("/forum/addanswer").send({
  //     question_id: 10001,
  //     answer: "test is cool",
  //     researcher_id: 10001,
  //   });
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body.success).toEqual(0);
  // });


  it("should delete a answer", async () => {
    const res = await request(app).patch("/forum/deleteanswer").send({
      deleted_at: "2020-06-05",
      answer_id: 10001,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Answer deleted successfully");
  });

  it("should edit an answer", async () => {
    const res = await request(app).patch("/forum/editanswer").send({
      answer: "test is cool",
      answer_id: 10001,
      updated_at: "2020-06-05",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Answer updated successfully");
  });

  it("should like an answer", async () => {
    const res = await request(app).post("/forum/likeanswer").send({
      question_id: 1,
      researcher_id: 10001,
      answer_id:1
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });
 });

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});