import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getBooks } from "../queries.js";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  let result = useQuery(getBooks, {
    pollInterval: 2000,
  });
  useEffect(() => {
    if (!result.loading) {
      console.log(result.data);
      setBooks(result.data.allBooks);
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
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
