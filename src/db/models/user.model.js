const mongoose = require("mongoose");
const { userRoleEnum, userRoleArray } = require("../../init/constants");

const user = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true, require: true },
    password: { type: String },
    role: { type: String, default: userRoleEnum.VIEWER, enum: userRoleArray },
    address: {
      type: Object,
      default: {
        to_district_id: 1452,
        to_ward_code: "21012",
      },
    },
  },
  {
    timestamps: true,
  }
);
user.set("toJSON", {
  virtuals: true,
  transform: function (_doc, ret, _options) {
    return {
      _id: ret._id,
      email: ret.email,
      avatar: ret.avatar,
      name: ret.name,
      address: ret.address,
      role: ret.role,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});
user.set("toObject", {
  virtuals: true,
  transform: function (_doc, ret, _options) {
    return {
      _id: ret._id,
      email: ret.email,
      avatar: ret.avatar,
      address: ret.address,
      name: ret.name,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
});
module.exports = mongoose.model("user", user);
