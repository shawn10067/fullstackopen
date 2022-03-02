import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";

import BlogHome from "./BlogHome";
import UserDiv from "./User";

const App = () => {
  let user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const logoutFunc = () => {
    window.localStorage.removeItem("user");
    dispatch(setUser({}));
  };
  const padding = {
    padding: 5,
    margin: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>

        {user.userName ? (
          <span>
            {user.userName} is logged in{" "}
            <button onClick={logoutFunc} className="logoutBTN">
              log out
            </button>
          </span>
        ) : (
          "please log in"
        )}
      </div>

      <Routes>
        <Route path="/users" element={<UserDiv />} />
        <Route path="/" element={<BlogHome />} />
      </Routes>
    </Router>
  );
};

export default App;
