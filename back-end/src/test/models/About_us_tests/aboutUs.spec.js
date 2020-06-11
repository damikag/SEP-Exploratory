const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("About Us page Endpoints", () => {
  it("should create a user message", async () => {
    const res = await request(app).post("/aboutus/addmessage").send({
      category_id: 1,
      name: "tester 1",
      email: "tester1@gmail.com",
      message: "test is fine",
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
