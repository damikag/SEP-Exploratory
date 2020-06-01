const supertest = require("supertest");
const app = require("../../app").app;
const mongoose = require("mongoose");
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZEAxMjMuY29tIiwiaWF0IjoxNTkwOTA3OTAyfQ.6PQFkImlidx5F_0uOCkkOipYVweRqmq4p5SxRpUwR4g"
beforeAll((done) => {
  done();
});

it("Test to get folder API call", async () => {
  const response = await supertest(app)
  .post("/drive/getfolders")
  .send({
    group: 10024,
    folder:'root'
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});

it("Test to get group files API call", async () => {
  const response = await supertest(app)
  .post("/drive/getfiles")
  .send({
    group: 10024,
    folder:'root'
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});

it("Test to get public files API call", async () => {
  const response = await supertest(app)
  .post("/drive/getpublicfiles")
  .send({
    group: 10024
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});

it("Test to search files API call", async () => {
  const response = await supertest(app)
  .post("/drive/searchfile")
  .send({
    group: 10024,
    folder:'5ec95d187c359a2860e280d4',
    name:"songs.txt"
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});

it("Test to get text files API call", async () => {
  const response = await supertest(app)
  .post("/drive/gettxtfiles")
  .send({
    group: 10024
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});

it("Test to read text files API call", async () => {
  const response = await supertest(app)
  .post("/drive/readtxtfile")
  .send({
    filename: "438463dc188dd39caf36789f45110ecd.txt"
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});
/*
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

// it("Related Images folders exist ?", async () => {
//   const response = await supertest(app)
//     .post("/drive/getfiles")

//     // .set("Authorization", "Bearer " + process.env.TOKEN_SECRET)
//     .send({
//       id: 10024,
//       folder: "Related Images",
//     });
//   expect(response.status).toBe(200);
// });

it("Final Paper folders exist ?", async () => {
  const response = await supertest(app).post("/drive/getfiles").send({
    id: 10024,
    folder: "Final Paper",
  });
  expect(response.status).toBe(200);
});
*/
afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
