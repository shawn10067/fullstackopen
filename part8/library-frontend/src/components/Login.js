import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { loginMutation } from "../queries";

export const LoginView = ({ setToken, show, setPage }) => {
  // mutation function and the result object
  const [login, result] = useMutation(loginMutation, {
    onError: (error) => {
      console.error(error.message);
    },
  });

  // submit handler that submits the login request
  const submitHandler = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  // following effect runs when 'result.data' changes, so it runs when the data is recieved
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("userToken", token);
      setPage("authors");
    }
  }, [result.data]); //eslint --disable

  // hide if not shown
  if (!show) {
    return null;
  }

  // Form element to return
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitHandler}>
        <label>
          <input name="username" type="text"></input>
        </label>
        <label>
          <input name="password" type="password"></input>
        </label>
        <br></br>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
