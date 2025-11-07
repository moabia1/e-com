const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const errorHandler = require("./utils/erroHandler");

const app = express();

// Middlewares
app.use(
  cors()
);
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
