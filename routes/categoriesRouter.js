// routes/categoriesRouter.js
const { Router } = require("express");
const { getCategories, getCategoriesNew, postCategoriesNew, validateCategory, getViewCategory, getEditCategory, postEditCategory } = require('../controllers/categoriesController');

const categoriesRouter = Router();

// Routes: "/" is "/categories"
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/new", getCategoriesNew);
categoriesRouter.post("/new", [validateCategory, postCategoriesNew]);
categoriesRouter.get("/:categoryID", getViewCategory);
categoriesRouter.get("/edit/:categoryID", getEditCategory);
categoriesRouter.post("/edit/:categoryID", [validateCategory, postEditCategory]);


module.exports = categoriesRouter;