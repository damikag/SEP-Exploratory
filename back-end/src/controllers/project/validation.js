const joi = require("@hapi/joi");

module.exports.create_project_validation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    goal: joi.string().required(),
    creator: joi
      .string()
      .regex(/^\d+$/)
      .valid(joi.in("collaborators"))
      .required(),
    poster_image: joi.string(),
    collaborators: joi.array().items(joi.string().regex(/^\d+$/).required()),
  });

  return schema.validate(data);
};
