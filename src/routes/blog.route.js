const express = require("express");
const { requiredUserMiddleware } = require("../middleware");
const router = express.Router();
const { BlogController } = require("./../controllers");
const { validateBody, validateQuery, blogValidate, validateParams } = require("../validate");
router.get("/page/:page", validateParams(blogValidate.page), BlogController.getAll);
router.get("/tags/:tag", validateParams(blogValidate.tags), BlogController.getBlogsByTag);
router.get("/search", validateQuery(blogValidate.search), BlogController.searchBlog);
router.get("/top-likes", validateQuery(blogValidate.topLikes), BlogController.sort);
router.get("/top-views", validateQuery(blogValidate.topViews), BlogController.sort);
router.post(
  "/create",
  validateBody(blogValidate.create),
  requiredUserMiddleware,
  BlogController.create
);
router.get("/:id", validateParams(blogValidate.id), BlogController.getOneById);
router.post("/:id/like", validateParams(blogValidate.id), BlogController.likeBlog);
router.put(
  "/:id",
  validateParams(blogValidate.id),
  validateBody(blogValidate.update),
  BlogController.updateBlog
);
router.patch(
  "/:id",
  validateParams(blogValidate.id),
  validateBody(blogValidate.update),
  BlogController.updateBlog
);

module.exports = router;
