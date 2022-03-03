import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBlogs } from "./reducers/blogReducer";
import { getAll } from "./services/blogs";
import { Link } from "react-router-dom";

const UserDiv = () => {
  const dispatch = useDispatch();
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
  let blogs = useSelector((state) => state.blogReducer);
  if (blogs) {
    console.log(blogs);
    blogs = blogs
      .reduce((a, b) => {
        let userIndex = a.findIndex((val) => val.id === b.user.id);

        if (userIndex === -1) {
          return a.concat({
            username: b.user.userName,
            id: b.user.id,
            posts: [b],
          });
        }
        a[userIndex] = {
          ...a[userIndex],
          posts: a[userIndex].posts.concat(b),
        };
        return a;
      }, [])
      .map((obj) => {
        return (
          <div key={obj.id}>
            <h3>{obj.username}</h3>
            {obj.posts.map((val) => {
              return (
                <li key={val.id}>
                  <Link to={`/blogs/${val.id}`}>{val.title}</Link>
                </li>
              );
            })}
          </div>
        );
      });
  }
  return (
    <div>
      <h2>Users</h2>
      <ul>{blogs}</ul>
    </div>
  );
};

export default UserDiv;
