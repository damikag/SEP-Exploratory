const joi = require("@hapi/joi");

module.exports.comment_view_validation = (data) => {
  const schema = joi.object({
    project_id: joi.number().integer().required(),
    comment_id: joi.number().integer().required(),
    message_id: joi.number().integer().required(),
    author_id: joi.number().integer().required(),
    message: joi.string().required(),
    no_of_likes: joi.number().integer().required(),
    no_of_dislikes: joi.number().integer().required(),
    initial_comment: joi.number().integer().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    institution: joi.string(),
    profile_picture: joi.string().required(),
  });

  return schema.validate(data);
};
