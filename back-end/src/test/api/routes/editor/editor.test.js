const supertest = require("supertest");
const app = require("../../../../app").app;
const mongoose = require("mongoose");
//const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZEAxMjMuY29tIiwiaWF0IjoxNTkxMzYyNjk2fQ.hkki9ybqa6Ie6AiVmU4FBOgB8pxrk5eblY8PtXczBCM"
const wrong_token="absfh3567yhgtfbhuji8"
const { editorBlog_validation } = require('./validation')

expect.extend({
	checkResult(res) {

		var pass = true
		var errMessge = ""
		try {
			const { error } = editorBlog_validation(res)
			if (error) {
				errMessge = error.details[0].message
				pass = false
			}
		}
		catch (error) {
			console.log(error)
			pass = false
		}

		if (pass) {
			return { message: () => `expected not to be a result object`, pass: true, };
		} else {
			return { message: () => errMessge, pass: false, };
		}

	},
});

beforeAll(async(done) => {
  var login_entry = await supertest(app)
    .post("/login")
    .send({ email: "mad@123.com", password: "123456" });
  token = JSON.parse(login_entry.text).token;
  done();
});

it("Test to get documents API call", async () => {
  const response = await supertest(app)
  .post("/editor/getblogs")
  .send({
    group: "10024"
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
  expect(response.res.text).checkResult();
});

it("Test to get empty array on get documents API call", async () => {
  const response = await supertest(app)
  .post("/editor/getblogs")
  .send({
    group: "100249"
  })
  .set({ Authorization: token })
  .expect(200)
  .expect({
    success: true,
    blogs: []
  })

});

it("Test to get documents API call with a wrong token", async () => {
  const response = await supertest(app)
  .post("/editor/getblogs")
  .send({
    group: "10024"
  })
  .set({ Authorization: wrong_token });

  expect(response.status).toBe(403);
});

it("Test to search for documents API call", async () => {
    const response = await supertest(app)
    .post("/editor/searchblog")
    .send({
      group: "10024",
      name:"Corona and Mental Health"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(200);
    expect(response.res.text).checkResult();

  });

it("Test to get empty array on search for documents API call", async () => {
    const response = await supertest(app)
    .post("/editor/searchblog")
    .send({
      group: "10024",
      name:"Corona and physical Health"
    })
    .set({ Authorization: token })
    .expect(200)
    .expect({
      success: true,
      blogs: []
    })

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

/*
it("Test to verify creation of document", async () => {
    const response = await supertest(app)
    .post("/editor/createpost")
    .send({
      name:"Aragorn The son of Arathorn",
      group:"10012",
      content:"<p>My first test document. Here lies the power of Anduin. The sword once broken and came into the hands of one and only heir of Gondor; the Elessar</p>"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(200);
  });

it("Test to verify soft deletion of document ", async () => {
    const response = await supertest(app)
    .post("/editor/softdeletepost")
    .send({
      postId:"5ecd213f9315bf1228adfee1"
    })
    .set({ Authorization: token })
    .expect(200)
    .expect({
      success: true
    })
  });

it("Test to verify deletion of document ", async () => {
    const response = await supertest(app)
    .post("/editor/deletepost")
    .send({
      postId:"5ecd1a489315bf1228adfede"
    })
    .set({ Authorization: token })
    .expect(200)
    .expect({
      success: true
    })
  });
*/
it("Test to verify document with correct group and correct postId ", async () => {
    const response = await supertest(app)
    .post("/editor/findpost")
    .send({
      postId:"5ec659f89e036b05e01585f5",
      group:"10012"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(200);
  });

it("Test to verify document with incorrect group and correct postId", async () => {
    const response = await supertest(app)
    .post("/editor/findpost")
    .send({
      postId:"5ec659f89e036b05e01585f5",
      group:"10023"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(404);
  });

it("Test to verify document with incorrect group and incorrect postId", async () => {
    const response = await supertest(app)
    .post("/editor/findpost")
    .send({
      postId:"5ec659f89e036b05e01585fo5",
      group:"10025"
    })
    .set({ Authorization: token });
  
    expect(response.status).toBe(404);
  });

afterAll(async (done) => {
    mongoose.connection.close(() => {
        done();
    });
});
  


 


