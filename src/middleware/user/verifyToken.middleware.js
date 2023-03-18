const jwt = require("jsonwebtoken");
const { userRoleEnum } = require("../../init/constants");
require("dotenv").config();
module.exports = async (req, _res, next) => {
  try {
    const access_token = req.headers.authorization?.split(" ")[1] || req.headers["x-access-token"];
    const decoded = jwt.verify(access_token, process.env.TOKEN_SECRET || "");
    req.user = decoded;
    return next();
  } catch (err) {
    req.anonymous = true;
    if (err.name === "TokenExpiredError") req.body.message = "TokenExpiredError";
    return next();
  }
};
