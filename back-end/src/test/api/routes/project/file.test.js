const supertest = require("supertest");
const { app } = require("../../../../app");

test("9.1 reteive image file", async (done) => {
  const response = await supertest(app)
    .post("/project/retrieve-file")
    .send({ file: "22-1590763932751-751-95601.png" });

  expect(response.status).toBe(200);
  done();
});

test("10.1 Insert image file to database", async (done) => {
  const response = await supertest(app)
    .post("/project/insert-image-files")
    .send({
      project_id: 100,
      images: [
        "22-1590764079885-885-41606.jpg",
        "22-1590764079885-885-34335.jpg",
      ],
    });

  expect(response.status).toBe(200);
  done();
});

test("11.1 delete final paper", async (done) => {
  const response = await supertest(app)
    .post("/project/remove-final-paper")
    .send({
      project_id: 100,
    });

  expect(response.status).toBe(200);
  done();
});
