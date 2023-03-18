const Joi = require("joi");

const addToCart = Joi.object({
  products: Joi.array().items(
    Joi.object({
      product: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("product is not type Object Id")
        .required(),
      quantity: Joi.number().required(),
    })
  ),
});

module.exports = {
  addToCart,
};
