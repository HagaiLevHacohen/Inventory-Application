// routes/productsRouter.js
const { Router } = require("express");
const { getProducts } = require('../controllers/productsController');

const productsRouter = Router();

// Routes: "/" is "/products"
productsRouter.get("/", getProducts);



module.exports = productsRouter;