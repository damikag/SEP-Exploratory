const joi = require("@hapi/joi");

module.exports.project_view_validation = (data) => {
  const schema = joi.object({
    project: joi.object().required(),
    collaborators: joi.array().required().items(joi.object().required()),
    tags: joi.array().required().items(joi.object().required()),
    admins: joi.array().required().items(joi.object().required()),
    related_images: joi
      .alternatives()
      .try(joi.array().items(joi.string()), joi.boolean().valid(false)),
    comments: joi.array().items(joi.object()),
  });

  return schema.validate(data);
};

module.exports.project_row_view_validation = (data) => {
  const schema = joi.object({
    id: joi.number().integer().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    creator: joi.number().integer().valid(joi.in("collaborators")).required(),
    visibility_public: joi.string().required(),
    final_paper: joi.string().allow(null),
    created_at: joi.date().timestamp().required(),
    updated_at: joi.date().timestamp().required(),
    deleted_at: joi.allow(null),
    abstract: joi.string().allow(null),
    poster_image: joi.string().allow(null),
  });

  return schema.validate(data);
};
