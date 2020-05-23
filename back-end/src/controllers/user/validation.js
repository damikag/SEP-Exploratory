const joi = require("@hapi/joi");

module.exports.register_validation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    confirm_password: joi.string().min(6).valid(joi.ref("password")).required(),
  });

  return schema.validate(data);
};

module.exports.temporary_register_validation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.login_validation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};
