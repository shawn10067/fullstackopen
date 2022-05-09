import { gql } from "@apollo/client";

export const repoGet = gql`
  query getRep {
    repositories {
      edges {
        node {
          id
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

export const getSingleRep = gql`
  query getSingleRep($userId: ID!) {
    repository(id: $userId) {
      id
      description
      name
      fullName
      forksCount
      watchersCount
      ratingAverage
      reviews {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
      ownerAvatarUrl
      stargazersCount
      language
      url
    }
  }
`;

`
reviews {
  edges {
    node {
      id
      text
      rating
      createdAt
      user {
        id
        username
      }
    }
  }
}
`;
