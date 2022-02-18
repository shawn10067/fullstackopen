import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filterChange, filter }) => {
  return (
    <div>
      filter shown with <input onChange={filterChange} value={filter}></input>
    </div>
  );
};

const PersonForm = ({
  submitHandler,
  formChange,
  newName,
  numChange,
  newNum,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input onChange={formChange} value={newName} />
      </div>
      <div>
        number: <input onChange={numChange} value={newNum} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        .map((person) => {
          return (
            <div key={person.name}>
              {person.name} {person.number}
            </div>
          );
        })}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNum] = useState("");
  const [filter, setFilter] = useState("");

  // getting data from database
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
      })
      .catch(() => console.log("Error with axios fetch"));
  }, []);

  const submitHandler = (event) => {
    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLocaleLowerCase()
      )
    ) {
      alert(`${newName} is already in the phonebook.`);
    } else {
      setPersons(persons.concat([{ name: newName, number: newNum }]));
    }
    setNewName("");
    setNum("");
    event.preventDefault();
  };

  const formChange = (event) => {
    setNewName(event.target.value);
  };

  const numChange = (event) => {
    setNum(event.target.value);
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterChange={filterChange} filter={filter} />
      <h2>add a new #</h2>
      <PersonForm
        submitHandler={submitHandler}
        formChange={formChange}
        newName={newName}
        newNum={newNum}
        numChange={numChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
