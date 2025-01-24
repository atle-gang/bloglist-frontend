// Make a test, which checks that the component displaying a blog renders the blog's title
// and author, but does not render its URL or number of likes by default.

// Add CSS classes to the component to help the testing as necessary.
import { render, screen } from "@testing-library/react"
import { Blog } from "./Blog"

test("renders blog title", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Renders blog title",
    url: "www.firstTest.com",
  }

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  )
  expect(element).toBeDefined();
})
