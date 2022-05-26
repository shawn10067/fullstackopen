const Blog = require("../models/blog");
const express = require("express");
const blogRouter = express.Router();

// the main get routes

blogRouter.get("/", async (_, res) => {
  // getting all blogs
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  // getting the blog
  const blog = await Blog.create(req.body);
  return res.json(blog);
});

// ID helper
const blogFinder = async (req, res, next) => {
  const { id } = req.params;
  req.blog = await Blog.findByPk(Number(id));
  next();
};

// the ID routes
blogRouter.delete("/:id", blogFinder, async (req, res) => {
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
    throw new Error("Wrong Id Dipshit");
  }
});

module.exports = blogRouter;
