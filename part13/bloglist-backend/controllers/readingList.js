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

module.exports = readingRouter;
