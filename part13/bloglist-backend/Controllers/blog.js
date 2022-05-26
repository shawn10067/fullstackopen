const Blog = require("../Models/blog");
const express = require("express");
const blogRouter = express.Router();
blogRouter.use(express.json());

blogRouter.get("/", async (req, res) => {
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

blogRouter.delete("/:id", async (req, res) => {
  try {
    // getting the blog
    const { id } = req.params;
    const foundBlog = await Blog.findByPk(Number(id));

    // destroying it
    await foundBlog.destroy();

    return res.status(204);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = blogRouter;
