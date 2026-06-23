require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({
    email: "admin@test.com",
  });

  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
    role: "admin",
  });

  console.log("Admin created");
  process.exit();
}

seedAdmin();
