const Joi = require("joi");

const login = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required(),
});

const register = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(7).required(),
  name: Joi.string(),
  avatar: Joi.string(),
});

const refreshToken = Joi.object({
  refreshToken: Joi.string().required(),
});
module.exports = {
  login,
  register,
  refreshToken,
};
