const mongoose = require("mongoose");
const { statusArray } = require("../../init/constants");
const { syncElasticMiddleware } = require("../../middleware");
const { Schema } = mongoose;

const cart = new mongoose.Schema(
  {
    status: { type: String, require: true, enum: statusArray, default: "pending" },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    ip: { type: String },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", cart);
