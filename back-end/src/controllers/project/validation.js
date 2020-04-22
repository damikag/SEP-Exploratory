const joi = require("@hapi/joi");

module.exports.create_project_validation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    creator: joi.number().integer().valid(joi.in("collaborators")).required(),
    poster_image: joi.string(),
    collaborators: joi.array().items(joi.number().integer().required()),
    tags: joi.array().items(joi.number().integer().required()),
  });

  return schema.validate(data);
};
