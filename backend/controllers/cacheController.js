const asyncHandler = require("express-async-handler");

const { redisClient } = require("../config/redis");

const clearCache = asyncHandler(async (req, res) => {
  await redisClient.flushAll();
  res.json({
    success: true,
    message: "Redis cache cleared",
  });
});

module.exports = {
  clearCache,
};
