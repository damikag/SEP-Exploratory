const supertest = require("supertest");
const app = require("../../../../app").app;
const mongoose = require("mongoose");
const { folder_validation } = require('./validation')
const { file_validation } = require('./validation')
//const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZEAxMjMuY29tIiwiaWF0IjoxNTkxMzYyNjk2fQ.hkki9ybqa6Ie6AiVmU4FBOgB8pxrk5eblY8PtXczBCM"
const wrong_token="absfh3567yhgtfbhuji8"

beforeAll(async(done) => {
	var login_entry = await supertest(app)
	  .post("/login")
	  .send({ email: "kamalp@gmail.com", password: "123456@" });
	token = JSON.parse(login_entry.text).token;
	done();
  });

expect.extend({
	checkFolderResult(res) {

		var pass = true
		var errMessge = ""
		try {
			const { error } = folder_validation(res)
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
			return { message: () => `expected  not to be a result object`, pass: true, };
		} else {
			return { message: () => errMessge, pass: false, };
		}

	},
});

it("Test to get folder API call", async () => {
  const response = await supertest(app)
  .post("/drive/getfolders")
  .send({
    group: "10001",
    folder:'root'
  })
  .set({ Authorization: token });

  expect(response.status).toBe(200);
  expect(response.res.text).checkFolderResult()
});

it("Test to get empty array on getfolder API call", async () => {
	const response = await supertest(app)
	.post("/drive/getfolders")
	.send({
	  group: "100240",
	  folder:'root'
	})
	.set({ Authorization: token })
	.expect(200)
	.expect({
        success: true,
        folders: []
      })

  });

it("Test to verify folder with correct group and correct folder", async () => {
	const response = await supertest(app)
	.post("/drive/findfolder")
	.send({
	  group: "10001",
	  folder:'5ee201e6d21b830338fa3eab'
	})
	.expect(200)
	.expect({
        success: true
      })

  });

it("Test to verify folder with correct group and incorrect folder", async () => {
	const response = await supertest(app)
	.post("/drive/findfolder")
	.send({
	  group: "10001",
	  folder:'5ee2op01e6d21b830338fa3eabu'
	})
	.expect(200)
	.expect({
        success: false
      })

  });

it("Test to verify folder with incorrect group and correct folder", async () => {
	const response = await supertest(app)
	.post("/drive/findfolder")
	.send({
	  group: "100244",
	  folder:'5ee201e6d21b830338fa3eab'
	})
	.expect(200)
	.expect({
        success: false
      })

  });

it("Test API call with wrong token", async () => {
	const response = await supertest(app)
	.post("/drive/getfolders")
	.send({
	  group: "10001",
	  folder:'root'
	})
	.set({ Authorization: wrong_token })
	.expect(403)
		
  });
/*
it("Test to verify creation of a folder api call", async () => {
	const response = await supertest(app)
	.post("/drive/createfolder")
	.send({
	  group: "10012",
	  name: "New2",
	  folder:'root'
	})
	.set({ Authorization: token })
	.expect(200)

  });

it("Test to verify deletion of a folder api call", async () => {
	const response = await supertest(app)
	.post("/drive/deletefolder")
	.send({
	  folderId:'5ec65d2c082e8640e07cda8e'
	})
	.set({ Authorization: token })
	.expect(200)
	.expect({
        success: true
      })

  });
*/
////////////////////////////////////////////////////

expect.extend({
	checkFileResult(res) {

		var pass = true
		var errMessge = ""
		try {
			const { error } = file_validation(res)
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


it("Test to get group files API call", async () => {
	const response = await supertest(app)
	.post("/drive/getfiles")
	.send({
	  group: "10001",
	  folder:'root'
	})
	.set({ Authorization: token })
	.expect(200)
	.expect('Content-Type', /json/)
	expect(response.res.text).checkFileResult();
		
  });

it("Test to have empty array on get group files API call", async () => {
	const response = await supertest(app)
	.post("/drive/getfiles")
	.send({
	  group: "100240",
	  folder:'root'
	})
	.set({ Authorization: token })
	.expect(200)
	.expect('Content-Type', /json/)
	.expect({
        success: true,
        files: []
      })
	
		
  });
  
it("Test to get public files API call", async () => {
	const response = await supertest(app)
	.post("/drive/getpublicfiles")
	.send({
	  group: "10001"
	})
  
	expect(response.status).toBe(200);
	expect(response.res.text).checkFileResult();
  });
  
it("Test to search files API call", async () => {
	const response = await supertest(app)
	.post("/drive/searchfile")
	.send({
	  group: "10001",
	  folder:'root',
	  name:"Digital Images.txt"
	})
	.set({ Authorization: token });
  
	expect(response.status).toBe(200);
	expect(response.res.text).checkFileResult();
  });

it("Test to get empty array on search files API call", async () => {
	const response = await supertest(app)
	.post("/drive/searchfile")
	.send({
	  group: "10024",
	  folder:'root',
	  name:"films.txt"
	})
	.set({ Authorization: token })
	.expect({
        success: true,
        files: []
      })
	expect(response.status).toBe(200);
	
  });
  
it("Test to get text files API call", async () => {
	const response = await supertest(app)
	.post("/drive/gettxtfiles")
	.send({
	  group: "10001"
	})
	.set({ Authorization: token });
  
	expect(response.status).toBe(200);
	expect(response.res.text).checkFileResult();
  });
  
it("Test to read text files API call", async () => {
	const response = await supertest(app)
	.post("/drive/readtxtfile")
	.send({
	  filename: "32fed924a63bba12f310a7601b46377b.txt"
	})
	.set({ Authorization: token });
  
	expect(response.status).toBe(200);
  });

it("Test API call with wrong token", async () => {
	const response = await supertest(app)
	.post("/drive/getfiles")
	.send({
	  group: "10001",
	  folder:'root'
	})
	.set({ Authorization: wrong_token })
	.expect(403)
		
  });

it("Test API call to share file with public", async () => {
	const response = await supertest(app)
	.post("/drive/sharefile")
	.send({
	  filename:"32fed924a63bba12f310a7601b46377b.txt"
	})
	.set({ Authorization: token })
	.expect(200)
	.expect({
        success: true
      })
		
  });

it("Test API call to stop share file with public", async () => {
	const response = await supertest(app)
	.post("/drive/notsharefile")
	.send({
	  filename:"32fed924a63bba12f310a7601b46377b.txt"
	})
	.set({ Authorization: token })
	.expect(200)
	.expect({
        success: true
      })
		
  });


afterAll((done) => {
  mongoose.connection.close(() => {
    done();
  });
});
