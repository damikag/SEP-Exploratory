const supertest = require("supertest");
const { app } = require("../../../../app");
const {
  project_view_validation,
  project_row_view_validation,
} = require("./validation");

let body = {
  title: "Test project",
  description: "This is the test project description",
  creator: 10001, // admin
  collaborators: [10001, 10002, 10003],
  tags: [10001, 10002],
};

let update_body = {
  id: 10022,
  title: "Test project",
  description: "This is the test project description",
  abstract: "This is test abstract",
  visibility_public: 0,
  collaborators: [{ id: 10002 }, { id: 10004 }],
  tags: [{ tag_id: 10001 }, { tag_id: 10002 }],
};

var project_id;

describe("Project testing", () => {
  beforeAll(async (done) => {
    var response = await supertest(app)
      .post("/project/create-project")
      .send(body);
    project_id = JSON.parse(response.text).insertId;
    done();
  });

  test("1.1 create project - correct input", async (done) => {
    console.log(project_id);
    const response = await supertest(app)
      .post("/project/create-project")
      .send(body);

    expect(response.status).toBe(200);
    done();
  });

  test("1.2 create project - creator not in collaborators", async (done) => {
    body.collaborators = [10002, 10004];
    const response = await supertest(app)
      .post("/project/create-project")
      .send(body);

    expect(response.status).toBe(400);
    done();
  });

  test("2.1 view-project", async (done) => {
    const response = await supertest(app)
      .post("/project/view-project")
      .send({ id: project_id });

    expect(response.status).toBe(200);
    expect(response.project_details).checkProjectViewResult();
    done();
  });

  test("3.1 is project exist - valid project id", async (done) => {
    const response = await supertest(app)
      .post("/project/is-exist-project")
      .send({ project_id: project_id });

    expect(response.status).toBe(200);
    expect(response).not.toBeFalsy();
    done();
  });

  test("3.2 is project exist - invalid project id", async (done) => {
    const response = await supertest(app)
      .post("/project/is-exist-project")
      .send({ project_id: 10000000000 });

    expect(response.status).toBe(200);
    expect(response.text).toBe("false");
    done();
  });

  test("4.1 update project - correct input", async (done) => {
    const response = await supertest(app)
      .post("/project/update-project")
      .send(update_body);

    expect(response.status).toBe(200);
    done();
  });

  test("4.2 update project - admin added as a collaborator", async (done) => {
    update_body["collaborators"] = [
      { id: 10001 },
      { id: 10002 },
      { id: 10004 },
    ];
    const response = await supertest(app)
      .post("/project/update-project")
      .send(update_body);

    expect(response.status).toBe(500);
    done();
  });

  test("6.1 get all tags project", async (done) => {
    const response = await supertest(app)
      .post("/project/get-all-tags")
      .send({ project_id: project_id });

    expect(response.status).toBe(200);
    done();
  });

  test("7.1 get all collaborators", async (done) => {
    const response = await supertest(app)
      .post("/project/get-collaborators")
      .send({ project_id: project_id });

    expect(response.status).toBe(200);
    done();
  });

  test("8.1 get all collaborators ids", async (done) => {
    const response = await supertest(app)
      .post("/project/get-collaborator-ids")
      .send({ project_id: project_id });

    expect(response.status).toBe(200);
    done();
  });

  test("5.1 delete project", async (done) => {
    const response = await supertest(app)
      .post("/project/delete-project")
      .send({ project_id: project_id - 1 });

    expect(response.status).toBe(200);
    done();
  });

  expect.extend({
    checkProjectViewResult(result) {
      var pass = true;
      var errMessge = "";
      try {
        const { error } = project_view_validation(result);
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
          message: () => `expected to match the incoming row matches view row`,
          pass: true,
        };
      } else {
        return { message: () => errMessge, pass: false };
      }
    },
  });
});
