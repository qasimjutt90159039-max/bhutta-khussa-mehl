require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const Admin = require("../models/Admin");
const { initialProducts } = require("../config/inMemoryStore");

const run = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error("Could not connect to MongoDB. Please ensure MongoDB is running or MONGO_URI is set in .env.");
    process.exit(1);
  }

  await Product.deleteMany({});
  await Product.insertMany(initialProducts);
  console.log(`Seeded ${initialProducts.length} products successfully with full details & images.`);

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@bhuttakhussamehal.com").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({ email: adminEmail, password: adminPassword, name: "Store Admin" });
    console.log(`Created admin account: ${adminEmail}`);
  } else {
    console.log("Admin account already exists, skipping.");
  }

  await mongoose.connection.close();
  console.log("Database connection closed. Seed completed!");
  process.exit(0);
};

run().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
