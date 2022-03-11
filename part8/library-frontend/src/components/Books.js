import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getBooks, getBooksGenre } from "../queries.js";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState("all");
  const [allGenres, setAllGenres] = useState([]);
  const [genreBooks, setGenreBooks] = useState([]);

  let genreQueryResult = useQuery(getBooksGenre, {
    variables: {
      genre,
    },
  });

  useEffect(() => {
    if (genreQueryResult.data) {
      setGenreBooks(genreQueryResult.data.allBooks);
      //console.log("here is it", genreQueryResult);
    }
  }, [genreQueryResult.data, genre]);

  // getting the books
  let result = useQuery(getBooks, {
    pollInterval: 5000,
  });

  // if we have data, then we set the books accordingly
  useEffect(() => {
    if (!result.loading) {
      // saving books
      setBooks(result.data.allBooks);

      // getting and saving all the genres
      const bookGenres = [];
      for (let book of result.data.allBooks) {
        for (let bookGenre of book.genres) {
          if (!bookGenres.includes(bookGenre)) {
            bookGenres.push(bookGenre);
          }
        }
      }
      setAllGenres(bookGenres);
    }
  }, [result.loading, result.data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre(s)</th>
          </tr>
          {genreBooks.length !== 0
            ? genreBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))
            : books.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                  <td>{a.genres.join(", ")}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((val, i) => {
          return (
            <button
              key={i}
              onClick={(event) => {
                event.preventDefault();
                setGenre(event.target.textContent);
                console.log(event.target.textContent);
              }}
            >
              {val}
            </button>
          );
        })}
        <button
          onClick={(event) => {
            event.preventDefault();
            // maybe get all the books here
            setGenreBooks([]);
          }}
        >
          all
        </button>
      </div>
    </div>
  );
};

export default Books;
