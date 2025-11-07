const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: String, // fakestore id
  name: String,
  description: String,
  price: Number,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);
