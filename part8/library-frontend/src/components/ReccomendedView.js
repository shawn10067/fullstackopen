import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { getUser, getBooksGenre } from "../queries";

const ReccomendedView = (props) => {
  const [favBooks, setFavBooks] = useState([]);
  const [favGenre, setFavGenre] = useState("");

  // getting genre
  let genreQueryResult = useQuery(getUser);
  useEffect(() => {
    console.log("hello");
    if (!genreQueryResult.loading) {
      console.log("DOING GENGRE");
      console.log("data", genreQueryResult.data.me);
      /*
      const genre = genreQueryResult.data.me.favouriteGenre;
      setFavGenre(genre);
      console.log(genre);
      */
    }
  }, [genreQueryResult.data]);

  // getting books
  let result = useQuery(getBooksGenre, {
    variables: {
      genre: favGenre,
    },
  });
  useEffect(() => {
    if (result.data) {
      const books = result.data.allBooks;
      setFavBooks(books);
      console.log(books);
    }
  }, [result.data]);

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
