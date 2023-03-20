const { ProductService } = require("../services");
const { tagsArray, pagination } = require("../init");

class Product {
  async create(req, res) {
    try {
      const payload = {
        price: req.body.price,
        name: req.body.name,
        instock: req.body.instock,
        autherId: req.user.id,
        tags: req.body.tags.filter((tag) => tagsArray.includes(tag)),
      };
      const result = await ProductService.create(payload);
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const { limit, offset, page } = pagination(req);
      const result = await ProductService.getAll({ limit, offset, page });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async getOneById(req, res) {
    try {
      const payload = req.params.id;
      const result = await ProductService.getOneById(payload);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async getProductsByTag(req, res) {
    try {
      const { limit, offset, page } = pagination(req);
      const tag = req.params?.tag;
      const result = await ProductService.getProductByTag(tag, { limit, offset, page });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;
      if (req.method == "PUT") {
        const result = await ProductService.updateProduct(id, payload);
        res.status(200).json(result);
      } else if (req.method == "PATCH") {
        const result = await ProductService.updateProduct(id, payload);
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: "Bad request!" });
      }
    } catch (e) {
      console.log(
        "🚀 ~ file: Product.controller.js:62 ~ ProductController ~ updateProduct ~ e:",
        e
      );
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async likeProduct(req, res) {
    try {
      const ip = req.ip;
      const { id } = req.params;
      const result = await ProductService.likeProduct(id, ip);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async searchProduct(req, res) {
    try {
      delete req.query.ip;
      const payload = req.query;
      const result = await ProductService.searchData(payload);
      res.status(200).json(result);
    } catch (e) {
      console.log(
        "🚀 ~ file: Product.controller.js:94 ~ ProductController ~ searchProduct ~ e:",
        e
      );
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async sort(req, res) {
    try {
      delete req.query.ip;
      const payload = req.query;
      const result = await ProductService.sort(payload);
      res.status(200).json(result);
    } catch (e) {
      console.log(
        "🚀 ~ file: Product.controller.js:94 ~ ProductController ~ searchProduct ~ e:",
        e
      );
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async syncEs(req, res) {
    try {
      const result = await ProductService.syncEs();
      res.status(200).json("successfull!!!");
    } catch (e) {
      console.log(
        "🚀 ~ file: Product.controller.js:94 ~ ProductController ~ searchProduct ~ e:",
        e
      );
      res.status(400).json({ error: "Bad request!" });
    }
  }
}

module.exports = new Product();
