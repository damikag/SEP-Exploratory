const joi = require("@hapi/joi");

module.exports.chatObject_validation = (data) => {
  const schema = joi.object({

    chatMesseges: joi.array().items(joi.object({

      id: joi.number().integer().required(),
      // message: joi.string().required(),
      chat_id: joi.number().integer().required(),
      message_time: joi.date(),
      sender_id: joi.number().integer().required(),
      first_name: joi.string(),
      last_name: joi.string(),
      email: joi.string().email().required(),
      profile_picture:[joi.string(),joi.any().optional()]

    }).unknown()).required(),
    lastSeenACK: joi.number().integer().required(),
    lastDeliverACK: joi.number().integer().required(),
    chat_id: joi.number().integer().required(),
    name: joi.string().required(),
    logo: [joi.any().optional(), joi.string()],
    description: [joi.any().optional(), joi.string()],
    joined_at: joi.date(),
    isDirrect: joi.number().integer().min(0).max(1)

  })
    .unknown();

  return schema.validate(data);
};
