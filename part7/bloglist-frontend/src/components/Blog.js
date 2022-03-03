import React, { useState } from "react";
import { deleteBlog, putBlog } from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, blogUpdater, likeFunction }) => {
  let [likes, setLikes] = useState(blog.likes);

  const likeBlog = (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    putBlog(blog.id, { likes: likes + 1, comments: [] }).catch(() =>
      setLikes(likes - 1)
    );
  };

  const deleteHandler = async (e) => {
    /*if (process.env.NODE_ENV != "test") {
      if (
        window.confirm(
          `Are you sure you want to delete ${blog.title} by ${blog.author}?`
        )
      ) {
        e.preventDefault();
        await deleteBlog(blog.id);
        blogUpdater();
      }
    } */

    e.preventDefault();
    await deleteBlog(blog.id);
    blogUpdater();
  };

  return (
    <div style={{ display: "block" }} className={"blogContent"}>
      <p>
        {blog.url}
        <br></br>
        Likes: <span className="likeSpan">{likes}</span>{" "}
        <button onClick={likeFunction || likeBlog} className="clickButton">
          like
        </button>
        <br></br>
        {blog.user.userName}
      </p>
      <button onClick={deleteHandler}>delete</button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogUpdater: PropTypes.func.isRequired,
};

export default Blog;
