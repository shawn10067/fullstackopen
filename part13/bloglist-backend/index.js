const express = require("express");
require("express-async-errors");
const app = express();
const blogRouter = require("./controllers/blogs");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

// main use blocks
app.use(express.json());
app.use("/blogs", blogRouter);

// error router
const errorHandler = (error, _, response, next) => {
  console.error(error);
  response.status(400).json({ error: error.message });
  next(error);
};
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

start();
