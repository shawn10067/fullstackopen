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
    console.log("Searching for", req.query.search);
    where.title = {
      [Op.substring]: req.query.search,
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
    where,
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
