import { useState } from "react";
import { BlogDetails } from "./BlogDetails";

const Blog = ({ blog }) => {
  const [isActive, setIsActive] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonLabel = isActive ? "hide" : "view";
  console.log(likes)

  const saveFunction = () => {
    setLikes(likes + 1);
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{" "}
        <button onClick={() => setIsActive(!isActive)}>{buttonLabel}</button>
      </div>
      {/* In React, this behavior allows you to conditionally render elements based on the truthiness of an expression. 
      If the expression before && is true, React will evaluate and render the part after &&. If it's false, React will skip rendering entirely. */}
      {isActive && (
        <BlogDetails blog={blog} likes={likes} setLikes={saveFunction} />
      )}
    </div>
  );
};

export { Blog };
