// controllers/authorController.js

const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getIndex = async (req, res) => {
  // const messages = await db.getAllMessages();
  // console.log(messages)
  res.render("index", { title: "Mini Messageboard"});
};


module.exports = { getIndex };
