const mongoose = require("mongoose");
const Product = require("../models/Product");
const { mockStore } = require("../config/inMemoryStore");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// @desc    Get all products (supports category, search, price filters + pagination)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json(mockStore.getProducts(req.query));
    }

    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    const query = {};
    if (category && category !== "All") query.category = category;
    if (search) query.$text = { $search: search };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price_asc") sortOption = { price: 1 };
    if (sort === "price_desc") sortOption = { price: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    return res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

// @desc    Get single product by slug or id
// @route   GET /api/products/:idOrSlug
// @access  Public
const getProductByIdOrSlug = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const product = mockStore.getProductByIdOrSlug(idOrSlug);
      if (!product) return res.status(404).json({ message: "Product not found" });
      return res.json(product);
    }

    let product = await Product.findOne({ slug: idOrSlug });
    if (!product) {
      product = await Product.findById(idOrSlug).catch(() => null);
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch product", error: error.message });
  }
};

// @desc    Create a new product (supports single or bulk array in body)
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const created = mockStore.createProduct(req.body);
      return res.status(201).json(created);
    }

    const payload = Array.isArray(req.body) ? req.body : [req.body];

    const docs = payload.map((p) => ({
      ...p,
      slug: p.slug ? slugify(p.slug) : slugify(`${p.name}-${Date.now()}`),
    }));

    const created = await Product.insertMany(docs, { ordered: true });
    return res.status(201).json(created.length === 1 ? created[0] : created);
  } catch (error) {
    return res.status(400).json({ message: "Failed to create product(s)", error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const updated = mockStore.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Product not found" });
      return res.json(updated);
    }

    const updates = { ...req.body };
    if (updates.name && !updates.slug) {
      updates.slug = slugify(`${updates.name}-${req.params.id.slice(-5)}`);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json(product);
  } catch (error) {
    return res.status(400).json({ message: "Failed to update product", error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const deleted = mockStore.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Product not found" });
      return res.json({ message: "Product deleted successfully" });
    }

    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
};
