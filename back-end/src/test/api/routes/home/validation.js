const joi = require("@hapi/joi");

module.exports.searchObject_validation = (data) => {
  const schema = joi.object({

    researchers: joi.array().items(joi.object({

      id: joi.number().integer().required(),
      first_name: joi.string(),
      last_name: joi.string(),
      institution: joi.string().required(),
      profile_picture: [joi.string(), joi.any().optional()]

    }).unknown()).required(),
    
    projects: joi.array().items(joi.object({

      id: joi.number().integer().required(),
      title: joi.string().required(),
      description: joi.string(),
      poster_image: joi.string(),
      first_name: joi.string(),
      last_name: joi.string(),
      institution: joi.string().required(),
      profile_picture: [joi.string(), joi.any().optional()],
      published_at: joi.date()

    }).unknown()).required(),

    institutions: joi.array().items(joi.object({

      id: joi.number().integer().required(),
      name: joi.string().required(),
      display_image: [joi.string(), joi.any().optional()]

    }).unknown()).required(),

  });

  return schema.validate(data);
};
