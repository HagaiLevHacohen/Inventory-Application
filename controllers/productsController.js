// controllers/productsController.js

const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const emojiRegex = require("emoji-regex");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getProducts = async (req, res) => {
  const products = await db.getAllProducts(req.query);
  const categories = await db.getAllCategories();
  res.render("products", { products: products, categories: categories });
};

const getViewProduct = async (req, res) => {
  const product = await db.getProduct(req.params.productID);
  res.render("viewProduct", { product: product });
};

const postViewProduct = async (req, res) => {
  if (req.query._method === "DELETE") {
    await db.deleteProduct(req.params.productID);
    return res.redirect("/products");
  }

  res.status(400).send("Invalid request");
};

const getProductsNew = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("newProduct", { categories: categories, values: {}, errors: [] });
};

const getEditProduct = async (req, res) => {
  const categories = await db.getAllCategories();
  const product = await db.getProduct(req.params.productID);
  res.render("editProduct", {
    categories: categories,
    values: {},
    product: product,
    errors: [],
  });
};

const validateProduct = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Name is required"),

  body("price").isFloat({ min: 0 }).withMessage("Price must be a valid number"),

  body("brand")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Brand is required"),

  body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a number"),

  body("emoji").custom((emoji) => {
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

  await db.insertProduct({
    name,
    price,
    brand,
    quantity,
    emoji,
    categoryName: category,
  });

  res.redirect("/products");
};

const postEditProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const categories = await db.getAllCategories();
    const product = await db.getProduct(req.params.productID);

    return res.render("editProduct", {
      categories: categories,
      errors: errors.array(),
      values: req.body,
      product: product,
    });
  }

  // Only use matchedData when validation PASSES
  const { name, price, brand, quantity, emoji, category } = matchedData(req);

  await db.updateProduct({
    productId: req.params.productID,
    name,
    price,
    brand,
    quantity,
    emoji,
    categoryName: category,
  });

  res.redirect("/products");
};

module.exports = {
  getProducts,
  getProductsNew,
  postProductsNew,
  validateProduct,
  getViewProduct,
  postViewProduct,
  getEditProduct,
  postEditProduct,
};
