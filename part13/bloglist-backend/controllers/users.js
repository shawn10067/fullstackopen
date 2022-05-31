const { User } = require("../models/index");
const express = require("express");
const { Blog } = require("../models/index");
const userRouter = express.Router();
const { usernameExtractor } = require("../middleware");

// main user retrival
userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: ["author", "title"],
      },
    ],
  });
  res.status(200).json(users);
});

// getting a specific user
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const where = {};

  if (req.query && req.query.read) {
    where.read = req.query.read;
  }
  console.log(where);
  const user = await User.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Blog,
        attributes: ["author", "title", "url", "likes", "id"],
      },
      {
        model: Blog,
        as: "read_blogs",
        attributes: ["author", "title", "url", "likes", "id"],
        through: {
          attributes: ["read", "id"],
          where,
        },
      },
    ],
  });
  res.status(201).json(user);
});

// creating a user
userRouter.post("/", async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

/*
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
*/

module.exports = userRouter;
