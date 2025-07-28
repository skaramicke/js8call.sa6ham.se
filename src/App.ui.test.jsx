import React from "react";
import "@testing-library/jest-dom";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import App from "./App.jsx";

// Mock Chakra UI components and icons to prevent import errors in App
// Mock Chakra UI components to prevent console errors during tests
vi.mock("@chakra-ui/react", () => ({
  Box: (props) => React.createElement("div", {}, props.children),
  Flex: (props) => React.createElement("div", {}, props.children),
  Button: (props) => React.createElement("button", props, props.children),
  HStack: (props) => React.createElement("div", {}, props.children),
  Menu: (props) => React.createElement(React.Fragment, {}, props.children),
  MenuButton: (props) => React.createElement("button", props, props.children),
  MenuList: (props) => React.createElement("div", {}, props.children),
  MenuItem: (props) => React.createElement("a", props, props.children),
  ChakraProvider: (props) =>
    React.createElement(React.Fragment, {}, props.children),
}));
vi.mock("@chakra-ui/icons", () => ({
  ChevronRightIcon: (props) => React.createElement("span", props, ">"),
}));

describe("App component", () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("renders without console errors", () => {
    render(<App />);
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
