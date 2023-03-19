const { Client } = require("@elastic/elasticsearch");
const Elasticsearch = require("./../../../services/elasticsearch.service");
const { productModel, blogModel } = require("./../../models");
require("dotenv").config();
const DATABASE_URI = process.env.ELASTICSEARCH_URI;

module.exports = async () => {
  try {
    const client = new Client({ node: DATABASE_URI, requestTimeout: 30 });
    setTimeout(async () => {
      await Elasticsearch.initIndex();
      await Elasticsearch.initData({
        product: productModel,
        blog: blogModel,
      });
    }, 3000);
    console.log("connect elasticsearch successful!!!");

    return client;
  } catch (e) {
    console.log("connect elasticsearch fail!!!", e);
  }
};
