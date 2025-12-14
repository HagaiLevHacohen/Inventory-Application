// controllers/categoriesController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getCategories = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("categories", {});
};


module.exports = { getCategories };
