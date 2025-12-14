// routes/categoriesRouter.js
const { Router } = require("express");
const { getCategories, getCategoriesNew } = require('../controllers/categoriesController');

const categoriesRouter = Router();

// Routes: "/" is "/categories"
categoriesRouter.get("/", getCategories);
categoriesRouter.get("/new", getCategoriesNew);



module.exports = categoriesRouter;