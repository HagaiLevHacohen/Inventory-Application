// controllers/indexController.js
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getIndex = async (req, res) => {
  const search = req.query.search;

  if (search) {
    const product = await db.getProductByName(search);
    if (product) {
      return res.redirect(`/products/${product.id}`);
    }
  }

  res.render("index");
};

module.exports = { getIndex };
