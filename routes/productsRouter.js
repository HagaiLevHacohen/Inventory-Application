// routes/productsRouter.js
const { Router } = require("express");
const { getProducts, getProductsNew, postProductsNew, validateProduct } = require('../controllers/productsController');

const productsRouter = Router();

// Routes: "/" is "/products"
productsRouter.get("/", getProducts);
productsRouter.get("/new", getProductsNew);
productsRouter.post("/new", [validateProduct, postProductsNew]);



module.exports = productsRouter;