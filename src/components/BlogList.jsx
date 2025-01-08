import React from "react";
import { Blog } from "./Blog";

const BlogList = ({ blogs, saveLikeFunction }) => {
  const mappingFunction = (blog) => {
    return (
      <Blog key={blog.id} blog={blog} />
    );
  };

  const compareFun = (a, b) => {
    const likes1 = a.props.blog.likes;
    const likes2 = b.props.blog.likes;
    return likes2 - likes1;
  };

  const sortedBlogs = blogs.map(mappingFunction).sort(compareFun);
  return <div>{sortedBlogs}</div>;
};

export { BlogList };
