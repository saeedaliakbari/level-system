const express = require("express");
const authRoutes = require("./routes/auth");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use("/auth", authRoutes);

mongoose
  .connect("mongodb://0.0.0.0:27017/levelsystem", { autoIndex: true })
  .then((result) => {
    console.log("connect to mongodb");
    const server = app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
