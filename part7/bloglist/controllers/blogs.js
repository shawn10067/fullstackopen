const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();

blogRouter.get("/api/blogs", async (request, response, next) => {
  let blogs = await Blog.find({}).populate("user", { userName: 1, name: 1 });
  response.json(blogs).end();
});

blogRouter.delete("/api/blogs/:id", async (request, response) => {
  const id = request.params.id;

  // getting the right blog
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(401).json({ error: "Cannot find blog" }).end();
  }

  // comparing the token id to the user id
  const user = request.user;

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(blog.id.toString());
  } else {
    response.status(401).json({ error: "Invalid permissions" }).end();
  }

  response.status(204).end();
});

blogRouter.post("/api/blogs", async (request, response, next) => {
  if (!(request.body.title && request.body.url)) {
    return response.status(400).end();
  }

  const body = request.body;
  if (!body.likes) {
    body.likes = 0;
  }

  if (!body.comments) {
    body.comments = [];
  }

  const token = request.token;

  if (!token.id) {
    return response
      .status(401)
      .json({ error: "token missing or invalid" })
      .end();
  }

  const selectedUser = request.user;

  const blog = new Blog({
    ...body,
    user: selectedUser._id,
  });

  let result = await blog.save();

  selectedUser.blogs = selectedUser.blogs.concat(blog._id);
  await selectedUser.save();
  response.status(201).json(result).end();
});

blogRouter.put("/api/blogs/:id", async (request, response, next) => {
  const user = request.user;

  if (!user) {
    return response.status(404).json({ error: "Invalid credentials" }).end();
  }

  let blogFound = await Blog.findById(request.params.id);

  if (!blogFound) {
    return response.status(404).json({ error: "Can't find your blog" }).end();
  }

  if (
    blogFound.user.toString() !== user._id.toString() &&
    !(
      Object.keys(request.body).length === 1 &&
      Object.keys(request.body).includes("likes")
    )
  ) {
    return response.status(400).json({ error: "Invalid credentials" }).end();
  }

  let updateBlogRes = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body
  );

  console.log(updateBlogRes);
  response.status(204).send("hello").end();
});

module.exports = blogRouter;
