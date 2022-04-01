import express from "express";

const pingRouter = express.Router();

pingRouter.get("/", (_req, res) => {
  console.log("someone pinged");
  res.send("pong").end();
  return;
});

export default pingRouter;
