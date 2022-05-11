import { useQuery } from "@apollo/client";
import { useState } from "react";
import { repoGet } from "../graphql/queries";

const useRepositories = ({ order, direction, searchTerm }) => {
  const [repositories, setRepositories] = useState();
  const [done, setDone] = useState(false);
  console.log("querying with", order, direction, searchTerm);

  const { loading, error, data, refetch } = useQuery(repoGet, {
    variables: {
      orderBy: order,
      orderDirection: direction,
      searchKeyword: searchTerm,
    },
  });

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

  return { repositories, setDone, refetch };
};

export default useRepositories;
