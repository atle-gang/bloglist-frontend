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
