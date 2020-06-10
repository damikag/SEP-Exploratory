var nodemailer = require("nodemailer");
var transporter = require("../app");

//Creating transport instance
var transport = {
  host: "smtp.mailtrap.io",
  port: 25,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
};

//Creating a Nodemailer Transport instance
var transporter = nodemailer.createTransport(transport);

//Verifying the Nodemailer Transport instance
transporter.verify((error, success) => {
  return;
});

module.exports = { transporter };
