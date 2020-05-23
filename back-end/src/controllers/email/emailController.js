var nodemailer = require("nodemailer");
const Email = require("email-templates");
const ejs = require("ejs");
var transporter = require("../../app");
var nodemailer = require("nodemailer");

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
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages...");
  }
});

module.exports.indexAction = (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var id = req.body.message;

  ejs.renderFile(
    __dirname + "/emails/user/email.ejs",
    { name: name, url: `${process.env.FRONT_END}/join-exploratory/${id}` },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: process.env.EMAIL_USERNAME,
          to: email,
          subject: "Account Activated",
          html: data,
        };
        // console.log("html data ======================>", mainOptions.html);

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.json({
              msg: err.message,
            });
          } else {
            res.json({
              msg: "success",
            });
          }
        });
      }
    }
  );
};
