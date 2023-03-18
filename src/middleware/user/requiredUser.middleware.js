module.exports = async (req, res, next) => {
  if (req.anonymous) {
    res.status(401).json("Bad Authorization");
  } else {
    next();
  }
};
