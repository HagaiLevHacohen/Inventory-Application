// routes/productsRouter.js
const { Router } = require("express");
const { getProducts, getProductsNew, postProductsNew, validateProduct, getViewProduct, postViewProduct, getEditProduct, postEditProduct } = require('../controllers/productsController');

const productsRouter = Router();

// Routes: "/" is "/products"
productsRouter.get("/", getProducts);
productsRouter.get("/new", getProductsNew);
productsRouter.post("/new", [validateProduct, postProductsNew]);
productsRouter.get("/:productID", getViewProduct);
productsRouter.post("/:productID", postViewProduct);
productsRouter.get("/edit/:productID", getEditProduct);
productsRouter.post("/edit/:productID", [validateProduct, postEditProduct]);



module.exports = productsRouter;