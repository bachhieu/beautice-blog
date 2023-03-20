const { productModel, blogModel } = require("./../db");
const ElasticService = require("./elasticsearch.service");
class Product {
  async create(payload) {
    return await productModel.create(payload);
  }

  async findOne(payload) {
    return await productModel.findOne(payload);
  }

  async getAll({ limit, offset, page }) {
    const data = await productModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("autherId", "name");
    const count = await productModel.countDocuments();
    return { count, page, data };
  }

  async getProductByTag(tag, { limit, offset, page }) {
    const data = await productModel
      .find({ tags: tag })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    const count = await productModel.find({ tags: tag }).count();
    return { count, page, data };
  }

  async getOneById(id) {
    return await productModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
  }

  async updateProduct(id, payload) {
    return await productModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async likeProduct(id, ip) {
    const oldproduct = await productModel.findById(id);
    if (oldproduct && oldproduct.likersIp?.includes(ip)) {
      return await productModel.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 }, $pull: { likersIp: ip } },
        { new: true }
      );
    } else if (oldproduct && !oldproduct.likersIp?.includes(ip)) {
      return await productModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 }, $push: { likersIp: ip } },
        { new: true }
      );
    } else {
      throw new Error("Bad request!");
    }
  }

  async searchData(payload) {
    const index = "product";
    return ElasticService.searchData(index, payload);
  }

  async sort(payload) {
    const index = "product";
    return ElasticService.sort(index, payload);
  }

  async checkproductsInStock(products) {
    const quantity = await Promise.all(
      products.map(async (product) => {
        const prod = await productModel.findOne({ _id: product.product });
        // @ts-ignore
        return prod?.instock > product.quantity ? true : product;
      })
    );
    let failProduct = [];
    quantity?.forEach((product) => {
      if (product.product) {
        failProduct.push(product.product?._id);
      }
    });
    if (failProduct.length) {
      return {
        error: true,
        message: "There is not enough stock in stock",
        products: failProduct,
      };
    } else {
      return await Promise.all(
        products.map(async (product) => {
          console.log(
            "🚀 ~ file: product.service.js:98 ~ Product ~ products.map ~ product:",
            product.quantity
          );
          return await productModel.findOneAndUpdate(
            { _id: product.product },
            { $inc: { instock: -product.quantity, sold: product.quantity } },
            { new: true }
          );
        })
      );
    }
  }

  async syncEs() {
    await ElasticService.initIndex();
    // await ElasticService.initData({
    //   blog: blogModel,
    //   product: productModel,
    // });
    return;
  }
}
module.exports = new Product();
