const config = require("./utils/config");
const express = require("express");
const app = express();
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const resetRouter = require("./controllers/reset");
const mongoose = require("mongoose");
const cors = require("cors");

// connecting to mongoose
mongoose
  .connect(config)
  .then((result) => logger.info("Success"))
  .catch((error) => logger.error("error", error));

// middleware order (main router in the middle)
app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);
app.use("/api/testing", resetRouter);
app.use("/api/login", loginRouter);
app.use("/", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
