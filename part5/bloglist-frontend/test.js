import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogBlock from "./src/components/BlogBlock";
import "@babel/plugin-transform-runtime";
import BlogForm from "./src/components/BlogForm";
import userEvent from "@testing-library/user-event";

describe("Testing Blog Component", () => {
  let newBlog = {
    title: "How to be lonely",
    author: "Manpreet D",
    url: "loneliness.com",
    likes: 0,
    user: {
      userName: "Singham",
      id: "1",
    },
    id: "2",
  };
  let testFunc = jest.fn();
  let likeFunc = jest.fn();
  let component = render();

  beforeEach(() => {
    component = render(
      <BlogBlock
        showName={"Show"}
        hideName={"Hide"}
        blog={newBlog}
        blogUpdater={testFunc}
        likeFunction={likeFunc}
      />
    );
  });

  test("Blog only shows title and author to be defined at the start.", () => {
    let outDiv = component.container.querySelector(".mainBlogDiv");
    let inDiv = component.container.querySelector(".innerBlog");

    expect(outDiv).toHaveTextContent("How to be lonely Manpreet");
    expect(inDiv).toHaveStyle({
      display: "none",
    });
  });

  test("Blog Shows URL and Likes when show button is clicked.", () => {
    let showButton = component.container.querySelector(".showButton");
    let inDiv = component.container.querySelector(".innerBlog");
    userEvent.click(showButton);
    expect(inDiv).not.toHaveStyle({
      display: "none",
    });
  });

  test("If button is clicked twice, the button recieves it twice.", () => {
    let showButton = component.container.querySelector(".showButton");
    userEvent.click(showButton);

    let clickButton = component.container.querySelector(".clickButton");
    userEvent.click(clickButton);
    userEvent.click(clickButton);

    expect(likeFunc.mock.calls).toHaveLength(2);
  });
});

test("Testing Blog Form", () => {
  let submitFunc = jest.fn();
  render(<BlogForm blogSubmit={submitFunc} />);
  let submitButton = screen.getByTestId("submitButton");
  const urlBox = screen.getByTestId("urlBox");
  const authorBox = screen.getByTestId("authorBox");
  const titleBox = screen.getByTestId("titleBox");
  userEvent.type(titleBox, "How to win Fortnite Tournaments.");
  userEvent.type(authorBox, "Japan L");
  userEvent.type(urlBox, "fortnite.com");
  userEvent.click(submitButton);

  expect(submitFunc.mock.calls[0][0].title).toBe(
    "How to win Fortnite Tournaments."
  );
  expect(submitFunc.mock.calls[0][0].author).toBe("Japan L");
  expect(submitFunc.mock.calls[0][0].url).toBe("fortnite.com");
});
