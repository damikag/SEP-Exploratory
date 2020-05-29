const projectService = require("../../service/project/ProjectService");
const mongoose = require("mongoose");
let body = {
  title: "Test project",
  description: "This is the test project description",
  creator: 10001,
  collaborators: [10001, 10002, 10004],
  tags: [10001, 10002],
};

let insertId = 6;

beforeAll((done) => {
  done();
});

describe("...test project services...", () => {
  test("1. Create project", async () => {
    var response = await projectService
      .createProject(body)
      .then((res) => {
        insertId = res.insertId;
        expect(res.insertId).toBeGreaterThanOrEqual(1);
      })
      .catch(async (err) => {
        await console.log(err);
        expect(err).not.toBe(false);
      });
  });

  describe("2. Project Exist", () => {
    test("2.1. Project details match", async () => {
      await projectService
        .getProject({ id: insertId })
        .then((res) => {
          var project_details = res.project_details;
          expect(project_details.collaborators.length).toBeGreaterThanOrEqual(
            1
          );
          expect(project_details.tags.length).toBeGreaterThanOrEqual(1);
          expect(project_details.project).not.toBe(false);
        })
        .catch((err) => {
          expect(err.response).not.toBe(false);
        });
    });
  });

  test("3. Delete project", async () => {
    var response = await projectService
      .softDeleteProject({ project_id: 2 })
      .then((res) => {
        expect(res).toBe(true);
      })
      .catch((err) => {
        expect(err.response).toBe(false);
      });
  });
});

afterAll(async (done) => {
  mongoose.connection.close(() => {
    done();
  });
});
