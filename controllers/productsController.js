// controllers/productsController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getProducts = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("products", {});
};

const getProductsNew = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("newProduct", {});
};


module.exports = { getProducts, getProductsNew };
