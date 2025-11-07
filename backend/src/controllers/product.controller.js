const axios = require("axios");
const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
  try {
    // Now fetch from DB and send to frontend
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("❌ Product fetch error:", err);
    res.status(500).json({ error: "Failed to load products" });
  }
};
