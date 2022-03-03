import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Blog from "./components/Blog";
import { getAll } from "./services/blogs";
import { useDispatch } from "react-redux";
import { setBlogs } from "./reducers/blogReducer";

const SingleBlog = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);
  let { id } = useParams();
  let blog = useSelector((state) => state.blogReducer).find(
    (val) => val.id === id
  );
  console.log(
    id,
    useSelector((state) => state.blogReducer)
  );
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
  if (blog) {
    return (
      <div>
        <h3>{blog.title}</h3>
        <Blog blog={blog} blogUpdater={getNewBlogs} />
      </div>
    );
  } else {
    return <h1>No blog found.</h1>;
  }
};

export default SingleBlog;
