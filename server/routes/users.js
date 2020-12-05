var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* get one specific user*/
router.get("/:id", function (req, res, next) {
  const id = req.params.id;
  res.send(`got user of id :${id}`);
});

/* create one user*/
router.post("/", function (req, res, next) {
  res.send("creating a new user");
});

/* updating one user according to what is sent*/
router.patch("/:id", function (req, res, next) {
  const id = req.params.id;
  res.send(`updating user ${id}`);
});

/* Deleting a user*/
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.send(`deleting  user ${id}`);
});

module.exports = router;
