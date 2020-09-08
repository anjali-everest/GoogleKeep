import React from "react";
import { shallow } from "enzyme";
import { Note } from "../Note";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";

const mockStore = configureMockStore();

describe("Note tests", () => {
  const noteProp = { id: 1, title: "title", content: "content" };
  const store = mockStore({
    notes: [],
    status: "idle",
    error: null,
    editingNoteId: null,
    isEditingNote: false,
    deletingNoteId: null,
  });

  beforeEach(() => {
    jest
      .spyOn(ReactReduxHooks, "useSelector")
      .mockImplementation(() => store.getState());
    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);
  });

  it("Should render without crashing", () => {
    shallow(<Note note={noteProp} />);
  });

  it("should match the Note snapshot", function () {
    const note = shallow(<Note note={noteProp} />);
    expect(note).toMatchSnapshot();
  });
});
