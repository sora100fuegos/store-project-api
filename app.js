const express = require("express");
const mongoose = require("mongoose");
const ItemRoutes = require("./src/routes/items");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/items", ItemRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.url);
  } catch (err) {
    console.log("Failed to connect to Mongo", err);
  }
};

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running in ${process.env.PORT}`);
  connectDB();
});

module.exports = { app, server };