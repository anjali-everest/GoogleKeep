import React from "react";
import { shallow } from "enzyme";
import ResizableTextArea from "../ResizableTextArea";

describe("ResizableTextArea tests", () => {
  it("Should render without crashing", () => {
    shallow(<ResizableTextArea />);
  });
  it("should match the ResizableTextArea snapshot", function () {
    const resizableTextArea = shallow(<ResizableTextArea />);
    expect(resizableTextArea).toMatchSnapshot();
  });
});
