import React from "react";
import { mount } from "enzyme";
import { EditNoteForm } from "../EditNoteForm";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";
const mockStore = configureMockStore();

describe("EditNoteForm tests", () => {
  const note = { id: 1, title: "title", content: "content" };
  const store = mockStore({
    notes: [note],
    status: "idle",
    error: null,
    editingNoteId: 1,
    isEditingNote: true,
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
    mount(<EditNoteForm />);
  });

  it("should match the EditNoteForm snapshot", function () {
    const editNoteForm = mount(<EditNoteForm />);
    expect(editNoteForm).toMatchSnapshot();
  });
});
