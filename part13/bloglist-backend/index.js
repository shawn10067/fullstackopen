const express = require("express");
const app = express();
const blogRouter = require("./controllers/blog");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

// main use blocks
app.use(express.json());
app.use("/blogs", blogRouter);

/*
const main = async () => {
  try {
    // connecting
    await sequelize.authenticate();
    console.log("Connection made");

    // adding blogs

    const blogs = (await Blog.findAll()).map((blog) => blog.toJSON());
    JSON.stringify({}, null);

    blogs.forEach((blog) =>
      console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
    );
  } catch (error) {
    console.log("Error connecting", error);
  }
};
main();
*/

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
};

start();
