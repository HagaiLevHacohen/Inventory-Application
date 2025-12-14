// controllers/productsController.js

const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getProducts = async (req, res) => {
  const products = await db.getAllProducts();
  console.log(products)
  res.render("products", {products: products});
};

const getProductsNew = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("newProduct", {});
};

const postProductsNew = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  // res.render("newProduct", {});
};

module.exports = { getProducts, getProductsNew, postProductsNew };
