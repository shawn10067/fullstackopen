const User = require("../models/user");
const express = require("express");
const loginRouter = express.Router();

const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const isValid = password === "password";
  if (username && isValid) {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      const userInfo = {
        username,
        id: user.id,
      };
      const token = jwt.sign(userInfo, SECRET);
      return res.status(200).json({ token });
    }
  }

  return res.sendStatus(404);
});

module.exports = loginRouter;
