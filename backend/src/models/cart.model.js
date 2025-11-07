const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  name: String,
  price: Number,
  qty: Number,
  lineTotal: Number,
});

module.exports = mongoose.model("CartItem", CartItemSchema);
