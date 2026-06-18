const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
  getMonthlySales,
  getLowStockProducts,
  getRecentOrders,
  getTopSellingProducts,
} = require("../controllers/dashboardController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.get("/stats", protect, adminOnly, getDashboardStats);

router.get("/monthly-sales", protect, adminOnly, getMonthlySales);

router.get("/low-stock", protect, adminOnly, getLowStockProducts);

router.get("/recent-orders", protect, adminOnly, getRecentOrders);

router.get("/top-selling", protect, adminOnly, getTopSellingProducts);

module.exports = router;
