const joi = require("@hapi/joi");

module.exports.feed_validation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });

  return schema.validate(data);
};
