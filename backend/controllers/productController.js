const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

const {
  getCache,
  setCache,
  deleteCache,
} = require("../utils/cache");

/*
 GET PRODUCTS
 CACHE-ASIDE IMPLEMENTATION
*/
const getProducts =
asyncHandler(async (req, res) => {

  console.time("Product Query");

  const page =
    Number(req.query.page) || 1;

  const limit =
    Number(req.query.limit) || 10;

  const keyword =
    req.query.search
      ? {
          name: {
            $regex:
              req.query.search,

            $options: "i",
          },
        }
      : {};

  const category =
    req.query.category
      ? {
          category:
            req.query.category,
        }
      : {};

  const priceFilter = {};

  if (req.query.minPrice) {

    priceFilter.price = {
      ...priceFilter.price,

      $gte:
        Number(
          req.query.minPrice
        ),
    };
  }

  if (req.query.maxPrice) {

    priceFilter.price = {
      ...priceFilter.price,

      $lte:
        Number(
          req.query.maxPrice
        ),
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

  const cacheKey =
    `products:${JSON.stringify(
      req.query
    )}`;

  const cached =
    await getCache(cacheKey);

  if (cached) {

    console.log(
      "CACHE HIT -> Filtered Products"
    );

    console.timeEnd(
      "Product Query"
    );

    return res.json(cached);
  }

  console.log(
    "CACHE MISS -> Filtered Products"
  );

  const count =
    await Product.countDocuments(
      filters
    );

  const products =
    await Product.find(filters)

      .sort(sort)

      .skip(
        (page - 1) * limit
      )

      .limit(limit);

  const response = {

    totalProducts: count,

    currentPage: page,

    totalPages:
      Math.ceil(
        count / limit
      ),

    products,
  };

  await setCache(
    cacheKey,
    response,
    300
  );

  console.timeEnd(
    "Product Query"
  );

  res.json(response);

});

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
    await Product.create(req.body);

  /*
   CACHE INVALIDATION
  */

  await deleteCache(
    "products:all"
  );

  console.log(
    "CACHE INVALIDATED -> products:all"
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
    req.body.price ??
    product.price;

  product.stock =
    req.body.stock ??
    product.stock;

  product.image =
    req.body.image ||
    product.image;

  const updatedProduct =
    await product.save();

  /*
   CACHE INVALIDATION
  */

  await deleteCache(
    `product:${req.params.id}`
  );

  await deleteCache(
    "products:all"
  );

  console.log(
    `CACHE INVALIDATED -> product:${req.params.id}`
  );

  console.log(
    "CACHE INVALIDATED -> products:all"
  );

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

  /*
   CACHE INVALIDATION
  */

  await deleteCache(
    `product:${req.params.id}`
  );

  await deleteCache(
    "products:all"
  );

  console.log(
    `CACHE INVALIDATED -> product:${req.params.id}`
  );

  console.log(
    "CACHE INVALIDATED -> products:all"
  );

  res.json({
    message:
      "Product deleted successfully",
  });
});

/* Trending Products */

const getTrendingProducts =
asyncHandler(async (req, res) => {

  const cacheKey =
    "products:trending";

  const cached =
    await getCache(cacheKey);

  if (cached) {

    console.log(
      "CACHE HIT -> Trending"
    );

    return res.json(cached);
  }

  console.log(
    "CACHE MISS -> Trending"
  );

  const products =
    await Product.find()

      .sort({
        stock: -1,
      })

      .limit(5);

  await setCache(
    cacheKey,
    products,
    300
  );

  res.json(products);

});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTrendingProducts
};