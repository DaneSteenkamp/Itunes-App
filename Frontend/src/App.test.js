import React from "react";
import App from "./App";
import renderer from "react-test-renderer";

describe("snapshop testing", () => {
  test("snapshot for App Component", () => {
    // Creating a snapshot of the App component
    const renderedComponent = renderer.create(<App />).toJSON();
    expect(renderedComponent).toMatchSnapshot(); // toMatch method is used to see if the JSON representation of the DOM tree matched the snapshot
  });
});
