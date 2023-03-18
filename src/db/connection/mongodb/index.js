const mongoose = require("mongoose");
require("dotenv").config();
const DATABASE_URI = process.env.DATABASE_URI;

module.exports = async function connect() {
  try {
    await mongoose.connect(DATABASE_URI || "");
    console.log(" connect mongodb successful!!!!");
  } catch (err) {
    console.log("connect mongodb fail!!!", err);
  }
};
