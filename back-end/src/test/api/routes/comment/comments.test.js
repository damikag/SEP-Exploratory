const supertest = require("supertest");
const { app } = require("../../../../app");
const { comment_view_validation } = require("./validation");

let new_comment = {
  project_id: 100,
  message: "This is a opening comment",
  author_id: 10001,
  no_of_likes: 0,
  no_of_dislikes: 0,
  initial_comment: 1,
};

let reply_comment = {
  message: "This is a reply",
  author_id: 10001,
  no_of_likes: 0,
  no_of_dislikes: 0,
  initial_comment: 0,
};

var comment_id;

beforeAll(async (done) => {
  const response = await supertest(app)
    .post("/project/comments/new-comment")
    .send(new_comment);

  comment_id = JSON.parse(response.text).insertId;
  done();
});

test("1.1 start new comment thread", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/new-comment")
    .send(new_comment);

  expect(response.status).toBe(200);
  done();
});

test("2.1 reply to a comment", async (done) => {
  reply_comment["comment_id"] = comment_id;
  const response = await supertest(app)
    .post("/project/comments/reply-comment")
    .send(reply_comment);

  expect(response.status).toBe(200);
  done();
});

test("3.1 edit comment", async (done) => {
  reply_comment["message"] = "Edited Message";
  reply_comment["id"] = 10001;
  const response = await supertest(app)
    .post("/project/comments/edit-reply")
    .send(reply_comment);

  expect(response.status).toBe(200);
  done();
});

test("4.1 delete whole comment thread", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/delete-comment")
    .send({ id: comment_id - 1 });

  expect(response.status).toBe(200);
  done();
});

test("4.1 delete reply", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/delete-reply")
    .send({ id: 10001 });

  expect(response.status).toBe(200);
  done();
});

test("5.1 like comment", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/like-comment")
    .send({ reply_id: 10003, count: 5 });

  expect(response.status).toBe(200);
  done();
});

test("6.1 dis-like comment", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/dislike-comment")
    .send({ reply_id: 10003, count: 5 });

  expect(response.status).toBe(200);
  done();
});

test("7.1 view comment heads", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/view-comments")
    .send({ id: 25 }); // project id should be provided

  expect(response.status).toBe(200);
  expect(response[0]).checkCommentViewResult();
  done();
});

test("8.1 view comment therad replies", async (done) => {
  const response = await supertest(app)
    .post("/project/comments/view-replies")
    .send({ id: comment_id });

  expect(response.status).toBe(200);
  expect(response[0]).checkCommentViewResult();
  done();
});

expect.extend({
  checkCommentViewResult(result) {
    var pass = true;
    var errMessge = "";
    try {
      const { error } = comment_view_validation(result);
      if (error) {
        errMessge = error.details[0].message;
        pass = false;
      }
    } catch (error) {
      console.log(error);
      pass = false;
    }

    if (pass) {
      return {
        message: () => `expected to be a valid comment head`,
        pass: true,
      };
    } else {
      return { message: () => errMessge, pass: false };
    }
  },
});
