// controllers/indexController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getIndex = async (req, res) => {
  res.render("index", {});
};


module.exports = { getIndex };
