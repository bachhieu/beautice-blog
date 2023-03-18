const validateBody = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.body);
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error.details);
    }
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.query);
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error.details);
    }
    next();
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const validatorResult = schema.validate(req.params);
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error.details);
    }
    next();
  };
};

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
  userValidate: require("./user.schema"),
  blogValidate: require("./blog.schema"),
  productValidate: require("./product.schema"),
  cartValidate: require("./cart.schema"),
};
