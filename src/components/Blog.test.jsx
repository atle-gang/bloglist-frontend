import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";

test("renders blog title", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("clicking the 'view'  displays the blog details", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const blogUrl = screen.getByText("www.firstTest.com");
  expect(blogUrl).toBeDefined();

  const blogLikes = screen.getByText("likes");
  expect(blogLikes).toBeDefined();
});
