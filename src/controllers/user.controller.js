const { UserService } = require("./../services");
class UserController {
  async register(req, res) {
    try {
      const result = await UserService.register(req.body);
      res.status(201).json(result);
    } catch (e) {
      console.log("🚀 ~ file: user.controller.js:8 ~ UserController ~ register ~ e:", e);
      res.status(400).json({ error: e.message });
    }
  }

  async login(req, res) {
    try {
      const result = await UserService.login(req.body);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
  async refreshToken(req, res) {
    try {
      const { message } = req.body;
      if (message == "TokenExpiredError") {
        const result = await UserService.refreshToken(req.body);
        res.status(200).json({ accessToken: result });
      } else {
        throw new Error("No refresh token provided!");
      }
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getMe(req, res) {
    try {
      const result = await UserService.getMe(req.user?.id);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }
}

module.exports = new UserController();
