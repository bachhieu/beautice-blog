const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const DATABASE_URI = process.env.ELASTICSEARCH_URI;
const user = process.env.ELASTICSEARCH_USERNAME;
const password = process.env.ELASTIC_PASSWORD;
class Elasticsearch {
  constructor() {
    this.client = new Client({
      node: "https://elastic:qRZ8WDfx@elasticsearch-116632-0.cloudclusters.net:12321",
    });
  }
  setIndex(index, payload) {
    if (index == "blog") {
      return {
        id: payload._id,
        tags: payload.tags,
        content: payload.content,
        likes: payload.likes,
        views: payload.views,
      };
    } else if (index == "product") {
      return {
        id: payload._id,
        tags: payload.tags,
        name: payload.name,
        likes: payload.likes,
        views: payload.views,
        sold: payload.sold,
        instock: payload.sold,
      };
    } else {
      throw new Error("Index not exist!!!");
    }
  }
  async initIndex() {
    // Tạo index nếu chưa tồn tại
    let blogIndex = await this.client.indices.exists({ index: "blog" });

    if (blogIndex.body) {
      const result = await this.client.indices.delete({ index: "blog" });
      blogIndex.body = false;
    }
    if (!blogIndex.body) {
      const settings = {
        settings: {
          index: {
            number_of_shards: 4,
          },
        },
        mappings: {
          properties: {
            id: {
              type: "text",
            },
            content: {
              type: "text",
            },
            tags: {
              type: "text",
            },
            views: {
              type: "integer",
            },
            likes: {
              type: "integer",
            },
          },
        },
      };
      await this.client.indices.create({
        index: "blog",
        body: settings,
      });
    }
    let productIndex = await this.client.indices.exists({ index: "product" });
    if (productIndex.body) {
      const result = await this.client.indices.delete({ index: "product" });
      productIndex.body = false;
    }
    if (!productIndex.body) {
      const settings = {
        settings: {
          index: {
            number_of_shards: 4,
          },
        },
        mappings: {
          properties: {
            id: {
              type: "text",
            },
            name: {
              type: "text",
            },
            tags: {
              type: "text",
            },
            views: {
              type: "integer",
            },
            likes: {
              type: "integer",
            },
          },
        },
      };
      await this.client.indices.create({
        index: "product",
        // @ts-ignore
        body: settings,
      });
    }
  }

  async initData(models) {
    const index_name = ["product", "blog"];
    return await Promise.all(
      index_name.map(async (name) => {
        const index = await this.client.indices.exists({ index: name });
        const model = models[name];
        // @ts-ignore
        const datas = await model.find().lean();
        if (index.body && datas.length) {
          const body = [];
          datas.forEach((data) => {
            body.push({
              index: {
                _index: name,
                _id: data._id.toString(),
              },
            });
            delete data._id;
            body.push(data);
          });
          return await this.client.bulk({ refresh: true, body });
        }
        return;
      })
    );
  }

  async createData(index, payload) {
    return this.client.index({
      index: index,
      id: payload._id,
      body: this.setIndex(index, payload),
    });
  }

  async searchData(index, payload) {
    let match;
    if (index == "blog") {
      match = {
        content: {
          query: payload.content || "",
        },
      };
    } else {
      match = {
        name: {
          query: payload.name || "",
        },
      };
    }
    let query = {
      size: 10,
      query: {
        match_bool_prefix: match,
      },
    };
    const result = await this.client.search({
      index: index,
      body: query,
    });
    return result.body.hits?.hits?.map((hit) => hit._source);
  }

  async sort(index, order) {
    let query = {
      size: 10,
      query: {
        match_all: {},
      },
      sort: [order],
    };
    const result = await this.client.search({
      index: index,
      body: query,
    });
    return result?.body?.hits?.map((hit) => hit?._source);
  }
}

module.exports = new Elasticsearch();
