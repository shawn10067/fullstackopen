import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { repoGet } from "../graphql/queries";

const useRepositories = ({ order, direction }) => {
  const [repositories, setRepositories] = useState();
  const [done, setDone] = useState(false);
  console.log(order, direction);

  const { loading, error, data, refetch } = useQuery(repoGet, {
    variables: {
      orderBy: order,
      orderDirection: direction,
      searchKeyword: "",
    },
  });

  if (error) {
    console.log(error);
  }

  if (!loading && !done) {
    setRepositories(data.repositories);
    console.log("repositories from repoGET", repositories);
    setDone(true);
  }

  return { repositories, setDone, refetch };
};

export default useRepositories;
