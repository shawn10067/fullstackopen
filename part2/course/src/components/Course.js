import React from "react";

// part component
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// course component
const Course = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
      {props.course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
      <strong>
        total of{" "}
        {props.course.parts.reduce((a, b) => {
          return a + parseInt(b.exercises);
        }, 0)}{" "}
        excersises
      </strong>
    </div>
  );
};

export default Course;
