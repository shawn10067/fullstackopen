import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { LoginView } from "./components/Login";
import ReccomendedView from "./components/ReccomendedView";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState("");

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
