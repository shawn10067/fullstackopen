const { ApolloServer, gql } = require("apollo-server");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://shawn10067:Wowow123@cluster0.5jgpy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(mongoURL)
  .then(() => console.log("connected to server"))
  .catch((error) => console.log("error from connecting", error));

const typeDefs = gql`
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
  }

  type Mutation {
    addBook(
      title: String
      author: Author!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let returnBooks = books;
      if (args.author) {
        returnBooks = returnBooks.filter((val) => val.author === args.author);
      }
      if (args.genre) {
        returnBooks = returnBooks.filter((val) =>
          val.genres.includes(args.genre)
        );
      }
      return returnBooks;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((returnVal, element) => {
        if (element.author === root.name) {
          return returnVal + 1;
        }
        return returnVal;
      }, 0);
    },
  },
  Mutation: {
    addBook: (root, { title, author, published, genres }) => {
      let newAuthor = {
        name: author,
        born: null,
        id: nanoid(),
      };
      let newBook = {
        title,
        published,
        author,
        id: nanoid(),
        genres,
      };

      const foundAuthor = authors.find((val) => val.name === author);
      if (!foundAuthor) {
        //console.log("did not find", author);
        authors.push(newAuthor);
      }
      books.push(newBook);
      return newBook;
    },
    editAuthor: (root, { name, setBornTo }) => {
      let foundAuthorIndex = authors.findIndex((val) => val.name === name);
      if (foundAuthorIndex === -1) {
        console.log(name, foundAuthorIndex);
        return null;
      }

      authors[foundAuthorIndex].born = setBornTo;

      return authors[foundAuthorIndex];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
