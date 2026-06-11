const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

const {
  getCache,
  setCache,
} = require("../utils/cache");

/*
 GET PRODUCTS
 CACHE-ASIDE IMPLEMENTATION
*/
const getProducts = asyncHandler(
  async (req, res) => {

    console.time("Product Query");

    const cacheKey = "products:all";

    const cachedData =
      await getCache(cacheKey);

    if (cachedData) {

      console.log(
        "CACHE HIT -> products"
      );

      console.timeEnd(
        "Product Query"
      );

      return res.json(cachedData);
    }

    console.log(
      "CACHE MISS -> products"
    );

    const products =
      await Product.find();

    await setCache(
      cacheKey,
      products,
      300
    );

    console.timeEnd(
      "Product Query"
    );

    res.json(products);
  }
);

/*
 GET PRODUCT BY ID
 CACHE-ASIDE IMPLEMENTATION
*/
const getProductById =
asyncHandler(async (req, res) => {

  console.time(
    "Single Product Query"
  );

  const cacheKey =
    `product:${req.params.id}`;

  const cached =
    await getCache(cacheKey);

  if (cached) {

    console.log(
      "CACHE HIT -> single product"
    );

    console.timeEnd(
      "Single Product Query"
    );

    return res.json(cached);
  }

  console.log(
    "CACHE MISS -> single product"
  );

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {

    res.status(404);

    throw new Error(
      "Product not found"
    );
  }

  await setCache(
    cacheKey,
    product,
    300
  );

  console.timeEnd(
    "Single Product Query"
  );

  res.json(product);
});

/*
 CREATE PRODUCT
*/
const createProduct =
asyncHandler(async (req, res) => {

  const product =
    await Product.create(
      req.body
    );

  res.status(201).json(product);
});

/*
 UPDATE PRODUCT
*/
const updateProduct =
asyncHandler(async (req, res) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {

    res.status(404);

    throw new Error(
      "Product not found"
    );
  }

  product.name =
    req.body.name ||
    product.name;

  product.description =
    req.body.description ||
    product.description;

  product.category =
    req.body.category ||
    product.category;

  product.price =
    req.body.price ||
    product.price;

  product.stock =
    req.body.stock ||
    product.stock;

  product.image =
    req.body.image ||
    product.image;

  const updatedProduct =
    await product.save();

  res.json(updatedProduct);
});

/*
 DELETE PRODUCT
*/
const deleteProduct =
asyncHandler(async (req, res) => {

  const product =
    await Product.findById(
      req.params.id
    );

  if (!product) {

    res.status(404);

    throw new Error(
      "Product not found"
    );
  }

  await product.deleteOne();

  res.json({
    message:
      "Product deleted successfully",
  });
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};