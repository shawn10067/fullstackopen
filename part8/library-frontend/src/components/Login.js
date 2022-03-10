export const LoginView = ({ setToken }) => {
  const submitHandler = (event) => {
    //
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
  };

  // Form
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
