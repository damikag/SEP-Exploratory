const supertest = require("supertest");
const app = require("../../app").app;
const mongoose = require("mongoose");
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZEAxMjMuY29tIiwiaWF0IjoxNTkwOTA3OTAyfQ.6PQFkImlidx5F_0uOCkkOipYVweRqmq4p5SxRpUwR4g"
beforeAll((done) => {
  done();
});

it("Test to get documents API call", async () => {
  const response = await supertest(app)
  .post("/editor/getblogs")
  .send({
    group: 10024
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
});


it("Test to search for documents API call", async () => {
    const response = await supertest(app)
    .post("/editor/searchblog")
    .send({
      group: 10024,
      name:"Corona and Mental Health"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(200);
  });

it("Test to get specific document API call", async () => {
    const response = await supertest(app)
    .post("/editor/getpost")
    .send({
      postId:"5ec959c37c359a2860e280d2"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(200);
  });


 


