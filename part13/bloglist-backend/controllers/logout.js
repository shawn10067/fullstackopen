const { Session } = require("../models/index");
const express = require("express");
const logoutRouter = express.Router();

const { tokenExtractor, tokenVerify } = require("../middleware");

logoutRouter.delete("/", [tokenExtractor, tokenVerify], async (req, res) => {
  const userSession = await Session.findByPk(req.decodedToken.id);
  console.log("decoded id", req.decodedToken.id);
  await userSession.destroy();
  return res.sendStatus(204);
});

module.exports = logoutRouter;
