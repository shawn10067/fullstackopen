const Blog = require("../models/blog");
const express = require("express");
const blogRouter = express.Router();

// getting middleware
const { blogFinder, tokenExtractor } = require("../middleware");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// the main get routes

blogRouter.get("/", async (_, res) => {
  // getting all blogs
  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
  });
  return res.json(blogs);
});

blogRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  // getting the blog
  console.log(user, req.body);
  const blog = await Blog.create({
    ...req.body,
    userId: Number(user.id),
  });
  return res.json(blog);
});

// the ID routes
blogRouter.delete("/:id", [tokenExtractor, blogFinder], async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  return res.sendStatus(204);
});

blogRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog && req.body.likes) {
    const { blog } = req;
    blog.likes = req.body.likes;
    await blog.save();
    return res.status(200).json({ blog });
  } else {
    throw new Error("Incorrect id");
  }
});

module.exports = blogRouter;
