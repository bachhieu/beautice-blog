const express = require("express");
const router = express.Router();
const { validateBody, userValidate } = require("../validate");
const { UserController } = require("./../controllers");
const { requiredUserMiddleware } = require("./../middleware");
router.post("/register", validateBody(userValidate.register), UserController.register);
router.post("/login", validateBody(userValidate.login), UserController.login);
router.post(
  "/refresh-token",
  requiredUserMiddleware,
  validateBody(userValidate.refreshToken),
  UserController.refreshToken
);
router.get("/me", UserController.getMe);

module.exports = router;
