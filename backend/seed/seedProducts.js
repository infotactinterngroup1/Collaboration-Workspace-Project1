require("dotenv").config();

const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const Product = require("../models/Product");
const generateEmbedding = require("../utils/generateEmbedding");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const categories = ["Electronics", "Fashion", "Books", "Home", "Sports"];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    const products = [];

    for (let i = 0; i < 1000; i++) {
      const name = faker.commerce.productName();

      const description = faker.commerce.productDescription();

      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const price = Number(
        faker.commerce.price({
          min: 100,
          max: 5000,
        }),
      );

      const stock = faker.number.int({
        min: 1,
        max: 100,
      });

      const image = faker.image.url();

      const embedding = generateEmbedding(
        `${name}
        ${description}
        ${category}`,
      );

      products.push({
        name,
        description,
        category,
        price,
        stock,
        image,
        embedding,
      });
    }

    await Product.insertMany(products);

    console.log("1000 products inserted successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
