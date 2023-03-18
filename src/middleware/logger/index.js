const morgan = require("morgan");
const loggerModel = require("./../../db/models/logger.model");

morgan.token("id", function getId(req) {
  // @ts-ignore
  return req.user?.id;
});

morgan.token("ip", function getId(req) {
  // @ts-ignore
  return req.ip || req.headers["x-forwarded-for"];
});

module.exports = morgan(":ip, :id, :method, :url, :response-time ms, :date[iso]", {
  stream: {
    write: async (message) => {
      const [ipAddress, id, method, url, time, date] = message.split(",");
      // logger into mongodb
      const path = url.slice(0, url.indexOf("?"));
      await loggerModel.create({ message, ipAddress, id, path });
    },
  },
});
