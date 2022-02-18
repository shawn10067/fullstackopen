import React from "react";

const Hello = (props) => {
  return (
    <>
      <p>
        Hello world. Especially {props.name}, who is {props.age} years old. This
        sounds creepy asf lool.
      </p>
    </>
  );
};

const App = () => {
  let myAge = 15;
  let myName = "Sheen";
  return (
    <>
      <p>Greetings.</p>
      <Hello name={myName + " L"} age={myAge} />
      <Hello name="Gur" age={3 + 2} />
      <Hello name="Beeps" age="4" />
    </>
  );
};
export default App;
