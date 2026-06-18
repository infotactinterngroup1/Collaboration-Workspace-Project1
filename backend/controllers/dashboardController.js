const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

const Order = require("../models/Order");

const User = require("../models/User");

const { getCache, setCache } = require("../utils/cache");

const getDashboardStats = asyncHandler(async (req, res) => {
  const cacheKey = "dashboard:stats";

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Dashboard");

    return res.json(cached);
  }

  console.log("CACHE MISS -> Dashboard");

  const totalProducts = await Product.countDocuments();

  const totalUsers = await User.countDocuments();

  const totalOrders = await Order.countDocuments();

  const revenue = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const stats = {
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue: revenue[0]?.totalRevenue || 0,
  };

  await setCache(cacheKey, stats, 300);

  res.json(stats);
});

const getMonthlySales = asyncHandler(async (req, res) => {
  const sales = await Order.aggregate([
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },
        sales: {
          $sum: "$totalAmount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  res.json(sales);
});

const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: {
      $lt: 10,
    },
  })

    .sort({
      stock: 1,
    })

    .limit(10);

  res.json(products);
});

const getRecentOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()

    .populate("user", "name email")

    .sort({
      createdAt: -1,
    })

    .limit(10);

  res.json(orders);
});

const getTopSellingProducts = asyncHandler(async (req, res) => {
  const topProducts = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $group: {
        _id: "$products.product",
        totalSold: {
          $sum: "$products.quantity",
        },
      },
    },
    {
      $sort: {
        totalSold: -1,
      },
    },
    {
      $limit: 5,
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
  ]);

  res.json(topProducts);
});

module.exports = {
  getDashboardStats,
  getMonthlySales,
  getLowStockProducts,
  getRecentOrders,
  getTopSellingProducts,
};
