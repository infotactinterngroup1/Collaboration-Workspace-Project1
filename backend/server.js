require("dotenv").config();
require("./utils/checkEnv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { connectRedis, redisClient } = require("./config/redis");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const logger = require("./middleware/logger");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

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

app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce API Running",
    docs: "/api-docs",
  });
});

/*
 ROUTES
*/
app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/analytics", require("./routes/analyticsRoutes"));

app.use("/api/cache", require("./routes/cacheRoutes"));

app.use("/api/search", require("./routes/searchRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/coupons", require("./routes/couponRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/notifications", require("./routes/notificationRoutes"));

app.use("/api/activity", require("./routes/activityRoutes"));

app.use("/api/health", require("./routes/healthRoutes"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/*
 API DOCUMENTATION INFO
*/

app.get("/api-docs-info", (req, res) => {
  res.json({
    apis: [
      "GET /api/products",
      "GET /api/products/:id",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "POST /api/orders",
      "GET /api/dashboard/stats",
      "GET /api/cart",
      "POST /api/coupons/apply",
    ],
  });
});

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
  console.log(`Server running on port ${PORT}`);
});
