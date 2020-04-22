import React from "react";
import { render } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

it("renders without crashing", function() {
  render(<CompanyCard />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<CompanyCard />);
  expect(asFragment()).toMatchSnapshot();
});