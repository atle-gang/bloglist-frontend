import React from "react";

const BlogDetails = ({ blog, likes, handleLike }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {likes} <button onClick={handleLike}>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );
};

export { BlogDetails };
