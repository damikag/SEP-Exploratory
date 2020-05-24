const Project = require("../../models/models/Project");

describe("...test project services...", () => {
  beforeAll((done) => {
    // let project = new Project({ id: 10024 });
    done();
  });
  test("01. create project testing", () => {
    let project = new Project({ id: 10024 });
    project
      .find_by_id()
      .then((result) => {
        expect(result).not.toBe(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });

  test("01. create project testing", () => {
    let project = new Project({ id: 10024 });
    project
      .find_by_id()
      .then((result) => {
        expect(result).not.toBe(false);
      })
      .catch((e) => {
        console.log(e.message);
      });
  });
});
