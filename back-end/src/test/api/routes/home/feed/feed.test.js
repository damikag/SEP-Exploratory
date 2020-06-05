const supertest = require("supertest");
const { app } = require("../../../../../app");
const { feedObject_validation } = require("./validation");

// expect.extend({
//   checkFeed(res) {
//     var pass = true;
//     var errMessge = "";
//     try {
//       const { error } = feedObject_validation(res);
//       if (error) {
//         errMessge = error.details[0].message;
//         pass = false;
//       }
//     } catch (error) {
//       console.log(error);
//       pass = false;
//     }

//     if (pass) {
//       return {
//         message: () => `expected  not to be a feed result object`,
//         pass: true,
//       };
//     } else {
//       return { message: () => errMessge, pass: false };
//     }
//   },
// });

// test("Testing feed API ", async (done) => {
//   const response = await supertest(app).get("/feed").send({
//     email: "damika5@gmail.com",
//   });
//   expect(response.status).toBe(200);
//   expect(response.res.test).checkFeed();
//   done();
// });

// test("Testing feed API  invalid email", async (done) => {
//   const response = await supertest(app).get("/feed").send({
//     email: "asdasddamika5@gmail.com",
//   });
//   expect(response.status).toBe(400);
//   done();
// });

test("2+2", async (done) => {
  expect(2 + 2).toBe(4);
  done();
});
