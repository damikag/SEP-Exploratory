const Project = require("../../models/models/Project");

describe("...test project services...", () => {
  let project_id = 2;

  beforeAll((done) => {
    done();
  });

  test("01. Upload final paper ", () => {
    var project = new Project({ final_paper: `${project_id}.pdf` });

    project
      .upload_final_paper(project_id)
      .then((res) => expect(res.changedRows).toBe(1))
      .catch((err) => expect(err.response).toBe(err.response));
  });

  afterAll((done) => {
    mongoose.connection.close(() => {
      done();
    });
  });
});
