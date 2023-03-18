const mongoose = require("mongoose");
const { syncElasticMiddleware } = require("../../middleware");
const { Schema } = mongoose;

const product = new mongoose.Schema(
  {
    name: { type: String, require: true },
    tags: { type: Array, require: true },
    views: { type: Number, default: 0 },
    instock: { type: Number, default: 0 },
    price: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likersIp: [{ type: String }],
    autherId: { type: Schema.Types.ObjectId, ref: "user" },
    address: {
      type: Object,
      default: {
        from_district_id: 1454,
      },
    },
  },
  {
    timestamps: true,
  }
);
syncElasticMiddleware(product);
module.exports = mongoose.model("product", product);
