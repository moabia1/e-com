const CartItem = require("../models/cart.model");

// Mock user
const USER_ID = "user_1";

exports.getCart = async (req, res) => {
  const items = await CartItem.find({ userId: USER_ID });
  const total = items.reduce((sum, i) => sum + i.lineTotal, 0);
  res.json({ items, total });
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, name, price, qty } = req.body;
    const existing = await CartItem.findOne({ userId: USER_ID, productId });

    if (existing) {
      existing.qty += qty;
      existing.lineTotal = existing.qty * existing.price;
      await existing.save();
    } else {
      await CartItem.create({
        userId: USER_ID,
        productId,
        name,
        price,
        qty,
        lineTotal: price * qty,
      });
    }

    const items = await CartItem.find({ userId: USER_ID });
    const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

    res.json({ items, total });
  } catch (err) {
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);

    const items = await CartItem.find({ userId: USER_ID });
    const total = items.reduce((sum, i) => sum + i.lineTotal, 0);

    res.json({ items, total });
  } catch (err) {
    next(err);
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { cartItems, name, email } = req.body;

    const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    const receipt = {
      receiptId: "R-" + Date.now(),
      name,
      email,
      total,
      timestamp: new Date().toISOString(),
    };

    // Clear cart after checkout
    await CartItem.deleteMany({ userId: USER_ID });

    res.json({ receipt });
  } catch (err) {
    next(err);
  }
};
