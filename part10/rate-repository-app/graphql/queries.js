import { gql } from "@apollo/client";

export const repoGet = gql`
  query getRep(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String!
    $first: Int!
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
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
      pageInfo {
        endCursor
        startCursor
        hasNextPage
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
  query getSingleRep($userId: ID!, $after: String, $first: Int) {
    repository(id: $userId) {
      id
      description
      name
      fullName
      forksCount
      watchersCount
      ratingAverage
      reviews(first: $first, after: $after) {
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
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
      ownerAvatarUrl
      stargazersCount
      language
      url
    }
  }
`;
