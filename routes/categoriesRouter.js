// routes/categoriesRouter.js
const { Router } = require("express");
const { getCategories, getCategoriesNew, postCategoriesNew, validateCategory } = require('../controllers/categoriesController');

const categoriesRouter = Router();

// Routes: "/" is "/categories"
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/new", getCategoriesNew);
categoriesRouter.post("/new", [validateCategory, postCategoriesNew]);


module.exports = categoriesRouter;