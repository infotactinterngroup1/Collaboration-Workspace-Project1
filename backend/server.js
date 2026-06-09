require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use(
  "/api/products",
  require("./routes/productRoutes")
);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=> {
    console.log(`Server run successfully on port ${PORT}`);
});