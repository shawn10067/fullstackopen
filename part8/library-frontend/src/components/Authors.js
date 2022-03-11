import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAuthors } from "../queries.js";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { editAuthorMutation } from "../queries.js";

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [changeAuthorBorn] = useMutation(editAuthorMutation);
  let result = useQuery(getAuthors, {
    pollInterval: 10000,
  });
  useEffect(() => {
    if (!result.loading) {
      //console.log(result.data);
      setAuthors(result.data.allAuthors);
    }
  }, [result.loading, result.data]);

  if (!props.show) {
    return null;
  }

  const handleChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(event.target.authorBorn.value);
    const born = Number(event.target.authorBorn.value);
    changeAuthorBorn({
      variables: {
        name: selectedUser.name,
        setBornTo: born,
      },
    });
  };

  const authorOptions = authors.map((val) => {
    return { name: val.name, label: val.name };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>change author birthdate</h3>
      <form onSubmit={handleSubmit}>
        <Select
          value={selectedUser}
          options={authorOptions}
          onChange={handleChange}
        />
        <label>
          Born <input name="authorBorn" type="text" />
        </label>{" "}
        <br></br>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Authors;
