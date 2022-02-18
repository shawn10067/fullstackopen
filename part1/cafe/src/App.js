import React, { useState } from "react";

const Button = ({ clickEvent, text }) => {
  return <button onClick={clickEvent}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const StatisticLine = ({ text, value, extra }) => {
  if (extra) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value + extra}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Display = ({ text }) => {
  return <div>{text}</div>;
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="postitive" value={props.positiveAvg} extra="%" />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // getting stats about state value
  const all = good + neutral + bad;
  const positiveAvg = (good / all) * 100;
  const average = (good - bad) / all;

  // functions for each rating
  const ratingFunc = (func, value) => {
    return () => {
      func(value);
    };
  };

  if (all == 0) {
    return (
      <div>
        <Header text="give feedback" />
        <Button clickEvent={ratingFunc(setGood, good + 1)} text="good" />
        <Button
          clickEvent={ratingFunc(setNeutral, neutral + 1)}
          text="neutral"
        />
        <Button clickEvent={ratingFunc(setBad, bad + 1)} text="bad" />
        <Header text="statistics" />
        <Display text="No feedback given" />
      </div>
    );
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button clickEvent={ratingFunc(setGood, good + 1)} text="good" />
      <Button clickEvent={ratingFunc(setNeutral, neutral + 1)} text="neutral" />
      <Button clickEvent={ratingFunc(setBad, bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        positiveAvg={positiveAvg}
        average={average}
      />
    </div>
  );
};

export default App;
