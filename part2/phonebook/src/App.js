import React, { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNum, setNum] = useState("");
  const [filter, setFilter] = useState("");

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
