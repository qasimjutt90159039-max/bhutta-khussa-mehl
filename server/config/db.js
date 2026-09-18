const mongoose = require("mongoose");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const { initialProducts } = require("./inMemoryStore");

let isAttempted = false;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return true;
  if (isAttempted && mongoose.connection.readyState === 0) return false;

  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bhutta-khussa-mehal";

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Auto-seed if database has no products yet
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Auto-seeding initial products...");
      await Product.insertMany(initialProducts);
      console.log("Auto-seeded initial products successfully.");
    }

    // Auto-seed admin if missing
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@bhuttakhussamehal.com").toLowerCase();
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || "admin123",
        name: "Store Admin",
      });
      console.log(`Created admin account: ${adminEmail}`);
    }

    return true;
  } catch (error) {
    isAttempted = true;
    console.log(
      `[Info] MongoDB is not connected (${error.message}). Running in in-memory fallback mode so all store features work out of the box!`
    );
    return false;
  }
};

module.exports = connectDB;
