const joi = require("@hapi/joi");

module.exports.createChat_validation = (data) => {
  const schema = joi.object({

    name: joi.string().max(255).required(),
    description: joi.string().required(),
    creator_id: joi.number().integer().min(0).required(),

    participants: joi.array().items(joi.object({

      user_id: joi.number().integer().min(0).required(),
      isAdmin: joi.number().integer().min(0).max(1).required()

    })),

    isDirrect: joi.number().integer().min(0).max(1).required()
  });

  return schema.validate(data);
};
