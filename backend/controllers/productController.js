const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

/*
GET /api/products
Pagination + Search
*/

const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const keyword = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments(keyword);

  const products = await Product.find(keyword)
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    totalProducts: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    products,
  });
});

/*
GET PRODUCT BY ID
*/

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.json(product);
});

/*
CREATE PRODUCT
*/

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
});

/*
UPDATE PRODUCT
*/

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  product.name = req.body.name || product.name;
  product.description =
    req.body.description || product.description;

  product.category =
    req.body.category || product.category;

  product.price =
    req.body.price || product.price;

  product.stock =
    req.body.stock || product.stock;

  product.image =
    req.body.image || product.image;

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});

/*
DELETE PRODUCT
*/

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted successfully",
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};