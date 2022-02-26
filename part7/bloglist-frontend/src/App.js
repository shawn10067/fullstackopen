import React, { useState, useEffect } from "react";
import BlogBlock from "./components/BlogBlock";
import { setToken, getAll, postBlog } from "./services/blogs";
import { loginService } from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import ToggleAble from "./components/ToggleAble";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getNewBlogs = async () => {
    getAll().then((blogs) => {
      let newBlogs = blogs.sort((a, b) => {
        if (a.likes < b.likes) {
          return 1;
        } else {
          return -1;
        }
      });
      setBlogs(newBlogs);
    });
  };

  useEffect(() => {
    getNewBlogs();
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedUser).token);
    }
  }, []);

  const logoutFunc = () => {
    window.localStorage.removeItem("user");
    setUser({});
  };

  const submitFunction = async (event) => {
    event.preventDefault();
    try {
      let reply = await loginService({
        userName: username,
        password,
      });

      console.log(reply);

      setUser(reply);
      setToken(reply.token);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("user", JSON.stringify(reply));
    } catch (e) {
      console.log("error with login", e.message);
    }
  };

  const blogSubmit = async (blogObj) => {
    await postBlog(blogObj);
    let getResp = await getAll();
    setBlogs(getResp);
  };

  const divBorder = {
    border: "3px dotted lightblue",
    margin: "5px",
    padding: "10px",
  };

  return (
    <div>
      {user.userName ? (
        <div>
          <h2>blogs</h2>
          <p>
            {user.userName} is logged in{" "}
            <button onClick={logoutFunc} className="logoutBTN">
              log out
            </button>
          </p>

          <ToggleAble showName="Submit Blog" hideName="cancel">
            <BlogForm blogSubmit={blogSubmit} />
          </ToggleAble>
          <br></br>

          {blogs.map((blog) => (
            <div key={blog.id} style={divBorder}>
              <BlogBlock
                blog={blog}
                showName="show"
                hideName="hide"
                blogUpdater={getNewBlogs}
              />
            </div>
          ))}
        </div>
      ) : (
        <LoginForm
          username={username}
          password={password}
          setUsername={({ target }) => setUsername(target.value)}
          setPassword={({ target }) => setPassword(target.value)}
          submitFunction={submitFunction}
        />
      )}
    </div>
  );
};

export default App;
