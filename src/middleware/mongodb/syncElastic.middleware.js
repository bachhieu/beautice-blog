const ElasticService = require("./../../services/elasticsearch.service");

async function syncElastic(doc) {
  let index;
  if (doc.address) {
    index = "product";
  } else {
    index = "blog";
  }
  const result = await ElasticService.createData(index, doc);
  console.log("middleware mongodb---> Blog, index name", index);
}

module.exports = function (schema) {
  schema.post("updateOne", syncElastic);
  schema.post("updateManny", syncElastic);
  schema.post("updateCreate", syncElastic);
  schema.post("findByIdAndUpdate", syncElastic);
  schema.post("findOneAndUpdate", syncElastic);
  schema.post("create", syncElastic);
  schema.post("save", syncElastic);
};
