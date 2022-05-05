import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { repoGet } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [done, setDone] = useState(false);

  const { loading, error, data } = useQuery(repoGet, {
    fetchPolicy: "cache-and-network",
  });

  if (!loading && !done) {
    setRepositories(data.repositories);
    console.log(repositories);
    setDone(true);
  }

  return { repositories };
};

export default useRepositories;
