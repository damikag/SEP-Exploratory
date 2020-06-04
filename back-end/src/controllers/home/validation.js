const joi = require("@hapi/joi");

module.exports.search_validation = (data) => {
  const schema = joi.object({
    searchString: joi.string().required(),
    index: joi.number().integer().min(0).required(),
    type : joi.string().valid('projects','researchers','institutions').required(),
  });

  return schema.validate(data);
};
