import { useQuery } from "@apollo/client";
import { useState } from "react";
import { repoGet } from "../graphql/queries";

const useRepositories = (variables) => {
  const { order, direction, searchTerm } = variables;
  const [repositories, setRepositories] = useState();
  const [done, setDone] = useState(false);
  console.log("querying with", order, direction, searchTerm);

  const { loading, error, data, refetch, fetchMore } = useQuery(repoGet, {
    fetchPolicy: "cache-and-network",
    variables: {
      orderBy: order,
      orderDirection: direction,
      searchKeyword: searchTerm,
      first: 8,
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log("can't fetch more");
      return;
    }

    console.log("can fetch more", data.repositories.pageInfo.endCursor);
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (error) {
    console.log(error);
  }

  if (!loading && !done) {
    console.log("done fetching");
    setRepositories(data.repositories);
    console.log("repositories from repoGET", data);
    setDone(true);
  }

  console.log(setDone);

  return {
    setDone,
    refetch,
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
