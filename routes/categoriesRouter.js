// routes/categoriesRouter.js
const { Router } = require("express");
const { getCategories } = require('../controllers/categoriesController');

const categoriesRouter = Router();

// Routes: "/" is "/categories"
categoriesRouter.get("/", getCategories);



module.exports = categoriesRouter;