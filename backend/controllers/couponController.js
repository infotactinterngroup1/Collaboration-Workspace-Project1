const asyncHandler = require("express-async-handler");

const Coupon = require("../models/Coupon");

const Cart = require("../models/Cart");

const { deleteCache } = require("../utils/cache");

const applyCoupon = asyncHandler(
  async (req, res) => {
    const { code } = req.body;

    const userId = req.user._id;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!coupon) {
      res.status(404);
      throw new Error("Invalid Coupon");
    }

    const cart = await Cart.findOne({
      user: userId,
    });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.coupon = coupon.code;

    cart.discountPercentage = coupon.discount;

    await cart.save();

    await deleteCache(`cart:${userId}`);

    res.json({
      success: true,
      coupon: coupon.code,
      discount: coupon.discount,
    });
  },
);

module.exports = {
  applyCoupon,
};
