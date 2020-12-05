const dotenv = require("dotenv").config();
const dbConfig = require("../config/mongodb");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoConnection = mongoose.connection;
mongoConnection.on("open", () => {
  console.log("mongodDb connected...");
});
mongoConnection.on("error", (err) => console.error(err));