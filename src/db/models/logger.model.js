const mongoose = require("mongoose");
const { Schema } = mongoose;

const logger = new mongoose.Schema(
  {
    message: { type: String },
    ipAddress: { type: String },
    id: { type: String },
    path: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("logger", logger);
