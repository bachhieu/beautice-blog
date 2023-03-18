const blogRouter = require("./blog.route");
const userRouter = require("./user.route");
const productRouter = require("./product.route");
const cartRouter = require("./cart.route");
function route(app) {
  app.use("/product", productRouter);
  app.use("/blog", blogRouter);
  app.use("/user", userRouter);
  app.use("/cart", cartRouter);
  app.get("/", (_req, res) => {
    res.redirect("/api-doc");
  });
}

module.exports = route;
