const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
class Token {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
  compareSync(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
  async generateAccessToken(payload) {
    return jwt.sign(payload, process.env.TOKEN_SECRET || "", {
      expiresIn: process.env.EXPRIESIN_TIME,
    });
  }

  async generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "", {
      expiresIn: process.env.REFRESH_EXPRIESIN_TIME,
    });
  }

  async verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, process.env.TOKEN_KEY || "");
  }

  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "");
  }
}

module.exports = new Token();
