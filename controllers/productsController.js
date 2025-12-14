// controllers/productsController.js

const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const emojiRegex = require("emoji-regex");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getProducts = async (req, res) => {
  const products = await db.getAllProducts();
  console.log(products)
  res.render("products", {products: products});
};

const getProductsNew = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("newProduct", {categories: categories, values: {}, errors: []});
};

const validateProduct = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Name is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a valid number"),

  body("brand")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Brand is required"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a number"),

  body("emoji")
    .custom((emoji) => {
      const regex = emojiRegex();
      const matches = emoji.match(regex);

      if (!matches || matches.length !== 1 || matches[0] !== emoji) {
        throw new Error("Invalid emoji");
      }
      return true;
    }),

  body("category")
    .isAlpha()
    .withMessage("Invalid category")
    .custom(async (categoryName) => {
      const result = await db.getCategoryID(categoryName);
      if (!result) {
        throw new Error("Category not found");
      }
      return true;
    }),
];

const postProductsNew = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    return res.render("newProduct", {
      categories: categories,
      errors: errors.array(),
      values: req.body,
    });
  }

  // Only use matchedData when validation PASSES
  const { name, price, brand, quantity, emoji, category } = matchedData(req);

  await db.insertProduct({ name, price, brand, quantity, emoji, categoryName: category });

  res.redirect("/products");
};

module.exports = { getProducts, getProductsNew, postProductsNew, validateProduct };
