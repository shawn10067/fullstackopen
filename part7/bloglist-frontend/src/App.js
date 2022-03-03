import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { Button } from "react-bootstrap";

import BlogHome from "./BlogHome";
import UserDivs from "./Users";
import SingleBlog from "./SingleBlog";
import User from "./User";

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
    <div className="container">
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
              <Button
                variant="outline-primary"
                onClick={logoutFunc}
                className="logoutBTN"
              >
                log out
              </Button>
            </span>
          ) : (
            "please log in"
          )}
        </div>

        <Routes>
          <Route path="/users" element={<UserDivs />} />
          <Route path="/" element={<BlogHome />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
