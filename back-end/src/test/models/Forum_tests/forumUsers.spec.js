const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("Forum Users Endpoints", () => {
  it("should fetch all forum users", async () => {
    const res = await request(app).get("/forum/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch all frequent users", async () => {
    const res = await request(app).get("/forum/frequsers");
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
