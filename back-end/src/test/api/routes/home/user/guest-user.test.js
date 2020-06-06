const supertest = require("supertest");
const { app } = require("../../../../../app");

var user_id;
var valid_entry;

var user = {
  email: `test${Math.floor(Math.random() * 20000) + 100}@gmail.com`,
  password: "123456@",
  first_name: "Test",
  last_name: "User",
};

beforeAll(async (done) => {
  valid_entry = await supertest(app).post("/temp-register").send(user);
  user_id = JSON.parse(valid_entry.text).inserted_id;
  done();
});

test("1.0 register a valid entry", async (done) => {
  expect(valid_entry.status).toBe(200);
  done();
});

test("1.1 register using duplicate entry", async (done) => {
  const response = await supertest(app).post("/temp-register").send(user);
  expect(response.status).toBe(401);
  done();
});

test("1.2 register using invalid email", async (done) => {
  var invalid_email = Object.assign({}, user);
  invalid_email["email"] = "test.com";
  const response = await supertest(app)
    .post("/temp-register")
    .send(invalid_email);
  expect(response.status).toBe(400);
  done();
});

test("1.3 register using weak password", async (done) => {
  var invalid_password = Object.assign({}, user);
  invalid_password["password"] = "12345";
  const response = await supertest(app)
    .post("/temp-register")
    .send(invalid_password);
  expect(response.status).toBe(400);
  done();
});

test("2.0 confirm email", async (done) => {
  const response = await supertest(app).post("/register").send({ id: user_id });
  expect(response.status).toBe(200);
  done();
});

test("3.0 login user with correct credentials", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: user.email, password: user.password });

  expect(response.status).toBe(200);

  await supertest(app)
    .post("/logout")
    .send({})
    .set("Authorization", "Bearer " + JSON.parse(response.text).token);
  done();
});

test("3.1 login user with invalid password", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: user.email, password: "12345" });
  expect(response.status).toBe(406);
  done();
});

test("3.2 login user with invalid email", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: "test7.gmail.com", password: "123456@" });
  expect(response.status).toBe(406);
  done();
});

test("3.3 login user with invalid email", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: "test7.gmail.com", password: "123456@" });
  expect(response.status).toBe(406);
  done();
});

test("3.4 login user with valid but incorrect password", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: "test7@gmail.com", password: "1234567@" });
  expect(response.status).toBe(401);
  done();
});

test("3.5 login user with valid but incorrect email", async (done) => {
  const response = await supertest(app)
    .post("/login")
    .send({ email: "testkl@gmail.com", password: "123456@" });
  expect(response.status).toBe(404);
  done();
});
