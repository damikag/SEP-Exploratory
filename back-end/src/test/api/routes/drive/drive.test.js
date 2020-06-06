const supertest = require("supertest");
const app = require("../../../../app").app;
const mongoose = require("mongoose");
const { folder_validation } = require('./validation')
const { file_validation } = require('./validation')
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZEAxMjMuY29tIiwiaWF0IjoxNTkxMzYyNjk2fQ.hkki9ybqa6Ie6AiVmU4FBOgB8pxrk5eblY8PtXczBCM"
const wrong_token="absfh3567yhgtfbhuji8"
beforeAll((done) => {
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
    group: "10024",
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
	  group: "10012",
	  folder:'5ec65c71082e8640e07cda8b'
	})
	.expect(200)
	.expect({
        success: true
      })

  });

it("Test to verify folder with incorrect group and correct folder", async () => {
	const response = await supertest(app)
	.post("/drive/findfolder")
	.send({
	  group: "10024",
	  folder:'5ec65c71082e8640e07cda8b'
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
	  folder:'5ec6556c71082e8640e07cda8b'
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
	  group: "10024",
	  folder:'root'
	})
	.set({ Authorization: wrong_token })
	.expect(401)
		
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
	  group: "10024",
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
	  group: "10024"
	})
  
	expect(response.status).toBe(200);
	expect(response.res.text).checkFileResult();
  });
  
it("Test to search files API call", async () => {
	const response = await supertest(app)
	.post("/drive/searchfile")
	.send({
	  group: "10024",
	  folder:'5ec95d187c359a2860e280d4',
	  name:"songs.txt"
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
	  folder:'5ec95d187c359a2860e280d4',
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
	  group: "10024"
	})
	.set({ Authorization: token });
  
	expect(response.status).toBe(200);
	expect(response.res.text).checkFileResult();
  });
  
it("Test to read text files API call", async () => {
	const response = await supertest(app)
	.post("/drive/readtxtfile")
	.send({
	  filename: "438463dc188dd39caf36789f45110ecd.txt"
	})
	.set({ Authorization: token });
  
	expect(response.status).toBe(200);
  });

it("Test API call with wrong token", async () => {
	const response = await supertest(app)
	.post("/drive/getfiles")
	.send({
	  group: "10024",
	  folder:'root'
	})
	.set({ Authorization: wrong_token })
	.expect(401)
		
  });

it("Test API call to share file with public", async () => {
	const response = await supertest(app)
	.post("/drive/sharefile")
	.send({
	  filename:"db19386b39e67fc4b8784a2523c6d913.txt"
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
	  filename:"db19386b39e67fc4b8784a2523c6d913.txt"
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
