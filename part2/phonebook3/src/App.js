import React, { useState, useEffect } from "react";
import BookService from "./services/bookservice";

const Notification = ({ text }) => {
  const notiStyle = {
    borderRadius: "5px",
    backgroundColor: "lightblue",
    color: "black",
    width: "500px",
    fontSize: "2rem",
  };

  return <p style={notiStyle}>{text}</p>;
};

const NotificationError = ({ text }) => {
  const notiStyle = {
    borderRadius: "5px",
    backgroundColor: "red",
    color: "black",
    width: "500px",
    fontSize: "3rem",
  };

  return <p style={notiStyle}>{text}</p>;
};

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

const Persons = ({ persons, filter, deleteAction }) => {
  return (
    <div>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(filter.toLowerCase());
        })
        .map((person) => {
          return (
            <div key={person.name} id={person.name}>
              {person.name} {person.number}{" "}
              <button id={person.id} onClick={deleteAction}>
                delete
              </button>
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
  const [noti, setNoti] = useState("");
  const [notiError, setNotiError] = useState("");

  // getting data from database
  useEffect(() => {
    BookService.getAllBook()
      .then((data) => {
        setPersons(data);
      })
      .catch(() => console.log("Error with axios fetch"));
  }, []);

  const submitHandler = (event) => {
    let tempPerson;
    if (
      persons.find((person) => {
        if (person.name.toLowerCase() === newName.toLocaleLowerCase()) {
          tempPerson = person;
          return true;
        }
        return false;
      })
    ) {
      if (
        window.confirm(
          `${newName} is already in the phonebook, replace the old number with a new one?`
        )
      ) {
        BookService.updateBook(tempPerson.id, {
          name: newName,
          number: newNum,
        })
          .then((data) => {
            setPersons(
              persons.map((val) =>
                val.id === tempPerson.id ? { ...val, number: newNum } : val
              )
            );
            setNoti("Add Successful");
            setTimeout(() => setNoti(""), 2000);
          })
          .catch((error) => {
            setNotiError("Error: " + error.response.data.error);
            setTimeout(() => setNotiError(""), 2000);
          });
      }
    } else {
      BookService.postBook({
        name: newName,
        number: newNum,
      })
        .then((data) => {
          setPersons(persons.concat([data]));
          setNoti("Add Successful");
          setTimeout(() => setNoti(""), 2000);
        })
        .catch((error) => {
          setNotiError("Error: " + error.response.data.error);
          setTimeout(() => setNotiError(""), 2000);
        });
    }
    setNewName("");
    setNum("");
    setTimeout(() => setNoti(""), 2000);
    event.preventDefault();
  };

  const deleteEvent = (event) => {
    if (window.confirm(`Delete ${event.target.parentNode.getAttribute("id")}?`))
      BookService.deleteBook(event.target.id).then((resp) => {
        if (resp) {
          setNoti("Delete Successful");
          setTimeout(() => setNoti(""), 2000);
          const newPeople = persons.filter((val) => val.id !== event.target.id);
          setPersons(newPeople);
        } else {
          setNotiError("Entry Already Deleted");
          setTimeout(() => setNotiError(""), 2000);
        }
      });

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
      <Notification text={noti} />
      <NotificationError text={notiError} />
      <h2>add a new #</h2>
      <PersonForm
        submitHandler={submitHandler}
        formChange={formChange}
        newName={newName}
        newNum={newNum}
        numChange={numChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteAction={deleteEvent} />
    </div>
  );
};

export default App;
