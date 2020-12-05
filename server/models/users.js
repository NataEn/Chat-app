const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  hobbies: {
    type: Array,
    required: false,
  },
  rooms: {
    type: Array,
    required: true,
    default: ["news"],
  },
  subscriptionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
