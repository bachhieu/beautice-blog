const express = require("express");
const { requiredUserMiddleware } = require("../middleware");
const router = express.Router();
const { ProductController } = require("./../controllers");
const { validateBody, validateQuery, productValidate, validateParams } = require("../validate");
router.get("/page/:page", validateParams(productValidate.page), ProductController.getAll);
router.get("/tags/:tag", validateParams(productValidate.tags), ProductController.getProductsByTag);
router.get("/search", validateQuery(productValidate.search), ProductController.searchProduct);
router.get("/top-likes", validateQuery(productValidate.topLikes), ProductController.sort);
router.get("/top-views", validateQuery(productValidate.topViews), ProductController.sort);
router.get("/top-sold", validateQuery(productValidate.topViews), ProductController.sort);
router.post(
  "/create",
  validateBody(productValidate.create),
  requiredUserMiddleware,
  ProductController.create
);
router.get("/:id", validateParams(productValidate.id), ProductController.getOneById);
router.post("/:id/like", validateParams(productValidate.id), ProductController.likeProduct);
router.put(
  "/:id",
  validateParams(productValidate.id),
  validateBody(productValidate.update),
  ProductController.updateProduct
);
router.patch(
  "/:id",
  validateParams(productValidate.id),
  validateBody(productValidate.update),
  ProductController.updateProduct
);

module.exports = router;
