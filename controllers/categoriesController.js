// controllers/categoriesController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData } = require("express-validator");


const getCategories = async (req, res) => {
  const categories = await db.getAllCategories();
  console.log(categories)
  res.render("categories", {categories : categories});
};

const getCategoriesNew = async (req, res) => {
  res.render("newCategory", {values: {}, errors: []});
};


const validateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage("Name is required"),

  body("color")
    .matches(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
    .withMessage("Color must be a valid hex code, e.g., #ff0000")
];

const postCategoriesNew = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("category/new", {
      errors: errors.array(),
      values: req.body,
    });
  }

  // Only use matchedData when validation PASSES
  const { name, color } = matchedData(req);

  console.log({ name, color });
  await db.insertCategory({ name, color });

  res.redirect("/categories");
};



module.exports = { getCategories, getCategoriesNew, postCategoriesNew, validateCategory };
