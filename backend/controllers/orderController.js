const asyncHandler = require("express-async-handler");

const Cart = require("../models/Cart");

const Order = require("../models/Order");

const Product = require("../models/Product");

const {
  getCache,
  setCache,
  deleteCache,
} = require("../utils/cache");

const placeOrder = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({
      user: userId,
    })
      .populate("products.product");

    if (!cart || cart.products.length === 0) {
      res.status(400);
      throw new Error("Cart is empty");
    }

    let total = 0;

    const orderItems = [];

    for (const item of cart.products) {
      const product = item.product;

      /*
 STOCK CHECK
 */

      if (product.stock < item.quantity) {
        res.status(400);

        throw new Error(
          `${product.name}

   out of stock`,
        );
      }

      /*
 INVENTORY DECREMENT
 */

      product.stock -= item.quantity;

      await product.save();

      total += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      user: userId,
      products: orderItems,
      totalAmount: total,
    });

    /*
 CLEAR CART
 */

    cart.products = [];
    await cart.save();

    /*
 DELETE CACHE
 */

    await deleteCache(`cart:${userId}`);
    await deleteCache(`orders:${userId}`);
    await deleteCache("products:all");
    res.status(201).json(order);
  },
);

const getMyOrders = asyncHandler(
  async (req, res) => {
    const userId = req.user._id;
    const cacheKey = `orders:${userId}`;
    const cached = await getCache(cacheKey);

    if (cached) {
      console.log("CACHE HIT -> Orders");
      return res.json(cached);
    }

    console.log("CACHE MISS -> Orders");

    const orders = await Order.find({
      user: userId,
    })
      .populate("products.product")

      .sort({
        createdAt: -1,
      });

    await setCache(cacheKey, orders, 300);

    res.json(orders);
  },
);

const getAllOrders = asyncHandler(
  async (req, res) => {
    const orders = await Order.find()
      .populate(
        "user",
        "name email",
      )

      .populate("products.product")

      .sort({
        createdAt: -1,
      });

    res.json(orders);
  },
);

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
};
