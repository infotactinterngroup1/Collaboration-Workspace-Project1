const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  createProductValidation,
} = require("../validators/productValidator");

const validateRequest = require("../middleware/validateRequest");

router.post(
  "/",
  createProductValidation,
  validateRequest,
  createProduct
);

router.route("/")
  .get(getProducts);
  
router.route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;