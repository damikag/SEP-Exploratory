var supertest = require("supertest");
var { app } = require("../../src/app");

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

test("1.0 test home route", async (done) => {
  const response = await supertest(app).get("/");
  expect(response.status).toBe(302);
  done();
});

test("2.0 leave room", async (done) => {
  const response = await supertest(app).post("/leave").send();
  expect(response.status).toBe(302);
  done();
});

test("3.0 join room", async (done) => {
  const response = await supertest(app).post("/join").send({
    room: 23,
    user_id: 10001,
    token: "dhdsgajdg123456",
    name: "Test",
    email: "User",
  });
  expect(response.status).toBe(200);
  done();
});

// /
// /:room&:token&:user_id
// /leave
// /join
