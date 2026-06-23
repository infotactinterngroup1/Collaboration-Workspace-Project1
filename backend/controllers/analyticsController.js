const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

const getAnalytics = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();

  const totalInventory = await Product.aggregate([
    {
      $group: {
        _id: null,
        stock: {
          $sum: "$stock",
        },
      },
    },
  ]);

  const inventoryValue = await Product.aggregate([
    {
      $group: {
        _id: null,
        totalValue: {
          $sum: {
            $multiply: ["$price", "$stock"],
          },
        },
      },
    },
  ]);

  res.json({
    totalProducts,
    totalStock: totalInventory[0]?.stock || 0,

    inventoryValue: inventoryValue[0]?.totalValue || 0,
  });
});

const getLowStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    stock: {
      $lt: 10,
    },
  });

  res.json(products);
});

module.exports = {
  getAnalytics,
  getLowStockProducts,
};
