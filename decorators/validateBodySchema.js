const { httpError } = require("../helpers");

const validateBodySchema = (schema) => {
  const func = (req, res, next) => {
    console.log(req);
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw httpError(400, error.message);
      }
      next();
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  };
  return func;
};

module.exports = validateBodySchema;
