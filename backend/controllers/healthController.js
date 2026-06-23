const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const redisClient = require("../config/redis");

const healthCheck = asyncHandler(async (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  const redisStatus = redisClient.isOpen ? "Connected" : "Disconnected";

  res.json({
    status: "OK",
    serverTime: new Date(),
    mongodb: mongoStatus,
    redis: redisStatus,
    uptime: process.uptime(),
  });
});

module.exports = {
  healthCheck,
};
