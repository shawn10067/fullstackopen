const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const body = request.body;

  // making sure that the bdoy contains the right information
  if (!(body.userName && body.password)) {
    return response
      .status(401)
      .json({ error: "Invalid account format." })
      .end();
  }

  // getting the user
  const foundUser = await User.findOne({ userName: body.userName });

  // if we can't find the user
  if (!foundUser) {
    return response.status(404).json({ error: "Account not found." }).end();
  }

  // if we have found the user, compare the account passwords
  const isSame = await bcrypt.compare(body.password, foundUser.passwordHash);

  // if password is wrong
  if (!isSame) {
    return response.status(401).json({ error: "Invalid password." }).end();
  }

  // creating an object to tokenize and for the client to use
  const tokenObj = {
    userName: foundUser.userName,
    id: foundUser._id,
  };

  // returning token if right
  const token = jwt.sign(tokenObj, process.env.SECRET);

  response
    .status(200)
    .json({
      token,
      userName: foundUser.userName,
      name: foundUser.name,
    })
    .end();
});

module.exports = loginRouter;
