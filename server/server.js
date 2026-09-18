require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: "5mb" }));

// Ensure DB connection attempt on request
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // Graceful fallback to in-memory mode
  }
  next();
});

app.get("/api/health", (req, res) => {
  const mongoose = require("mongoose");
  res.json({
    status: "ok",
    store: "Bhutta Khussa Mehal API",
    mode: mongoose.connection.readyState === 1 ? "MongoDB" : "In-Memory Store (Ready)",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;

// When deployed on Vercel as a serverless function, Vercel imports this file
// and calls the exported app directly, so we only call app.listen() locally.
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
