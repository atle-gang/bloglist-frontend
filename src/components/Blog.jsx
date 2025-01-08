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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      {isActive ? (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {likes}{" "}
            <button onClick={() => setLikes(likes + 1)}>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      ) : (
        <button onClick={() => setIsActive(true)}>view</button>
      )}
    </div>
  );
};

export { Blog };
