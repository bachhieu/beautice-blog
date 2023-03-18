const axios = require("axios");
require("dotenv").config();
class Delevery {
  baseURL = process.env.BASE_URL_GHN;
  baseToken = process.env.TOKEN_GHN;
  async create(body) {
    const url = `${this.baseURL}v2/shipping-order/create`;
    // @ts-ignore
    const result = await axios.post(url, body, {
      method: "post",
      url: url,
      headers: {
        token: this.baseToken,
      },
    });
    return result.data;
  }
}
module.exports = new Delevery();
