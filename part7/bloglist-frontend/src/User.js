import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "./services/blogs";
import { useEffect } from "react";
import { setBlogs } from "./reducers/blogReducer";
const User = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // getting all blogs and then sorting them
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

  // getting the blogs in the store
  let blogs = useSelector((state) => state.blogReducer);

  let userName = "";

  // grouping blogs on users
  if (blogs && blogs.length !== 0) {
    console.log(blogs, id);
    blogs = blogs.filter((val) => val.user.id === id);
    userName = blogs[0].user.userName;
    blogs = blogs.map((val, i) => {
      return (
        <li key={i}>
          <Link to={`/blogs/${val.id}`}>{val.title}</Link>
        </li>
      );
    });
  }
  return (
    <div>
      <h3>{userName}</h3>
      <ul>{blogs}</ul>
    </div>
  );
};

export default User;
