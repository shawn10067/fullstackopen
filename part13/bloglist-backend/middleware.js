const { Blog, Session } = require("./models/index");
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
    req.rawToken = authorization.substring(7);
  } else {
    throw new Error("Malformatted/Incorrect token.");
  }
  next();
};

// token verification
const tokenVerify = async (req, res, next) => {
  const { decodedToken, rawToken } = req;
  const userId = decodedToken.id;
  const sessionToken = await Session.findByPk(userId);
  if (sessionToken && sessionToken.token !== rawToken) {
    throw new Error("Expired token");
  } else if (!sessionToken) {
    throw new Error("Login please");
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
  tokenVerify,
};
