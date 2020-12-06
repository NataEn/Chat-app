const dbConfig = require("../config/mongodb");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoConnection = mongoose.connection;
mongoConnection.on("open", () => {
  console.log("mongoDb connected...");
});
mongoConnection.on("error", (err) => console.error(`mongoDb: ${err}`));
