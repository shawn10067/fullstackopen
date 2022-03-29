import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { LoginView } from "./components/Login";
import ReccomendedView from "./components/ReccomendedView";
import { getAuthors, getBooks } from "./queries";

import { gql, useSubscription, useApolloClient } from "@apollo/client";

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      genres
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("SUB DATA", subscriptionData);
      //window.alert(subscriptionData.data.bookAdded.title, "was added.");

      client.cache.updateQuery({ query: getBooks }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(subscriptionData.data.bookAdded),
        };
      });
      client.cache.updateQuery({ query: getAuthors }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.concat(subscriptionData.data.bookAdded.author),
        };
      });
    },
  });

  const logoutHandler = (event) => {
    event.preventDefault();
    setToken("");
    localStorage.removeItem("userToken");
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <button onClick={() => setPage("add")}>add book</button>
        ) : null}
        {token ? (
          <button onClick={() => setPage("reccomended")}>reccomended</button>
        ) : null}
        {token ? (
          <button onClick={logoutHandler}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      {token ? <NewBook show={page === "add"} /> : null}

      <LoginView
        setToken={setToken}
        show={page === "login"}
        setPage={setPage}
      />

      <ReccomendedView show={page === "reccomended"}></ReccomendedView>
    </div>
  );
};

export default App;
