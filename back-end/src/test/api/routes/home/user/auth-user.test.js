const supertest = require("supertest");
const { app } = require("../../../../../app");

/////////////////////////////////// use a valid user here //////////////////////////////////////////

var token;

beforeAll(async (done) => {
  var login_entry = await supertest(app)
    .post("/login")
    .send({ email: "test6@gmail.com", password: "123456@" });
  token = JSON.parse(login_entry.text).token;
  done();
});

test("1.0 auth user", async (done) => {
  const response = await supertest(app)
    .get("/auth")
    .set("Authorization", "Bearer " + token);

  expect(response.status).toBe(200);
  done();
});

test("2.0 logout with token", async (done) => {
  const response = await supertest(app)
    .post("/logout")
    .send({})
    .set("Authorization", "Bearer " + token);
  expect(response.status).toBe(200);
  done();
});

test("2.1 logout without token", async (done) => {
  const response = await supertest(app).post("/logout").send({});

  expect(response.status).toBe(500);
  done();
});

test("2.2 logout with invalid token", async (done) => {
  const response = await supertest(app)
    .post("/logout")
    .send({})
    .set("Authorization", "Bearer " + process.env.TOKEN_SECRET);

  expect(response.status).toBe(403);
  done();
});
