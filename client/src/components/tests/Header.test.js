import React from "react";
import { shallow } from "enzyme";
import Header from "../Header";

describe("Header tests", () => {
  it("Should render without crashing", () => {
    shallow(<Header />);
  });
  it("should match the Header snapshot", function () {
    const header = shallow(<Header />);
    expect(header).toMatchSnapshot();
  });
});
