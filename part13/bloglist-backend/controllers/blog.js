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
  try {
    // getting the blog
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ID helper
const blogFinder = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.blog = await Blog.findByPk(Number(id));
    next();
  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
};

// the ID routes
blogRouter.delete("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.json({ error });
  }
});

module.exports = blogRouter;
