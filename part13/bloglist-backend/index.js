const Blog = require("./Models/blog");
const sequelize = require("./utils/sequelize");

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
