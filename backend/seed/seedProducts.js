require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Product = require("../models/Product");

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI
  );
};

const categories = [
  "Electronics",
  "Fashion",
  "Books",
  "Home",
  "Sports",
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    const products = [];

    for (let i = 0; i < 1000; i++) {
      products.push({
        name: faker.commerce.productName(),

        description:
          faker.commerce.productDescription(),

        category:
          categories[
            Math.floor(
              Math.random() *
                categories.length
            )
          ],

        price: Number(
          faker.commerce.price({
            min: 100,
            max: 5000,
          })
        ),

        stock: faker.number.int({
          min: 1,
          max: 100,
        }),

        image: faker.image.url(),
      });
    }

    await Product.insertMany(products);

    console.log(
      "1000 products inserted successfully"
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();