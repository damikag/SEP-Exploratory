const projectService = require("../service/project/ProjectService");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("...test project services...", () => {
  test("1. Project Exist", async () => {
    var response = projectService.getProject({ id: 10024 }).then((res) => {
      var project = res.project_details;
      expect(project.project).not.toBe(false);
    });
  });

  test("1. Collaborators exists", async () => {
    var response = projectService.getProject({ id: 10024 }).then((res) => {
      var project = res.project_details;
      expect(project.collaborators).not.toBe(false);
    });
  });

  test("1. Admins exists", async () => {
    var response = projectService.getProject({ id: 10024 }).then((res) => {
      var project = res.project_details;
      expect(project.admins).not.toBe(false);
    });
  });

  test("1. Tags exists", async () => {
    var response = projectService.getProject({ id: 10024 }).then((res) => {
      var project = res.project_details;
      expect(project.tags).not.toBe(false);
    });
  });

  test("1. Comments exists", async () => {
    var response = projectService.getProject({ id: 10024 }).then((res) => {
      var project = res.project_details;
      expect(project.comments).not.toBe(false);
    });
  });
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
