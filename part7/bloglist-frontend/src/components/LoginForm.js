import React from "react";

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
        <button type="Submit" className="loginBTN">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
