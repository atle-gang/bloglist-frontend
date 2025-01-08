import { useState } from "react";

const Blog = ({ blog }) => {
  const [isActive, setIsActive] = useState(false);
  const [likes, setLikes] = useState(0);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonLabel = isActive ? "hide" : "view";

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{" "}
        <button onClick={() => setIsActive(!isActive)}>{buttonLabel}</button>
      </div>
      {/* In React, this behavior allows you to conditionally render elements based on the truthiness of an expression. 
      If the expression before && is true, React will evaluate and render the part after &&. If it's false, React will skip rendering entirely. */}
      {isActive && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {likes}{" "}
            <button onClick={() => setLikes(likes + 1)}>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export { Blog };
