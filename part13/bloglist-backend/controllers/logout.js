const { Session } = require("../models/index");
const express = require("express");
const logoutRouter = express.Router();

const { tokenExtractor } = require("../middleware");

logoutRouter.delete("/", tokenExtractor, async (req, res) => {
  const userSession = await Session.findByPk(req.decodedToken.userId);
  await userSession.destroy();
  return res.sendStatus(204);
});

module.exports = logoutRouter;
