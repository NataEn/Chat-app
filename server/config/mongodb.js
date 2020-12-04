const dotenv = require("dotenv").config();

module.exports = {
  test_url: `${process.env.MONGODB_URL}/MERN_Chat_test`,
  url: `${process.env.MONGODB_URL}/MERN_Chat`,
};
