// controllers/categoriesController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData } = require("express-validator");

const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("categories", { categories: categories });
};

const getCategoriesNew = async (req, res) => {
  res.render("newCategory", { values: {}, errors: [] });
};

const getViewCategory = async (req, res) => {
  const category = await db.getCategory(req.params.categoryID);
  res.render("viewCategory", { category: category });
};

const getEditCategory = async (req, res) => {
  const category = await db.getCategory(req.params.categoryID);
  res.render("editCategory", { values: {}, errors: [], category: category });
};

const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Name is required"),

  body("color")
    .matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
    .withMessage("Color must be a valid hex code, e.g., #ff0000"),
];

const postCategoriesNew = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("newCategory", {
      errors: errors.array(),
      values: req.body,
    });
  }

  // Only use matchedData when validation PASSES
  const { name, color } = matchedData(req);
  await db.insertCategory({ name, color });

  res.redirect("/categories");
};

const postEditCategory = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const category = await db.getCategory(req.params.categoryID);
    return res.render("editCategory", {
      errors: errors.array(),
      values: req.body,
      category: category,
    });
  }

  // Only use matchedData when validation PASSES
  const { name, color } = matchedData(req);
  await db.updateCategory({ categoryId: req.params.categoryID, name, color });

  res.redirect("/categories");
};

module.exports = {
  getCategories,
  getCategoriesNew,
  postCategoriesNew,
  validateCategory,
  getViewCategory,
  getEditCategory,
  postEditCategory,
};
