import React, { useState } from "react";
import { Button } from "react-bootstrap";

const BlogForm = ({ blogSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  // creating new blog
  const submitBlogHandler = (e) => {
    e.preventDefault();

    // using the blogSubmit function to submit the object
    blogSubmit({
      title,
      author,
      url,
    });
  };

  return (
    <form onSubmit={submitBlogHandler} data-testid="blogForm">
      <p>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid="titleBox"
          className="titleBox"
        ></input>
      </p>
      <p>
        <label>Author: </label>
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          data-testid="authorBox"
          className="authorBox"
        ></input>
      </p>
      <p>
        <label>URL: </label>
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          data-testid="urlBox"
          className="urlBox"
        ></input>
      </p>
      <Button
        type="submit"
        data-testid="submitButton"
        className="blogSubmitButton"
      >
        Create
      </Button>
    </form>
  );
};

export default BlogForm;
