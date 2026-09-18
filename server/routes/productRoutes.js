const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductByIdOrSlug,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect } = require("../middleware/auth");

router.get("/", getProducts);
router.get("/:idOrSlug", getProductByIdOrSlug);
router.post("/", protect, createProduct); // supports single object OR array for bulk add
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
