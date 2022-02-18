import React, { useEffect, useState } from "react";
import axios from "axios";

// input component
const Input = ({ value, updateFunc }) => {
  return <input value={value} onChange={updateFunc}></input>;
};

// weather component
const Weather = ({ capital }) => {
  const [weatherObj, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("g");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  if (weatherObj.main) {
    console.log(weatherObj);
    return (
      <div key={api_key}>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {weatherObj.main.temp} celcius</p>
        <p>
          Wind: {weatherObj.wind.speed}km/h {weatherObj.wind.deg} degrees
        </p>
      </div>
    );
  } else {
    return <></>;
  }
};

const DisplayCountry = ({ country }) => {
  return (
    <div key={country.name.common}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );
};

const List = ({ list, updateFunc }) => {
  return (
    <ul>
      {list.map((country, i) => {
        return (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button id={country.name.common} onClick={updateFunc}>
              show
            </button>
          </li>
        );
      })}
    </ul>
  );
};

// displaying countries component
const Countries = ({ list, updateFunc }) => {
  // if there is no results
  if (list.length == 0) {
    return <div>No results.</div>;
  } else if (list.length != 1) {
    if (list.length > 10) {
      return <div>Type the name of a country.</div>;
    }

    return (
      <div>
        <List list={list} updateFunc={updateFunc} />
      </div>
    );
  } else {
    //holding the object
    let country = list[0];

    if (!country.capital) {
      country.capital = "";
    }

    return (
      <div key={country.name.common}>
        <DisplayCountry country={country} />
        <Weather capital={country.capital} />
      </div>
    );
  }
};

function App() {
  // state
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);

  // update functions
  // for element/component control
  const inputUpdate = (event) => {
    setInput(event.target.value);
  };

  // for country button press
  const autoFill = (event) => {
    setInput(event.target.id);
  };

  // getting country data from all endpoint
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log("Error while fetching data.", error));
  }, []);

  // get filtered countries
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(input.toLowerCase());
  });

  let possibleIndex = filteredCountries.findIndex(
    (country) => country.name.common === input
  );

  if (possibleIndex != -1) {
    return (
      <div>
        Type in a country <Input value={input} updateFunc={inputUpdate} />
        <Countries
          list={[filteredCountries[possibleIndex]]}
          updateFunc={autoFill}
        />
      </div>
    );
  }

  return (
    <div>
      Type in a country <Input value={input} updateFunc={inputUpdate} />
      <Countries list={filteredCountries} updateFunc={autoFill} />
    </div>
  );
}

export default App;
