const joi = require("@hapi/joi");

module.exports.editorBlog_validation = (data) => {

  const custom = joi.extend((joi) => {

    return {
      type: 'object',
      base: joi.object(),
      coerce(value, schema) {
  
        if (value[0] !== '{' &&
          !/^\s*\{/.test(value)) {
          return;
        }
  
        try {
          return { value: JSON.parse(value) };
        }
        catch (err) {
          console.log(err);
        }
      }
    };
  });

  const schema = custom.object({
    success:joi.boolean(),
    blogs: joi.array().items(joi.object({

        _id: joi.string().required(),
        content:joi.string().required(),
        name: joi.string().required(),
        group: joi.string().required(),
        folder:joi.string().required(),
        createdAt:joi.date().required(),
        updatedAt:joi.date().required(),
        __v:joi.number().integer()

    }).unknown()).required()
  });

  return schema.validate(data);
};


