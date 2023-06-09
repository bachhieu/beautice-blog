const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
require("./db");
const { logger } = require("./middleware");
const swaggerUI = require("swagger-ui-express");
const { specs } = require("./docs");
const cors = require("cors");
const route = require("./routes");
const { verifyUserMiddleware, getIpMiddleware } = require("./middleware/user");
app.use(cors());
app.use(express.json());
app.set("trust proxy", true);
app.use(verifyUserMiddleware, getIpMiddleware);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(specs));
app.use(logger);
route(app);
app.disable("x-powered-by");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
