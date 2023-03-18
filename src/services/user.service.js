const { userModel } = require("./../db");

const TokenService = require("./token.service");

class UserService {
  async register(payload) {
    const { ip, email, name, password } = payload;
    let user = await userModel.findOne({ email });
    if (user) {
      throw new Error("user already exist!");
    } else {
      user = await userModel.create({
        email,
        name,
        password: await TokenService.hashPassword(password),
      });
    }
    const input = {
      ip,
      id: user.id,
      role: user.role,
    };
    const accessToken = await TokenService.generateAccessToken(input);
    const refreshToken = await TokenService.generateRefreshToken(input);
    return {
      accessToken,
      refreshToken,
    };
  }

  async login(payload) {
    const { ip, email, password } = payload;
    let user = await userModel.findOne({ email });
    if (user && TokenService.compareSync(password, user.password)) {
      const input = {
        ip,
        id: user.id,
        role: user.role,
      };
      const accessToken = await TokenService.generateAccessToken(input);
      const refreshToken = await TokenService.generateRefreshToken(input);
      return {
        accessToken,
        refreshToken,
      };
    } else {
      throw new Error("user not exist!");
    }
  }
  async refreshToken({ ip, refreshToken }) {
    const decode = await TokenService.verifyRefreshToken(refreshToken);
    console.log("🚀 ~ file: user.service.js:52 ~ UserService ~ refreshToken ~ decode:", decode);
    // @ts-ignore
    let user = await userModel.findOne({ _id: decode.id });
    console.log("🚀 ~ file: user.service.js:54 ~ UserService ~ refreshToken ~ user:", user);
    const input = {
      ip,
      id: user?.id,
      role: user?.role,
    };
    return await TokenService.generateAccessToken(input);
  }

  async getMe(id) {
    return await userModel.findById(id);
  }
}
module.exports = new UserService();
