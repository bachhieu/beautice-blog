const express = require("express");
const router = express.Router();
const { validateBody, validateQuery, cartValidate, validateParams } = require("../validate");
const { requiredUserMiddleware } = require("./../middleware");
const { CartController } = require("./../controllers");

router.post("/", validateBody(cartValidate.addToCart), CartController.addToCart);
router.get("/", CartController.findCartPending);
router.post("/order", requiredUserMiddleware, CartController.order);
router.post("/payment", requiredUserMiddleware, CartController.payment);
module.exports = router;
