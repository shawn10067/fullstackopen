const { ReadingList } = require("../models/index");
const express = require("express");
const readingRouter = express.Router();

// getting middleware
const {
  blogFinder,
  tokenExtractor,
  userTokenExtractor,
  tokenVerify,
} = require("../middleware");

// the main post route
readingRouter.post("/", async (req, res) => {
  if (req.body && req.body.blogId && req.body.userId) {
    const haveRead = await ReadingList.findOne({
      where: {
        ...req.body,
      },
    });
    if (haveRead) {
      throw new Error("you already read this");
    }
    const newRead = await ReadingList.create({ ...req.body, read: false });
    await newRead.save();
    return res.status(201).json(newRead);
  }
  throw new Error("incorrect/invalid information");
});

// the main put route
readingRouter.put(
  "/:id",
  [tokenExtractor, tokenVerify, userTokenExtractor],
  async (req, res) => {
    const { user } = req;
    const userId = user.id;
    const { id } = req.params;
    const chosenRead = await ReadingList.findByPk(id);
    console.log(chosenRead);
    if (userId === chosenRead.userId) {
      chosenRead.read = req.body.read;
      await chosenRead.save();
      return res.status(200).json(chosenRead);
    } else {
      return res.sendStatus(400);
    }
  }
);

module.exports = readingRouter;
