const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { mockStore } = require("../config/inMemoryStore");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_jwt_secret", { expiresIn: "7d" });
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (mongoose.connection.readyState !== 1) {
      const admin = mockStore.findAdmin(email);
      if (!admin || !(await admin.matchPassword(password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      return res.json({
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        token: generateToken(admin._id),
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      token: generateToken(admin._id),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

// @desc    Get logged in admin profile
// @route   GET /api/auth/me
// @access  Private
const getAdminProfile = async (req, res) => {
  return res.json(req.admin);
};

module.exports = { loginAdmin, getAdminProfile };
