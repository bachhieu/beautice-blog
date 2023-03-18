module.exports = (req, _res, next) => {
  req.ip = req.ip || req.headers["x-forwarded-for"];
  next();
};
