const Coupon = require("../models/Coupon");

const coupons = [
  {
    code: "SAVE10",
    discount: 10,
  },
  {
    code: "SAVE20",
    discount: 20,
  },
  {
    code: "WELCOME",
    discount: 15,
  },
];

const seedCoupons = async () => {
  await Coupon.deleteMany();
  await Coupon.insertMany(coupons);
  console.log("Coupons Seeded");
  process.exit();
};

seedCoupons();
