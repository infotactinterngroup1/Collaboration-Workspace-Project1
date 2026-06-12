const express = require("express");

const router = express.Router();

const {
  getAnalytics,
  getLowStockProducts,
} = require(
  "../controllers/analyticsController"
);

const {
  protect,
  adminOnly,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  protect,
  adminOnly,
  getAnalytics
);

router.get(
  "/low-stock",
  protect,
  adminOnly,
  getLowStockProducts
);

module.exports = router;