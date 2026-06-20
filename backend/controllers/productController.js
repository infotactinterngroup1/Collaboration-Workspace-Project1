const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");
const User = require("../models/User");
const createNotification = require("../utils/createNotification");
const generateEmbedding = require("../utils/generateEmbedding");
const {
  getCache,
  setCache,
  deleteCache,
  clearProductsCache,
} = require("../utils/cache");
const logActivity = require("../utils/logActivity");

/*
 GET PRODUCTS
 CACHE-ASIDE IMPLEMENTATION
*/
const getProducts = asyncHandler(async (req, res) => {
  console.time("Product Query");

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

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const priceFilter = {};

  if (req.query.minPrice) {
    priceFilter.price = {
      ...priceFilter.price,

      $gte: Number(req.query.minPrice),
    };
  }

  if (req.query.maxPrice) {
    priceFilter.price = {
      ...priceFilter.price,

      $lte: Number(req.query.maxPrice),
    };
  }

  const filters = {
    ...keyword,
    ...category,
    ...priceFilter,
  };

  let sort = {};

  switch (req.query.sort) {
    case "priceAsc":
      sort.price = 1;

      break;

    case "priceDesc":
      sort.price = -1;

      break;

    case "latest":
      sort.createdAt = -1;

      break;

    default:
      sort.createdAt = -1;
  }

  const cacheKey = `products:${JSON.stringify(req.query)}`;

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Filtered Products");

    console.timeEnd("Product Query");

    return res.json(cached);
  }

  console.log("CACHE MISS -> Filtered Products");

  const count = await Product.countDocuments(filters);

  const products = await Product.find(filters)

    .sort(sort)

    .skip((page - 1) * limit)

    .limit(limit);

  const response = {
    totalProducts: count,

    currentPage: page,

    totalPages: Math.ceil(count / limit),

    products,
  };

  await setCache(cacheKey, response, 300);

  console.timeEnd("Product Query");

  res.json(response);
});

/*
 GET PRODUCT BY ID
 CACHE-ASIDE IMPLEMENTATION
*/
const getProductById = asyncHandler(async (req, res) => {
  console.time("Single Product Query");

  const cacheKey = `product:${req.params.id}`;

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> single product");

    console.timeEnd("Single Product Query");

    return res.json(cached);
  }

  console.log("CACHE MISS -> single product");

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);

    throw new Error("Product not found");
  }

  await setCache(cacheKey, product, 300);

  console.timeEnd("Single Product Query");

  res.json(product);
});

/*
 CREATE PRODUCT
*/
const createProduct = asyncHandler(async (req, res) => {
  const embedding = generateEmbedding(
    `${req.body.name}
    ${req.body.description}
    ${req.body.category}`,
  );

  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    price: req.body.price,
    stock: req.body.stock,
    image: req.body.image,
    embedding,
  });

  await logActivity(req.user._id, "CREATE_PRODUCT", `${product.name} created`);

  /*
    CACHE INVALIDATION
  */

  await deleteCache("dashboard:stats");
  await deleteCache("products:trending");
  await clearProductsCache();

  console.log("CACHE INVALIDATED -> products:all");

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

  product.description = req.body.description || product.description;

  product.category = req.body.category || product.category;

  product.price = req.body.price ?? product.price;

  product.stock = req.body.stock ?? product.stock;

  product.image = req.body.image || product.image;

  /*
    REGENERATE EMBEDDING
  */

  product.embedding = generateEmbedding(
    `${product.name}
      ${product.description}
      ${product.category}`,
  );

  const updatedProduct = await product.save();

  if (product.stock < 10) {
    const admin = await User.findOne({
      isAdmin: true,
    });
    if (admin) {
      await createNotification(
        admin._id,
        "Low Stock Alert",
        `${product.name} stock is only ${product.stock}`,
      );
    }
  }

  /*
   CACHE INVALIDATION
  */

  await deleteCache(`product:${req.params.id}`);
  await deleteCache("dashboard:stats");
  await deleteCache("products:trending");
  await clearProductsCache();

  console.log(`CACHE INVALIDATED -> product:${req.params.id}`);

  console.log("CACHE INVALIDATED -> products:all");

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

  /*
   CACHE INVALIDATION
  */

  await deleteCache(`product:${req.params.id}`);
  await deleteCache("dashboard:stats");
  await deleteCache("products:trending");
  await clearProductsCache();

  console.log(`CACHE INVALIDATED -> product:${req.params.id}`);

  console.log("CACHE INVALIDATED -> products:all");

  res.json({
    message: "Product deleted successfully",
  });
});

/* Trending Products */

const getTrendingProducts = asyncHandler(async (req, res) => {
  const cacheKey = "products:trending";

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Trending");

    return res.json(cached);
  }

  console.log("CACHE MISS -> Trending");

  const products = await Product.find()

    .sort({
      stock: -1,
    })

    .limit(5);

  await setCache(cacheKey, products, 300);

  res.json(products);
});

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const alreadyReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString(),
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Product already reviewed");
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.reviews.length;

  await product.save();

  await deleteCache(`reviews: ${req.params.id}`);
  await deleteCache(`product: ${req.params.id}`);
  await deleteCache("dashboard:stats");

  res.status(201).json({
    message: "Review added",
  });
});

const getReviews = asyncHandler(async (req, res) => {
  const cacheKey = `reviews: ${req.params.id}`;

  const cached = await getCache(cacheKey);

  if (cached) {
    console.log("CACHE HIT -> Reviews");
    return res.json(cached);
  }

  console.log("CACHE MISS -> Reviews");

  const product = await Product.findById(req.params.id)

    .populate("reviews.user", "name");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await setCache(cacheKey, product.reviews, 300);

  res.json(product.reviews);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrendingProducts,
  addReview,
  getReviews,
};
