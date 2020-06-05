const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Forum Search Endpoints", () => {
  it("should search a string", async () => {
    const res = await request(app).post("/forum/search/questions").send({
      searchString: "test",
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
