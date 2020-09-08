import React from "react";
import { shallow } from "enzyme";
import { NotesList } from "../NotesList";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";

const mockStore = configureMockStore();

describe("NotesList tests", () => {
  const store = mockStore({
    NotesLists: [],
    status: "idle",
    error: null,
    editingNotesListId: null,
    isEditingNotesList: false,
    deletingNotesListId: null,
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
    shallow(<NotesList />);
  });

  it("should match the NotesList snapshot", function () {
    const notesList = shallow(<NotesList />);
    expect(notesList).toMatchSnapshot();
  });
});
