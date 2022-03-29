// imports
const { UserInputError } = require("apollo-server-core");
const { nanoid } = require("nanoid");
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubSub = new PubSub();
const secretKey = "MoreLife";

// resolvers definition
const resolvers = {
  Query: {
    bookCount: async () => {
      console.log("Book count");
      let result = await Book.find({});
      return result.length;
    },
    authorCount: async () => {
      console.log("Author count");
      console.log("requested author count");
      let result = await Author.find({});
      return result.length;
    },
    allBooks: async (root, args) => {
      console.log("All books");
      let returnBooks = await Book.find({}).populate("author");

      if (args.author) {
        returnBooks = returnBooks.filter(
          (val) => val.author.name === args.author
        );
      }
      if (args.genre) {
        returnBooks = returnBooks.filter((val) =>
          val.genres.includes(args.genre)
        );
      }
      return returnBooks;
    },
    allAuthors: async () => {
      console.log("All authors");
      let result = await Author.find({});
      return result;
    },
    me: (root, args, context) => {
      console.log("Me");
      return context.currentUser;
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
            bookCount: 1,
            id: nanoid(),
          });
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      } else {
        try {
          await Author.findByIdAndUpdate({
            bookCount: newAuthor.bookCount + 1,
          });
        } catch (e) {
          console.error("error occured:", e.message);
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
        pubSub.publish("BOOK_ADDED", { bookAdded: newBook });
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
