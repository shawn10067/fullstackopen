// apollo spec
const { ApolloServer, UserInputError } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const http = require("http");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// suscription packages
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const secretKey = "MoreLife";

// tokenization spec
const jwt = require("jsonwebtoken");

// model imports
const User = require("./models/User");

// mongoose spec
const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://shawn10067:Wowow123@cluster0.5jgpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// mongoose connection
mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to server"))
  .catch((error) => console.log("error from connecting", error));

// setup function

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // subscription server
  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "",
    }
  );
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      console.log("incoming connection");
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith("bearer ")) {
        try {
          console.log(secretKey);
          const decodedToken = jwt.verify(auth.substring(7), secretKey);
          const currentUser = await User.findOne({ id: decodedToken.id });
          return { currentUser };
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/",
  });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
