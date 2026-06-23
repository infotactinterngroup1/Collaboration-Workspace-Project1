const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  getCartTotal,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.delete("/:productId", protect, removeFromCart);

router.get("/total", protect, getCartTotal);

module.exports = router;
