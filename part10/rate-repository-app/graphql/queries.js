import { gql } from "@apollo/client";

export const repoGet = gql`
  query getRep {
    repositories {
      edges {
        node {
          description
          name
          fullName
          forksCount
          watchersCount
          ratingAverage
          reviews {
            totalCount
          }
          ownerAvatarUrl
          stargazersCount
          language
        }
      }
    }
  }
`;

export const getMe = gql`
  query getMe {
    me {
      id
      username
    }
  }
`;
