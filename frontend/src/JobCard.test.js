import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";

it("renders without crashing", function() {
  render(<JobCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<JobCard />);
  expect(asFragment()).toMatchSnapshot();
});