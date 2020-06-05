const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Forum Question Endpoints", () => {
  it("should fetch all question categories", async () => {
    const res = await request(app).get("/forum/questioncategory");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all questions", async () => {
    const res = await request(app).get("/forum/questions");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all popular questions", async () => {
    const res = await request(app).get("/forum/popularquestions");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all question likes", async () => {
    const res = await request(app).get("/forum/questionlikes");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should create a new question", async () => {
    const res = await request(app).post("/forum/addquestion").send({
      category_id: 1,
      title: "test is cool",
      description: "Lorem ipsum",
      researcher_id: 10009,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  // it('should not create a new question', async () => {
  //   const res = await request(app)
  //     .post('/forum/addquestion')
  //     .send({
  //       category_id: 10001,
  //       title: 'test is cool',
  //       description: 'Lorem ipsum',
  //       researcher_id: 10009,
  //     });
  //   expect(res.statusCode).toEqual(500);
  //   expect(res.body.success).toEqual(0);
  // });

  it("should delete a question", async () => {
    const res = await request(app).patch("/forum/deletequestion").send({
      deleted_at: "2020-06-05",
      question_id: 10001,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Question deleted successfully");
  });

  it("should edit a question", async () => {
    const res = await request(app).patch("/forum/editquestion").send({
      title: "test is cool",
      description: "Lorem ipsum",
      question_id: 10001,
      updated_at: "2020-06-05",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Question updated successfully");
  });

  it("should like a question", async () => {
    const res = await request(app).post("/forum/likequestion").send({
      question_id: 1,
      researcher_id: 10001,
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
