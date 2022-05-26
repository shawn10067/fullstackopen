const Blog = require("./Models/blog");
const sequelize = require("./utils/sequelize");
const express = require("express");
const blogRouter = require("./Controllers/blog");
const app = express();

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
