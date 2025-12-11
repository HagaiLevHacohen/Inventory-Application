// app.js
require("dotenv").config();

const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

// app setup
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// middleware
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/", indexRouter);



const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})