const bcrypt = require("bcrypt");
const User = require("../models/user");
const Blog = require("../models/blog");
const userRouter = require("express").Router();

userRouter.get("/", async (request, response) => {
  let users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    author: 1,
  });
  response.json(users).end();
});

userRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!(body.userName && body.password)) {
    return response.status(401).json({ error: "Invalid Format." }).end();
  }

  // ensuring that the password is valid
  if (body.password.length <= 3) {
    return response.status(401).json({ error: "Invalid Password." }).end();
  }

  const hash = await bcrypt.hash(body.password, 10);

  // ensuring that the username is valid
  const newUser = new User({
    userName: body.userName,
    name: body.name,
    passwordHash: hash,
    blogs: [],
  });

  try {
    let returnedUser = await newUser.save();
    return response.json(returnedUser).end();
  } catch {
    return response.status(401).json({ error: "Invalid Username." }).end();
  }
});

module.exports = userRouter;
