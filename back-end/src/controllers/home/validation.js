const joi = require("@hapi/joi");

module.exports.search_validation = (data) => {
  const schema = joi.object({
    searchString: joi.string().required(),
  });

  return schema.validate(data);
};
