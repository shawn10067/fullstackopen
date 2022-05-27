const { User } = require("../models/index");
const express = require("express");
const { Blog } = require("../models/index");
const userRouter = express.Router();
const { usernameExtractor } = require("../middleware");

// main user retrival
userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      attributes: ["author", "title"],
      model: Blog,
    },
  });
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

// id specific actions
userRouter.put("/:username", usernameExtractor, async (req, res) => {
  if (req.user && req.body.username) {
    const { user } = req;
    user.username = req.body.username;
    await user.save();
    res.status(201).json(user);
  } else {
    res.sendStatus(204);
  }
});

module.exports = userRouter;
