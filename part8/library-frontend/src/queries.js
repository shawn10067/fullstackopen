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
      author
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
      author
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
