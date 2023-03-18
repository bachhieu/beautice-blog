const { blogModel } = require("./../db");
const ElasticService = require("./elasticsearch.service");
class Blog {
  async create(payload) {
    return await blogModel.create(payload);
  }

  async getAll({ limit, offset, page }) {
    const data = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("autherId", "name");
    const count = await blogModel.countDocuments();
    return { count, page, data };
  }

  async getBlogsByTag(tag, { limit, offset, page }) {
    const data = await blogModel
      .find({ tags: tag })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    const count = await blogModel.countDocuments();
    return { count, page, data };
  }

  async getOneById(id) {
    return await blogModel.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
  }

  async updateBlog(id, payload) {
    return await blogModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async likeBlog(id, ip) {
    console.log("🚀 ~ file: blog.service.js:37 ~ Blog ~ likeBlog ~ ip:", ip);
    const oldBlog = await blogModel.findById(id);
    if (oldBlog && oldBlog.likersIp?.includes(ip)) {
      return await blogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: -1 }, $pull: { likersIp: ip } },
        { new: true }
      );
    } else if (oldBlog && !oldBlog.likersIp?.includes(ip)) {
      return await blogModel.findByIdAndUpdate(
        id,
        { $inc: { likes: 1 }, $push: { likersIp: ip } },
        { new: true }
      );
    } else {
      throw new Error("Bad request!");
    }
  }

  async searchData(payload) {
    const index = "blog";
    return ElasticService.searchData(index, payload);
  }

  async sort(payload) {
    const index = "blog";
    return ElasticService.sort(index, payload);
  }
}
module.exports = new Blog();
