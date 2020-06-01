
const supertest = require('supertest');
const { app } = require('../../../../app');
const { searchObject_validation } = require('./validation')

expect.extend({
	checkSearchResult(res) {

		var pass = true
		var errMessge = ""
		try {
			const { error } = searchObject_validation(res)
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
			return { message: () => `expected  not to be a search result object`, pass: true, };
		} else {
			return { message: () => errMessge, pass: false, };
		}

	},
});


test('Testing Search API researcher', async (done) => {
	const response = await supertest(app).post('/search').send({
		"searchString": "Nimal"
	});
	expect(response.status).toBe(200);
	expect(response.res.test).checkSearchResult()
	done()
})

test('Testing Search API project', async (done) => {
	const response = await supertest(app).post('/search').send({
		"searchString": "description"
	});
	expect(response.status).toBe(200);
	expect(response.res.test).checkSearchResult()
	done()
})

test('Testing Search API institution', async (done) => {
	const response = await supertest(app).post('/search').send({
		"searchString": "university"
	});
	expect(response.status).toBe(200);
	expect(response.res.test).checkSearchResult()
	done()
})

test('Testing Search API nonexisting string', async (done) => {
	const response = await supertest(app).post('/search').send({
		"searchString": "sfsdfasdf"
	});
	expect(response.status).toBe(200);
	expect(response.res.test).checkSearchResult()
	done()
})

test('Testing Search API empty String', async (done) => {
	const response = await supertest(app).post('/search').send({
		"searchString": ""
	});
	expect(response.status).toBe(400);
	done()
})