import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBlogs } from "./reducers/blogReducer";
import { getAll } from "./services/blogs";
import { Link } from "react-router-dom";

const UserDivs = () => {
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

  // grouping blogs on users
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
          <li key={obj.id}>
            <h3>
              <Link to={`/users/${obj.id}`}>{obj.username}</Link>
              {` has ${obj.posts.length} posts`}
            </h3>
          </li>
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

export default UserDivs;
