// routes/categoriesRouter.js
const { Router } = require("express");
const { getCategories, getCategoriesNew, postCategoriesNew, validateCategory, getViewCategory } = require('../controllers/categoriesController');

const categoriesRouter = Router();

// Routes: "/" is "/categories"
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/new", getCategoriesNew);
categoriesRouter.post("/new", [validateCategory, postCategoriesNew]);
categoriesRouter.get("/:categoryID", getViewCategory);


module.exports = categoriesRouter;