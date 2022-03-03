import React from "react";
import { Button } from "react-bootstrap";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  submitFunction,
}) => {
  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={submitFunction}>
        <p>
          <label>
            Username:{" "}
            <input type="text" value={username} onChange={setUsername}></input>
          </label>
        </p>
        <p>
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={setPassword}
            ></input>
          </label>
        </p>
        <Button type="Submit" className="loginBTN">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
