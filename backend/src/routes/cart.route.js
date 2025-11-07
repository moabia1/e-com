const express = require("express");
const {
  getCart,
  addToCart,
  removeCartItem,
  checkout,
} = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", removeCartItem);
router.post("/checkout", checkout);

module.exports = router;
