require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const {
  connectRedis,
  redisClient,
} = require("./config/redis");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const logger = require("./middleware/logger");

const app = express();

/*
 DATABASE CONNECTION
*/
connectDB();

/*
 REDIS CONNECTION
*/
connectRedis();

/*
 MIDDLEWARES
*/
app.use(cors());
app.use(express.json());
app.use(logger);

/*
 HEALTH CHECK
*/
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

/*
 CACHE STATUS ENDPOINT
 DAY 5 STEP 9
*/
app.get("/api/cache-status", async (req, res) => {
  try {
    const keys = await redisClient.keys("*");

    res.json({
      totalKeys: keys.length,
      keys,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/*
 ROUTES
*/
app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/analytics",
  require("./routes/analyticsRoutes")
);

/*
 ERROR HANDLERS
*/
app.use(notFound);
app.use(errorHandler);

/*
 SERVER
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});