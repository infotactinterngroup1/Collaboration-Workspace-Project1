require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Coupon = require("../models/Coupon");

const coupons = [
  {
    code: "SAVE10",
    discount: 10,
    active: true,
  },
  {
    code: "SAVE20",
    discount: 20,
    active: true,
  },
  {
    code: "WELCOME",
    discount: 15,
    active: true,
  },
];

const seedCoupons = async () => {
  try {
    await connectDB();
    await Coupon.deleteMany();
    await Coupon.insertMany(coupons);
    console.log("Coupons Seeded Successfully");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedCoupons();
