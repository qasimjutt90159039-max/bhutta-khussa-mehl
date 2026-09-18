const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const { mockStore } = require("../config/inMemoryStore");

const protect = async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_jwt_secret");

    if (mongoose.connection.readyState !== 1) {
      req.admin = mockStore.findAdminById(decoded.id);
      if (!req.admin) {
        return res.status(401).json({ message: "Not authorized, admin not found" });
      }
      return next();
    }

    req.admin = await Admin.findById(decoded.id).select("-password");
    if (!req.admin) {
      return res.status(401).json({ message: "Not authorized, admin not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

module.exports = { protect };
