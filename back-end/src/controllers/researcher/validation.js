const joi = require("@hapi/joi");

module.exports.feed_validation = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    index: joi.number().integer().required()
  });

  return schema.validate(data);
};
