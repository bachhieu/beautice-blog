const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const DATABASE_URI = process.env.ELASTICSEARCH_URI;
class Elasticsearch {
  constructor() {
    this.client = new Client({ node: DATABASE_URI });
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
    if (blogIndex) {
      const result = await this.client.indices.delete({ index: "blog" });
      blogIndex = false;
    }
    if (!blogIndex) {
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
        // @ts-ignore
        body: settings,
      });
    }
    let productIndex = await this.client.indices.exists({ index: "product" });
    if (productIndex) {
      const result = await this.client.indices.delete({ index: "product" });
      productIndex = false;
    }
    if (!productIndex) {
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
        if (index) {
          // @ts-ignore
          const datas = await model.find().lean();
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
      document: this.setIndex(index, payload),
    });
  }

  async searchData(index, payload) {
    let query = {
      size: 10,
      query: {
        match_bool_prefix: {
          name: {
            query: payload.name || "",
          },
        },
      },
    };
    const result = await this.client.search({
      index: index,
      body: query,
    });

    return result.hits?.hits?.map((hit) => hit._source);
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
    return result.hits?.hits?.map((hit) => hit?._source);
  }
}

module.exports = new Elasticsearch();
