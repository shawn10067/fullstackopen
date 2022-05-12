import { gql } from "@apollo/client";

export const authUser = gql`
  mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const createReview = gql`
  mutation createReview($input: CreateReviewInput!) {
    createReview(review: $input) {
      repository {
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
`;

export const createUser = gql`
  mutation createUser($newUser: CreateUserInput!) {
    createUser(user: $newUser) {
      username
      id
    }
  }
`;

export const deleteReview = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
