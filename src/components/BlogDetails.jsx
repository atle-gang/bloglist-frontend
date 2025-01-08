import React from "react";

const BlogDetails = ({ blog, likes, setLikes }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p>
        likes {likes} <button onClick={() => setLikes(likes + 1)}>like</button>
      </p>
      <p>{blog.author}</p>
    </div>
  );
};

export { BlogDetails };
