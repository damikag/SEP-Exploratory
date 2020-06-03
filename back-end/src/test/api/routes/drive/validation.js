const joi = require("@hapi/joi");
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

module.exports.file_validation = (data) => {
  
  const schema = custom.object(
    
    {
    success:joi.boolean(),
    files: joi.array().items(joi.object({

      _id: joi.string().required(),
      length: joi.number().integer(),
      chunkSize: joi.number().integer(),
      filename: joi.string().required(),
      md5: joi.string(),
      contentType: joi.string().required(),
      metadata: joi.object({

        originalname: joi.string().required(),
        folder: joi.string().required(),
        group: joi.string().required(),
        sensitivity: joi.string().required()
  
      })

    }).unknown()).required()
  });

  return schema.validate(data);
};
module.exports.folder_validation = (data) => {
    const schema = custom.object({
      success:joi.boolean(),
      folders: joi.array().items(joi.object({
  
        _id: joi.string().required(),
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


