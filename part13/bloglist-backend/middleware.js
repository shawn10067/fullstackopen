const { Blog } = require("./models/index");
const jwt = require("jsonwebtoken");

const { SECRET } = require("./utils/config");
const { User } = require("./models/index");

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

// user id retrival middleware
const usernameExtractor = async (req, res, next) => {
  const { username } = req.params;
  req.user = await User.findOne({
    where: {
      username,
    },
  });
  next();
};

// user token retrival middleware
const userTokenExtractor = async (req, res, next) => {
  if (req.decodedToken) {
    req.user = await User.findByPk(req.decodedToken.id);
  }
  next();
};

module.exports = {
  tokenExtractor,
  blogFinder,
  usernameExtractor,
  userTokenExtractor,
};
