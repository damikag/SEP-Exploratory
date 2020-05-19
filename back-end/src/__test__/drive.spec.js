const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

it("Test to get folder API call", async () => {
  const response = await supertest(app).post("/drive/getfolders").send({
    id: 10024,
  });
  expect(response.status).toBe(200);
});

it("public files folders exist ?", async () => {
  const response = await supertest(app)
    .post("/drive/getfiles")
    // .set("Authorization", "Bearer " + process.env.TOKEN_SECRET)
    .send({
      id: 10024,
      folder: "Public Files",
    });
  expect(response.status).toBe(200);
});

it("Related Images folders exist ?", async () => {
  const response = await supertest(app)
    .post("/drive/getfiles")

    // .set("Authorization", "Bearer " + process.env.TOKEN_SECRET)
    .send({
      id: 10024,
      folder: "Related Images",
    });
  expect(response.status).toBe(200);
});

it("Final Paper folders exist ?", async () => {
  const response = await supertest(app).post("/drive/getfiles").send({
    id: 10024,
    folder: "Final Paper",
  });
  expect(response.status).toBe(200);
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
