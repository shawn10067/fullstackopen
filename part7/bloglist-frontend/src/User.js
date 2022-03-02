import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBlogs } from "./reducers/blogReducer";
import { getAll } from "./services/blogs";

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
            posts: 1,
          });
        }
        a[userIndex] = {
          ...a[userIndex],
          posts: a[userIndex].posts + 1,
        };
        return a;
      }, [])
      .map((obj) => {
        return (
          <div key={obj.id}>
            {obj.username} has {obj.posts} posts
          </div>
        );
      });
    //console.log(blogs);
  }
  return (
    <div>
      <h2>Users</h2>
      {blogs}
    </div>
  );
};

export default UserDiv;
