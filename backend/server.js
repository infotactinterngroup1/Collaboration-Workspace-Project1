require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

const logger = require("./middleware/logger");

const app = express();

app.use(logger);

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log(`Server run successfully on port ${PORT}`);
});