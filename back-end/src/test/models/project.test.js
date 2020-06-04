const Project = require("../../models/models/Project");

let project_id = 1;

test("01. Upload final paper ", async (done) => {
  var project = new Project({ final_paper: `${project_id}.pdf` });
  await project
    .upload_final_paper(project_id)
    .then((res) => expect(res.changedRows).toBe(1))
    .catch((err) => expect(err.response).toBe(err.response));
  done();
});
