import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";

describe("Dashboard tests", () => {
  it("Should render without crashing", () => {
    shallow(<Dashboard />);
  });
});
