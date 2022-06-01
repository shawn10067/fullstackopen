const express = require("express");
require("express-async-errors");
const app = express();
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const authorRouter = require("./controllers/authors");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");
const { Umzug, SequelizeStorage } = require("umzug");
const { sequelize } = require("./utils/db");
const readingRouter = require("./controllers/readingList");
const logoutRouter = require("./controllers/logout");

// main use blocks
app.use(express.json());
app.use("/blogs", blogRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/authors", authorRouter);
app.use("/readingLists", readingRouter);
app.use("/logout", logoutRouter);

// error router
const errorHandler = (error, _, response, next) => {
  console.error(error);
  response.status(400).json({ error: error.message });
  next(error);
};
app.use(errorHandler);

// migration run
const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "./migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const start = async () => {
  try {
    await connectToDatabase();
    await runMigrations();
  } catch (error) {
    console.log("failed to connect to the database");
    console.log(error);
    return process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

start();
