import React from "react";
import { mount } from "enzyme";
import { AddNoteForm } from "../AddNoteForm";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";

const mockStore = configureMockStore();

describe("AddNoteForm tests", () => {
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
    mount(<AddNoteForm />);
  });

  it("should match the AddNoteForm snapshot", function () {
    const addNoteForm = mount(<AddNoteForm />);
    expect(addNoteForm).toMatchSnapshot();
  });
});
