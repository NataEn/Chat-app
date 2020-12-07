const { User } = require("../models/users");
const { errHandler } = require("../routes/util");

const User = require("../models/users");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../webSockets/users");
