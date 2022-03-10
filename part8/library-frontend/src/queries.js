import { gql } from "@apollo/client";

export const getAuthors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const getBooks = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
    }
  }
`;

export const getBooksGenre = gql`
  query allBooksQuery($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
    }
  }
`;

export const addBookMutation = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
    }
  }
`;

export const editAuthorMutation = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
    }
  }
`;

export const loginMutation = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
