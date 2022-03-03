import React from "react";
import { Link } from "react-router-dom";

const blogDivStyle = {
  display: "inline-flex",
};

const BlogBlock = ({ blog }) => {
  return (
    <div className="mainBlogDiv" style={blogDivStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
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
