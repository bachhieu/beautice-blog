const { Client } = require("@elastic/elasticsearch");
const Elasticsearch = require("./../../../services/elasticsearch.service");
require("dotenv").config();
const DATABASE_URI = process.env.ELASTICSEARCH_URI;
const user = process.env.ELASTICSEARCH_USERNAME;
const password = process.env.ELASTIC_PASSWORD;

module.exports = async () => {
  try {
    const client = new Client({
      node: "https://elastic:qRZ8WDfx@elasticsearch-116632-0.cloudclusters.net:12321",
    });
    console.log("connect elasticsearch successful!!!");

    return client;
  } catch (e) {
    console.log("connect elasticsearch fail!!!", e);
  }
};
