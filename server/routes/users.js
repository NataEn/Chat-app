const express = require("express");
const router = express.Router();
const { errHandler } = require("./util");
const User = require("../models/users");

/* GET all users. */
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    errHandler(err, req, res);
  }
});

/* get one specific user*/
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
  } catch (err) {
    errHandler(err, req, res);
  }

  res.send(`got user of id :${id}`);
});

/* create one user*/
router.post("/subscribe", async (req, res, next) => {
  console.log("in subscription page");
  console.log(req.body);

  const user = new User({
    name: req.body.name,
    image: req.body.image,
    hobbies: req.body.hobbies,
  });

  try {
    const newUser = await user.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    errHandler(err, req, res);
  }
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
