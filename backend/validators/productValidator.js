const { body } = require("express-validator");

const createProductValidation = [
  body("name").trim().notEmpty().withMessage("Product name is required"),

  body("price").isNumeric().withMessage("Price must be numeric"),

  body("stock").optional().isNumeric().withMessage("Stock must be numeric"),
];

module.exports = {
  createProductValidation,
};
