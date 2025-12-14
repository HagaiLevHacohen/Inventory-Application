// routes/productsRouter.js
const { Router } = require("express");
const { getProducts, getProductsNew, postProductsNew } = require('../controllers/productsController');

const productsRouter = Router();

// Routes: "/" is "/products"
productsRouter.get("/", getProducts);
productsRouter.get("/new", getProductsNew);
productsRouter.post("/new", postProductsNew);



module.exports = productsRouter;