const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../models/users");

const { errHandler, writeFile, readFile } = require("./util");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//creating  a get-user middleware
const getUser = async (req, res, next) => {
  console.log(req.params.id);
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null) {
      res.send({ message: "user not found" });
    }
  } catch (err) {
    errHandler(err, req, res);
  }
  res.user = user;
  next();
};

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
router.get("/:id", getUser, async (req, res, next) => {
  try {
    writeFile(`${res.user.name}.png`, res.user.image);
    res.json(res.user);
  } catch (err) {
    errHandler(err, req, res);
  }
});

/* create one user*/
router.post("/subscribe", upload.single("image"), async (req, res, next) => {
  try {
    const fileBuffer = await readFile(
      path.join(process.cwd(), "/uploads", req.file.filename)
    );
    const user = new User({
      name: req.body.name,
      image: fileBuffer,
      hobbies: req.body.hobbies,
    });
    const newUser = await user.save();
    res.status(201).json({ user: newUser });
  } catch (err) {
    errHandler(err, req, res);
  }
});

/* updating one user according to what is sent*/
router.patch(
  "/:id",
  getUser,
  upload.single("image"),
  async (req, res, next) => {
    console.log("in patch");
    if (req.body.name) {
      console.log(req.body.name);
      res.user.name = req.body.name;
    }
    if (req.body.hobbies) {
      res.user.hobbies = req.body.hobbies;
    }
    if (req.file) {
      console.log(req.file);
      try {
        const fileBuffer = await readFile(
          path.join(process.cwd(), "/uploads", req.file.filename)
        );
        res.user.image = fileBuffer;
      } catch (err) {
        errHandler(err, req, res);
      }
    }
    try {
      const updatedUser = await res.user.save();
      res.send(`updating user ${updatedUser}`);
    } catch (err) {
      errHandler(err, req, res);
    }
  }
);

/* Deleting a user*/
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
