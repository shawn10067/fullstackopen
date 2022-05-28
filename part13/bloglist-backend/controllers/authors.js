const { Blog } = require("../models/index");
const express = require("express");
const authorRouter = express.Router();
const { sequelize } = require("../utils/db");

authorRouter.get("/", async (_, res) => {
  // getting all blogs
  const authors = await Blog.findAll({
    group: "author",
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "count"],
      [sequelize.fn("SUM", sequelize.col("likes")), "total likes"],
    ],
  });
  return res.json(authors);
});

module.exports = authorRouter;
