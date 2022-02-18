import React, { useState } from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} excersise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} excersise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} excersise={props.parts[2].exercises} />
    </div>
  );
};

const CountDisplay = ({ counter }) => <div>{counter}</div>;

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

// the click event still registers locally because it holds on to the stack frame variables in the place it was **defined** in

const Button = ({ clickEvent, name }) => (
  <button onClick={clickEvent}>{name}</button>
);

const App = () => {
  const [counter, setCounter] = useState(0);
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const updateClick = (event) => {
    setCounter(counter + 1);
  };

  const resetClick = () => setCounter(0);

  const decreaseClick = () => {
    if (counter <= 0) {
      setCounter(0);
    } else {
      setCounter(counter - 1);
    }
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      <div>
        <CountDisplay counter={counter} />
        <Button clickEvent={updateClick} name="Click 2 Update" />
        <Button clickEvent={resetClick} name="Zero It" />
        <Button clickEvent={decreaseClick} name="Decrease" />
      </div>
    </div>
  );
};

export default App;
