var Researcher = require("../../models/models/Researcher");
var TemporaryUser = require("../../models/models/TemporaryUser");
var UserService = require("../../service/user/UserService");
const { get_default_image } = require("./defaultPicture");
const {
  login_validation,
  register_validation,
  temporary_register_validation,
} = require("./validation");
const { clean_object } = require("../../api/helpers/helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.temporaryUserRegisterAction = async (req, res) => {
  const { error } = temporary_register_validation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashed_password;
  var temporaryUser = new TemporaryUser(req.body);
  temporaryUser
    .find_by_email()
    .then(async (result) => {
      if (result) {
        var today = new Date();
        var date = new Date(result.created_at);
        date.setDate(date.getDate() + 1);
        if (today < date) {
          return res.status(400).json({ error: "duplicate entry" });
        }
        await temporaryUser
          .delete_by_email()
          .then(async (delete_result) => {
            await temporaryUser
              .insert()
              .then((insert_result) => {
                res.status(200).json({ inserted_id: insert_result.insertId });
              })
              .catch((err) => {
                return res.status(500).json({ error: err.message });
              });
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashed_password;

        temporaryUser
          .insert()
          .then((result) => {
            if (result) {
              res.status(200).json({ inserted_id: result.insertId });
            }
          })
          .catch((err) => {
            return res.status(500).json({ error: err.message });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.registerAction = (req, res) => {
  var temporaryUser = new TemporaryUser({ id: req.body.id });

  temporaryUser
    .find_by_id()
    .then(async (result) => {
      const body = await getBody(result);
      var researcher = new Researcher(body);
      var newTemporaryUser = new TemporaryUser({
        confirmed_at: new Date(),
      });
      UserService.register_new_user(newTemporaryUser, researcher)
        .then((result) => {
          res.status(200).json({ inserted_id: result.insertId });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.message });
        });
    })

    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports.loginAction = (req, res) => {
  const { error } = login_validation(req.body);

  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  var researcher = new Researcher();

  researcher
    .find_by_email(req.body.email)
    .then(async (user) => {
      if (user) {
        const password_match = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (password_match) {
          const token = jwt.sign(
            { email: user.email },
            process.env.TOKEN_SECRET
          );

          var updateUser = new Researcher({ token: token });
          user.token = token;

          updateUser
            .update([`email = '${user.email}'`])
            .then(async (result) => {
              user = await Object.assign({}, user);
              user = await clean_object(user);
              delete user.password;
              delete user.profile_picture;

              return res.status(200).header("exp-auth-token", token).json(user);
            })
            .catch((err) => {
              return res.status(500).json({ error: err.message });
            });
        } else {
          return res.status(401).json({ error: "Invalid Password" });
        }
      } else {
        return res.status(404).json({ error: "Invalid Email" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
module.exports.authAction = (req, res) => {
  var researcher = new Researcher();
  //console.log(req.user.email);
  researcher.find_by_email(req.user.email).then(async (user) => {
    user = Object.assign({}, user);
    //console.log(user);
    return res.status(200).json({
      _id: user.id,
      isAuth: true,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      institution: user.institution,
      profile_picture: user.profile_picture,
      profession: user.profession,
      description: user.description,
      linkedIn: user.linkedIn,
      twitter: user.twitter,
    });
  });
};
module.exports.logoutAction = (req, res) => {
  var researcher = new Researcher();
  //console.log(req.user);
  researcher
    .find_by_email(req.user.email)
    .then(async (user) => {
      // user = Object.assign(user, { token: "" });
      var logout_user = new Researcher({ token: "" });
      logout_user
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

function getBody(result) {
  return {
    first_name: result.first_name,
    last_name: result.last_name,
    email: result.email,
    password: result.password,
    profile_picture: get_default_image(),
  };
}
