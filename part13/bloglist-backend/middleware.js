const Blog = require("./models/blog");
const jwt = require("jsonwebtoken");

const { SECRET } = require("./utils/config");

// ID helper
const blogFinder = async (req, res, next) => {
  const { id } = req.params;
  req.blog = await Blog.findByPk(Number(id));
  next();
};

// User verification
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    throw new Error("Malformatted/Incorrect token.");
  }
  next();
};

module.exports = {
  tokenExtractor,
  blogFinder,
};
