import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";

describe("Dashboard tests", () => {
  it("Should render without crashing", () => {
    shallow(<Dashboard />);
  });
  it("should match the Dashboard snapshot", function () {
    const dashboard = shallow(<Dashboard />);
    expect(dashboard).toMatchSnapshot();
  });
});
