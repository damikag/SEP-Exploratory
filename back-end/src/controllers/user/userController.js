var Researcher = require("../../models/models/Researcher");

const { login_validation, register_validation } = require("./validation");
const { clean_object } = require("../../api/helpers/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerAction = (req, res) => {
  const { error } = register_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  var researcher = new Researcher();

  researcher
    .find_by_email_or_id(req.body.email, req.body.id)
    .then(async (result) => {
      if (result) {
        return res.status(400).json({ error: "duplicate entry" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashed_password;
        var researcher = new Researcher(req.body);

        researcher
          .insert()
          .then((result) => {
            if (result) {
              res.status(200).json({ email: researcher.email });
            }
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
    })

    .catch((error) => {
      return res.status(500).json({ error: error.message });
    })

    .catch((error) => {
      return res.status(500).send("server error");
    });
};

module.exports.loginAction = (req, res) => {
  const { error } = login_validation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  var researcher = new Researcher();

  researcher
    .find_by_email(req.body.email)
    .then(async (user) => {
      const password_match = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_match) {
        const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET);
        user.token = token;
        user
          .update([`email = '${user.email}'`])
          .then((result) => {
            user = Object.assign({}, user);
            user = clean_object(user);
            delete user.password;
            return res.status(200).header("exp-auth-token", token).json(user);
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      } else {
        return res.status(400).json({ error: "Invalid Password" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
module.exports.authAction = (req, res) => {
  var researcher = new Researcher();
  console.log(req.user.email);
  researcher.find_by_email(req.user.email).then(async (user) => {
    user = Object.assign({}, user);
    console.log(user);
    return res.status(200).json({
      _id: user.id,
      isAuth: true,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      institution: user.institution,
      profile_picture: user.profile_picture,
    });
  });
};
module.exports.logoutAction = (req, res) => {
  var researcher = new Researcher();
  console.log(req.user);
  researcher
    .find_by_email(req.user.email)
    .then(async (user) => {
      user = Object.assign(user, { token: "" });
      user
        .update([`email = '${user.email}'`])
        .then((result) => {
          return res.status(200).json({ message: "Logged out successfully" });
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
