const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  createProductValidation,
} = require("../validators/productValidator");

const validateRequest = require(
  "../middleware/validateRequest"
);

/*
 * Public Routes
 */

// GET /api/products
router.get("/", getProducts);

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
  createProduct
);

// PUT /api/products/:id
router.put(
  "/:id",
  protect,
  adminOnly,
  createProductValidation,
  validateRequest,
  updateProduct
);

// DELETE /api/products/:id
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;