import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUser, getBooksGenre } from "../queries";

const ReccomendedView = (props) => {
  const [favBooks, setFavBooks] = useState([]);
  const [favGenre, setFavGenre] = useState("");

  // declaring book getting query
  let [getBooks, result] = useLazyQuery(getBooksGenre);

  //loading getting genre
  let userQuery = useQuery(getUser);
  useEffect(() => {
    if (!userQuery.loading && userQuery.data) {
      //console.log("loading", userQuery);

      const genre = userQuery.data.me.favoriteGenre;
      //console.log("my data", userQuery.data.me);
      console.log("my genre", genre);
      setFavGenre(genre);
      console.log("genre", genre, "fav genre", favGenre);

      console.log("sending getbooks with");
      getBooks({
        variables: {
          genre,
        },
      });
    }
  }, [userQuery.data]);

  // if we see a change in data
  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      setFavBooks(books);
      console.log("fav books", books);
    }
  }, [result.data, favGenre]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Reccomended Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre(s)</th>
          </tr>
          {favBooks.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
                <td>{a.genres.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReccomendedView;
