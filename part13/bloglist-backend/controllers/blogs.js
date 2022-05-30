const { Blog } = require("../models/index");
const User = require("../models/user");
const express = require("express");
const blogRouter = express.Router();
const { Op } = require("sequelize");

// getting middleware
const {
  blogFinder,
  tokenExtractor,
  userTokenExtractor,
} = require("../middleware");

// the main get routes

blogRouter.get("/", async (req, res) => {
  // holding the query status
  let where = {};

  if (req.query.search) {
    where[Op.or] = {};
    console.log("Searching for", req.query.search);
    where[Op.or].title = {
      [Op.iLike]: "%" + req.query.search + "%",
    };
    where[Op.or].author = {
      [Op.iLike]: "%" + req.query.search + "%",
    };
  }

  // getting all blogs
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"],
    },
    include: {
      attributes: ["name"],
      model: User,
    },
    order: [["likes", "DESC"]],
    where,
  });
  return res.json(blogs);
});

blogRouter.post("/", [tokenExtractor, userTokenExtractor], async (req, res) => {
  // getting the blog
  if (req.user) {
    const blog = await Blog.create({
      ...req.body,
      userId: req.user.id,
    });
    return res.json(blog);
  } else {
    throw new Error("Login first.");
  }
});

// the ID routes
blogRouter.delete(
  "/:id",
  [tokenExtractor, userTokenExtractor, blogFinder],
  async (req, res) => {
    if (req.user) {
      if (req.blog && req.blog.userId === req.user.id) {
        await req.blog.destroy();
      } else {
        console.log("ERROR, ID: ", req.blog.userId, req.user.id);
        throw new Error("wrong token bud");
      }
    }

    return res.sendStatus(204);
  }
);

blogRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog && req.body.likes) {
    const { blog } = req;
    blog.likes = req.body.likes;
    await blog.save();
    return res.status(200).json({ blog });
  } else {
    throw new Error("Incorrect format");
  }
});

module.exports = blogRouter;
