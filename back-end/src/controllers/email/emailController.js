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

module.exports.newUserAction = (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var id = req.body.message;

  ejs.renderFile(
    __dirname + "/emails/user/email.ejs",
    {
      name: name,
      url: `${process.env.FRONT_END}/user/join-exploratory/${id}`,
      react_end: `${process.env.FRONT_END}`,
    },

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

module.exports.newProjectAction = (req, res, next) => {
  var project_id = req.body.id;
  var collaborators = req.body.receivers;

  var emails = [];
  collaborators.map((user) => {
    emails.push(user.email);
  });
  ejs.renderFile(
    __dirname + "/emails/project/email.ejs",
    {
      name: "Dear Researcher",
      url: `${process.env.FRONT_END}/project/viewproject/${project_id}`,
      react_end: `${process.env.FRONT_END}`,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: process.env.EMAIL_USERNAME,
          to: emails,
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
