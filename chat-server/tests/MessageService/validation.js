const joi = require("@hapi/joi");

module.exports.researcherObject_validation = (data) => {
  const schema = joi.object({

    id: joi.number().integer().min(0).required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    profile_picture: [joi.any().optional(), joi.string()]
    
  })
    .unknown();

  return schema.validate(data);
};


module.exports.seenResearcherArr_validation = (data) => {
  const schema = joi.array().items(joi.object({

    user_id: joi.number().integer().min(0).required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    profile_picture: [joi.any().optional(), joi.string()],

  }).unknown())

  return schema.validate(data);
};
