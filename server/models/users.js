const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  image: {
    type: Buffer,
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
