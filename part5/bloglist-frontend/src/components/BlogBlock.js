import React from "react";
import Blog from "./Blog";
import ToggleAble from "./ToggleAble";

const blogDivStyle = {
  display: "inline-flex",
};

const BlogBlock = ({ blog, blogUpdater, showName, hideName, likeFunction }) => {
  return (
    <div className="mainBlogDiv" style={blogDivStyle}>
      {blog.title} {blog.author}
      <ToggleAble showName={showName} hideName={hideName}>
        <Blog
          blog={blog}
          blogUpdater={blogUpdater}
          likeFunction={likeFunction}
        />
      </ToggleAble>
    </div>
  );
};

export default BlogBlock;
