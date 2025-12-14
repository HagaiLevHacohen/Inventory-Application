// routes/productsRouter.js
const { Router } = require("express");
const { getProducts, getProductsNew } = require('../controllers/productsController');

const productsRouter = Router();

// Routes: "/" is "/products"
productsRouter.get("/", getProducts);
productsRouter.get("/new", getProductsNew);



module.exports = productsRouter;