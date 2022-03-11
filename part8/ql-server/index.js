// apollo spec
const { ApolloServer, gql, UserInputError } = require("apollo-server");

// tokenization spec
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const secretKey = "MoreLife";

// model imports
const Book = require("./models/Book");
const Author = require("./models/Author");
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

// type definitions
const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      let result = await Book.find({});
      return result.length;
    },
    authorCount: async () => {
      let result = await Author.find({});
      return result.length;
    },
    allBooks: async (root, args) => {
      let returnBooks = await Book.find({}).populate("author");

      if (args.author) {
        returnBooks = returnBooks.filter(
          (val) => val.author.name === args.author
        );
      }
      if (args.genre) {
        console.log("mf wanted the genre", args.genre);
        returnBooks = returnBooks.filter((val) =>
          val.genres.includes(args.genre)
        );
      }

      //console.log(returnBooks);

      return returnBooks;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      console.log(
        "The user requested the owner status of",
        context.currentUser
      );
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const authorId = root.id;
      const numBooks = await Book.find({
        author: authorId,
      });
      return numBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, { title, author, published, genres }) => {
      // finding possible author in DB
      let newAuthor = await Author.findOne({ name: author });

      // if it is a new author
      if (!newAuthor) {
        try {
          newAuthor = new Author({
            name: author,
            born: null,
            id: nanoid(),
          });
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }

      // creating the new book
      let newBook = new Book({
        title,
        published,
        author: newAuthor,
        id: nanoid(),
        genres,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new UserInputError("Invalid book title Sir");
      }
      return newBook;
    },
    editAuthor: async (root, { name, setBornTo }) => {
      let foundAuthor = await Author.findOne({ name: name });
      if (!foundAuthor) {
        //console.log(name, foundAuthor);
        return null;
      }

      try {
        foundAuthor.born = setBornTo;
        await foundAuthor.save();
      } catch (error) {
        throw new UserInputError("Invalid age");
      }

      return foundAuthor;
    },
    createUser: async (root, { username, favGenre }) => {
      try {
        const newUser = User({
          username,
          favGenre,
          id: nanoid(),
        });

        // if we already have a user
        const userExists = await User.exists({ username: username });
        if (userExists) {
          return null;
        }

        // saving the user and returning the token
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new UserInputError("Invalid Username");
      }
    },
    login: async (root, { username, password }) => {
      try {
        // if there is no user
        const user = await User.findOne({ username: username });
        if (!user || password !== "password123") {
          return null;
        }

        // returns a token
        const userToken = {
          username,
          id: user.id,
        };
        return {
          value: jwt.sign(userToken, secretKey),
        };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), secretKey);
        const currentUser = await User.findOne({ id: decodedToken.id });
        return { currentUser };
      } catch (error) {
        throw new UserInputError(error.message);
      }
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});