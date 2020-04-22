import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";

it("renders without crashing", function() {
  render(<SearchBar />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<SearchBar />);
  expect(asFragment()).toMatchSnapshot();
});
