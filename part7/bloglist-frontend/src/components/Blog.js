import React, { useState } from "react";
import { deleteBlog, putBlog, commentBlog } from "../services/blogs";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Blog = ({ blog, blogUpdater, likeFunction }) => {
  let [likes, setLikes] = useState(blog.likes);
  let [blogComments, setBlogComments] = useState(blog.comments);

  const likeBlog = (e) => {
    e.preventDefault();
    setLikes(likes + 1);
    putBlog(blog.id, { likes: likes + 1 })
      .then(() => {
        blogUpdater();
      })
      .catch(() => setLikes(likes - 1));
  };

  const addComment = (e) => {
    e.preventDefault();
    setBlogComments(blogComments.concat(e.target.commentText.value));
    commentBlog(blog.id, blogComments.concat(e.target.commentText.value))
      .then(() => {
        blogUpdater();
        e.target.commentText.value = "";
      })
      .catch(() => {
        console.log("Couldn't set comment");
      });
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
        <Button
          size="sm"
          onClick={likeFunction || likeBlog}
          className="clickButton"
        >
          like
        </Button>
        <br></br>
        {blog.user.userName}
      </p>
      <p>Comments:</p>
      <ul>
        {blogComments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input type={"text"} name="commentText"></input>{" "}
        <Button type="submit">submit</Button>
      </form>
      <Button variant="secondary" onClick={deleteHandler}>
        delete
      </Button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogUpdater: PropTypes.func.isRequired,
};

export default Blog;
