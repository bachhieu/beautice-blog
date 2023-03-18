const { BlogService } = require("./../services");
const { tagsArray, pagination } = require("./../init");

class BlogController {
  async create(req, res) {
    try {
      const payload = {
        autherId: req.user.id,
        content: req.body.content,
        tags: req.body.tags.filter((tag) => tagsArray.includes(tag)),
      };
      const result = await BlogService.create(payload);
      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  async getAll(req, res) {
    try {
      const { limit, offset, page } = pagination(req);
      const result = await BlogService.getAll({ limit, offset, page });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async getOneById(req, res) {
    try {
      const payload = req.params.id;
      const result = await BlogService.getOneById(payload);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async getBlogsByTag(req, res) {
    try {
      const { limit, offset, page } = pagination(req);
      const tag = req.params?.tag;
      const result = await BlogService.getBlogsByTag(tag, { limit, offset, page });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async updateBlog(req, res) {
    try {
      const { id } = req.params;
      const payload = req.body;
      if (req.method == "PUT") {
        const result = await BlogService.updateBlog(id, payload);
        res.status(200).json(result);
      } else if (req.method == "PATCH") {
        const result = await BlogService.updateBlog(id, payload);
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: "Bad request!" });
      }
    } catch (e) {
      console.log("🚀 ~ file: blog.controller.js:62 ~ BlogController ~ updateBlog ~ e:", e);
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async likeBlog(req, res) {
    try {
      const ip = req.ip;
      const { id } = req.params;
      const result = await BlogService.likeBlog(id, ip);
      console.log("🚀 ~ file: blog.controller.js:71 ~ BlogController ~ likeBlog ~ result:", result);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async searchBlog(req, res) {
    try {
      const payload = req.query;
      const result = await BlogService.searchData(payload);
      res.status(200).json(result);
    } catch (e) {
      console.log("🚀 ~ file: blog.controller.js:94 ~ BlogController ~ searchBlog ~ e:", e);
      res.status(400).json({ error: "Bad request!" });
    }
  }

  async sort(req, res) {
    try {
      const payload = req.query;
      const result = await BlogService.sort(payload);
      res.status(200).json(result);
    } catch (e) {
      console.log("🚀 ~ file: blog.controller.js:94 ~ BlogController ~ searchBlog ~ e:", e);
      res.status(400).json({ error: "Bad request!" });
    }
  }
}

module.exports = new BlogController();
