import React, { useState, useEffect } from "react";
import BlogBlock from "./components/BlogBlock";
import { setToken, getAll, postBlog } from "./services/blogs";
import { loginService } from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import ToggleAble from "./components/ToggleAble";
import { setBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notiReducer";

const BlogHome = () => {
  let blogs = useSelector((state) => state.blogReducer);
  let user = useSelector((state) => state.userReducer);
  let notification = useSelector((state) => state.notiReducer);
  const dispatch = useDispatch();
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
      dispatch(setBlogs(newBlogs));
    });
  };

  useEffect(() => {
    getNewBlogs();
  }, []);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      console.log(storedUser);
      dispatch(setUser(JSON.parse(storedUser)));
      setToken(JSON.parse(storedUser).token);
    }
  }, []);

  const submitFunction = async (event) => {
    event.preventDefault();
    try {
      let reply = await loginService({
        userName: username,
        password,
      });
      dispatch(setUser(reply));
      setToken(reply.token);
      setUsername("");
      setPassword("");
      window.localStorage.setItem("user", JSON.stringify(reply));
      dispatch(setNotification("logged in"));
    } catch (e) {
      console.log("error with login", e.message);
    }
  };

  const blogSubmit = async (blogObj) => {
    await postBlog(blogObj);
    dispatch(
      setNotification(`added blog ${blogObj.title} by ${blogObj.author}`)
    );
    let getResp = await getAll();
    dispatch(setBlogs(getResp));
  };

  const divBorder = {
    border: "3px dotted lightblue",
    margin: "5px",
    padding: "10px",
  };

  return (
    <div>
      <div
        style={{
          border: "3px dotted red",
          margin: "5px",
          padding: "10px",
        }}
      >
        {notification}
      </div>
      {user.userName ? (
        <div>
          <h2>blogs</h2>

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

export default BlogHome;
