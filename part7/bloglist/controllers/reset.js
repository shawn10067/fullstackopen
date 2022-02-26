const resetRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

resetRouter.post("/reset", async (request, response) => {
  console.log("Request Came In");
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.send(204).end();
});

module.exports = resetRouter;
