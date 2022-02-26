const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:", request.method);
  logger.info("Body:", request.method);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" }).end();
};

const errorHandler = (error, request, response, next) => {
  logger.error(`${error.name} error had the message ${error.message}`);

  if (error.name === "CastError") {
    return response.error(400).send({ error: "Malformatted id" }).end();
  } else if (error.name === "ValidationError") {
    return response.error(400).send({ error: error.message }).end();
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" }).end();
  }

  next(error);
};

// authorization function
const getToken = (headerValue) => {
  if (headerValue.startsWith("Bearer ")) {
    return headerValue.slice(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  // code that extracts the token

  // if theres no token to get
  if (!request.get("Authorization")) {
    return next();
  }

  const tokenString = getToken(request.get("Authorization"));

  try {
    request.token = jwt.verify(tokenString, process.env.SECRET);
  } catch (e) {
    console.error(e);
    return response.status(401).json({ error: "invalid token" }).end();
  }

  next();
};

const userExtractor = async (request, response, next) => {
  // getting user from token
  if (request.token && request.token.id) {
    request.user = await User.findById(request.token.id);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
