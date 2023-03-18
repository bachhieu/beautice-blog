const mongoose = require("mongoose");
const { syncElasticMiddleware } = require("../../middleware");
const { Schema } = mongoose;

const blog = new mongoose.Schema(
  {
    content: { type: String, require: true },
    tags: { type: Array, require: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likersIp: [{ type: String }],
    autherId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
syncElasticMiddleware(blog);
module.exports = mongoose.model("blog", blog);
