import { useMutation } from "@apollo/client";
import { createReview } from "../graphql/mutations";

export const useCreateReview = () => {
  const [mutate, result] = useMutation(createReview);

  const createNewReview = async ({
    repositoryName,
    ownerName,
    rating,
    text,
  }) => {
    const revInfo = {
      variables: {
        input: {
          repositoryName,
          ownerName,
          rating: Number.parseInt(rating),
          text,
        },
      },
    };
    console.log("review info", revInfo);
    const result = await mutate(revInfo);
    console.log("result of creation", result.data);
    const data = result.data.createReview.repository;
    console.log("data parsed", data);
    return { data };
  };

  return [createNewReview, result];
};
