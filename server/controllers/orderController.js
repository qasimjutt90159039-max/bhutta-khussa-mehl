const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { mockStore } = require("../config/inMemoryStore");

// @desc    Place a new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { items, customer, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }
    if (!customer || !customer.fullName || !customer.phone || !customer.address || !customer.city) {
      return res.status(400).json({ message: "Complete customer details are required" });
    }

    if (mongoose.connection.readyState !== 1) {
      const order = mockStore.createOrder({ items, customer, paymentMethod });
      return res.status(201).json(order);
    }

    // Recalculate prices server-side from DB to prevent tampering
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.name || item.product}` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price: product.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      });
    }

    const shippingFee = subtotal >= 5000 ? 0 : 250;
    const total = subtotal + shippingFee;

    const order = await Order.create({
      items: verifiedItems,
      customer,
      paymentMethod: paymentMethod || "COD",
      subtotal,
      shippingFee,
      total,
    });

    // Decrement stock
    for (const item of verifiedItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private (Admin)
const getOrders = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockStore.getOrders());
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// @desc    Get single order by id (for order confirmation page)
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const order = mockStore.getOrderById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.json(order);
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const order = mockStore.updateOrderStatus(req.params.id, status);
      if (!order) return res.status(404).json({ message: "Order not found" });
      return res.json(order);
    }

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: "Failed to update order status", error: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
