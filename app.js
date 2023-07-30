import express from "express";
import authRoutes from "./routes/auth.js";
import levelsRoutes from "./routes/levels.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Replace with the appropriate origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/levels", levelsRoutes);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(error.statusCode).json({ message: message });
});
mongoose
  .connect("mongodb://0.0.0.0:27017/levelsystem", { autoIndex: true })
  .then((result) => {
    console.log("connect to mongodb");
    const server = app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
