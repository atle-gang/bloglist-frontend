import { useState, useEffect } from "react";
import { Blog } from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { Notification } from "./components/Notification";
import { LoginForm } from "./components/LoginForm";
import { Togglable } from "./components/Togglable";
import { BlogForm } from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </>
    );
  };

  const blogForm = () => {
    return (
      <div>
        {blogList()}
        <Togglable buttonLabel="new blog">
          <BlogForm
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleSubmit={handleBlogSubmit}
          />
        </Togglable>
      </div>
    );
  };

  const blogList = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        type: "addNotification",
        message: `You have successfully logged in`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (exception) {
      setNotification({
        type: "errorNotification",
        message: `Wrong username or password`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogUser");
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title,
        author,
        url,
      };

      const createdBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({
        type: "addNotification",
        message: `${title} by ${author} has been added`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setNotification({
        type: "errorNotification",
        message: `${error.response.data.error}`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  return (
    <div>
      <Notification notification={notification} />

      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
