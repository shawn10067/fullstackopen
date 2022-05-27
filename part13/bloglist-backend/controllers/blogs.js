const { Blog } = require("../models/index");
const express = require("express");
const blogRouter = express.Router();

// getting middleware
const {
  blogFinder,
  tokenExtractor,
  userTokenExtractor,
} = require("../middleware");

const jwt = require("jsonwebtoken");
const User = require("../models/user");

// the main get routes

blogRouter.get("/", async (_, res) => {
  // getting all blogs
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"],
    },
    include: {
      attributes: ["name"],
      model: User,
    },
  });
  return res.json(blogs);
});

blogRouter.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  // getting the blog
  console.log(user.id, req.body);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
  });
  return res.json(blog);
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
    throw new Error("Incorrect id");
  }
});

module.exports = blogRouter;
