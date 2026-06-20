const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrendingProducts,
  addReview,
  getReviews,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { createProductValidation } = require("../validators/productValidator");

const validateRequest = require("../middleware/validateRequest");

/*
 * Public Routes
 */

// GET /api/products
router.get("/", getProducts);

// GET /api/products/trending
router.get("/trending", getTrendingProducts);

// GET /api/products/:id
router.get("/:id", getProductById);

/*
 * Admin Routes
 */

// POST /api/products
router.post(
  "/",
  protect,
  adminOnly,
  createProductValidation,
  validateRequest,
  createProduct,
);

// PUT /api/products/:id
router.put(
  "/:id",
  protect,
  adminOnly,
  createProductValidation,
  validateRequest,
  updateProduct,
);

// DELETE /api/products/:id
router.delete("/:id", protect, adminOnly, deleteProduct);

// POST /api/products/:id/reviews
router.post("/:id/reviews", protect, addReview);

// GET /api/products/:id/reviews
router.get("/:id/reviews", getReviews);

module.exports = router;
