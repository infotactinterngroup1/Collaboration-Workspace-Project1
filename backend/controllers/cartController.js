const asyncHandler = require("express-async-handler");

const Cart = require("../models/Cart");

const Product = require("../models/Product");

const { getCache, setCache, deleteCache } = require("../utils/cache");

/*
ADD TO CART
POST /api/cart
*/

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const userId = req.user._id;

  let cart = await Cart.findOne({
    user: userId,
  });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      products: [],
    });
  }

  const itemIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.products[itemIndex].quantity += quantity;
  } else {
    cart.products.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();
  await deleteCache(`cart:${userId}`);

  res.json({
    success: true,
    cart,
  });
});

/*
GET CART
GET /api/cart
*/

const getCart = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const cacheKey = `cart:${userId}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      console.log("CACHE HIT -> Cart");
      return res.json(cached);
    }

    console.log("CACHE MISS -> Cart");

    const cart = await Cart.findOne({
      user: userId,
    })
      .populate("products.product");

    await setCache(cacheKey, cart, 300);
    res.json(cart);
  },
);

/*
DELETE CART ITEM
DELETE /api/cart/:productId
*/

const removeFromCart = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId,
    );

    await cart.save();

    await deleteCache(`cart:${userId}`);

    res.json({
      success: true,
      cart,
    });
  },
);

/*
CART TOTAL
GET /api/cart/total
*/

const getCartTotal = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const total = await Cart.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: ["$product.price", "$products.quantity"],
            },
          },
        },
      },
    ]);

    res.json({
      total: total[0]?.total || 0,
    });
  },
);

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  getCartTotal,
};
