const { ReadingList } = require("../models/index");
const express = require("express");
const readingRouter = express.Router();

// getting middleware
const {
  blogFinder,
  tokenExtractor,
  userTokenExtractor,
} = require("../middleware");

// the main post route
readingRouter.post("/", async (req, res) => {
  if (req.body && req.body.blogId && req.body.userId) {
    const newRead = await ReadingList.create({ ...req.body, read: false });
    await newRead.save();
    return res.status(201).json(newRead);
  }
  return res.sendStatus(400);
});

// the main put route
readingRouter.put(
  "/:id",
  [tokenExtractor, userTokenExtractor],
  async (req, res) => {
    const { user } = req;
    const userId = user.id;
    const blogId = req.params;
    const chosenRead = await ReadingList.findOne({
      where: {
        userId,
        blogId,
      },
    });
    chosenRead.read = req.body.read;
    await chosenRead.save();
    res.status(202).json(chosenRead);
  }
);

module.exports = readingRouter;
