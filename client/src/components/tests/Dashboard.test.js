import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../Dashboard";

describe("LoginView tests", () => {
  it("Should render without crashing", () => {
    shallow(<Dashboard />);
  });
  it("should match the LoginView snapshot", function () {
    const dashboard = shallow(<Dashboard props />);
    expect(dashboard).toMatchSnapshot();
  });
});
