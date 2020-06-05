const projectService = require("../../../service/project/ProjectService");

let body = {
  title: "Test project",
  description: "This is the test project description",
  creator: 10001,
  visibility_public: 0,
  collaborators: [10001, 10002, 10004],
  tags: [10001, 10002],
};

var insertId = 150;

test("1. Create project", async (done) => {
  await projectService.createProject(body).then((res) => {
    insertId = res.insertId;
    expect(res.insertId).toBeGreaterThanOrEqual(1);
  });
  done();
});

test("2. project details match", async (done) => {
  await projectService.getProject({ id: insertId }).then((res) => {
    var project_details = res.project_details;
    expect(project_details.collaborators.length).toBeGreaterThanOrEqual(1);
    expect(project_details.tags.length).toBeGreaterThanOrEqual(1);
    expect(project_details.project).not.toBe(false);
  });
  done();
});

test("3. Delete project", async (done) => {
  await projectService.softDeleteProject({ project_id: 2 }).then((res) => {
    expect(res).toBe(true);
  });
  done();
});
