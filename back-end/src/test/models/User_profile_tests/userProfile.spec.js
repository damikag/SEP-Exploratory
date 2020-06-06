const request = require("supertest");
const { app } = require("../../../app");
const mongoose = require("mongoose");

beforeAll((done) => {
  done();
});

describe("User profile Endpoints", () => {
  it("should fetch user profile for the given id ", async () => {
    const id = 10001;
    const res = await request(app).get(`/userprofile/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch user projects for a given user id ", async () => {
    const id = 10001;
    const res = await request(app).get(`/userprofile/projects/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should fetch institutions to edit user profile details ", async () => {
    const res = await request(app).get(`/userprofile/edit/institutions`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(1);
  });

  it("should update user profile details", async () => {
    const res = await request(app).patch("/userprofile/edit").send({
        first_name:"John",
        last_name:"Starck",
        contact_no:"0711234567",
        institution:10001,
        profession:"tester",
        description:"Lorem ipsum",
        linkedIn:"",
        twitter:"",
        updated_at:"2020-06-05",
        researcher_id:10001,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Profile updated successfully");
  });
});

afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
