import React from "react";
import { Link } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";

/*
const blogDivStyle = {
  display: "inline-flex",
}; */

const BlogBlock = ({ blog }) => {
  return (
    <ListGroupItem className="mainBlogDiv">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </ListGroupItem>
  );
  /* this was supposed to be added to the return instead of the Link
        {blog.title} {blog.author}
      <ToggleAble showName={showName} hideName={hideName}>
        <Blog
          blog={blog}
          blogUpdater={blogUpdater}
          likeFunction={likeFunction}
        />
      </ToggleAble>
    */
};

export default BlogBlock;
