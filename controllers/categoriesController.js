// controllers/categoriesController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { body, validationResult, matchedData } = require("express-validator");


const getCategories = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("categories", {});
};

const getCategoriesNew = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("newCategory", {});
};


module.exports = { getCategories, getCategoriesNew };
