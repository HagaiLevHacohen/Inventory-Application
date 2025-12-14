// controllers/indexController.js
const { body, validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getIndex = async (req, res) => {
  res.render("index", {});
};


module.exports = { getIndex };
