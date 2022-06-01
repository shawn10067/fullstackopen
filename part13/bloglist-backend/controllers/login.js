const User = require("../models/user");
const { Session } = require("../models/index");
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

    if (user && !user.disabled) {
      const userInfo = {
        username,
        id: user.id,
      };
      const token = jwt.sign(userInfo, SECRET);
      const userSession = await Session.findByPk(user.id);
      if (!userSession) {
        const newUserSession = await Session.create({
          userId: user.id,
          token,
        });
        await newUserSession.save();
      } else {
        userSession.token = token;
        await userSession.save();
      }
      return res.status(200).json({ token });
    } else if (user.disabled) {
      throw new Error("User is disabled");
    }
  }

  return res.sendStatus(404);
});

module.exports = loginRouter;
