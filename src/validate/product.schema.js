const Joi = require("joi");

const page = Joi.object({
  page: Joi.string().required(),
});

const create = Joi.object({
  name: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  instock: Joi.number().default(100).required(),
  price: Joi.number().default(200000).required(),
});

const id = Joi.object({
  id: Joi.string().required(),
});

const tags = Joi.object({
  tag: Joi.string().required(),
});

const update = Joi.object({
  content: Joi.string(),
  tags: Joi.array().items(Joi.string()).required(),
});

const search = Joi.object({
  name: Joi.string().max(100),
});

const topLikes = Joi.object({
  likes: Joi.string().valid("asc", "desc").default("desc"),
});

const topViews = Joi.object({
  sold: Joi.string().valid("asc", "desc").default("desc"),
});

module.exports = { page, create, id, tags, update, topLikes, topViews, search };
