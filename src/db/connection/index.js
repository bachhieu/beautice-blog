module.exports = {
  mongodb: require("./mongodb")(),
  elastic: require("./elasticsearch")(),
};
